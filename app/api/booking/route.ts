import { NextRequest, NextResponse } from "next/server";
import type { Transporter } from "nodemailer";
import nodemailer from "nodemailer";

interface BookingRequest {
  name: string;
  email: string;
  phone: string;
  sessionType: string;
  date: string;
  time: string;
  location: string;
  message: string;
  guests: string;
  duration: string;
}

// In-memory storage for bookings (Note: This will reset when the server restarts. Use a database for persistence.)
const bookings: { date: string; time: string }[] = [];

class BookingRequestBuilder {
  private data: Partial<BookingRequest> = {};
  set<K extends keyof BookingRequest>(key: K, value: BookingRequest[K]) {
    this.data[key] = typeof value === "string" ? value.trim() : value;
    return this;
  }
  from(body: Partial<BookingRequest>) {
    Object.entries(body).forEach(([k, v]) => {
      if (v !== undefined && v !== null)
        this.set(k as keyof BookingRequest, v as any);
    });
    return this;
  }
  tryBuild():
    | { ok: true; value: BookingRequest }
    | { ok: false; error: string; status: number } {
    const required = [
      "name",
      "email",
      "phone",
      "sessionType",
      "date",
      "time",
    ] as const;
    for (const f of required) {
      if (!this.data[f])
        return {
          ok: false,
          error: `Missing required field: ${f}`,
          status: 400,
        };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(String(this.data.email))) {
      return { ok: false, error: "Invalid email format", status: 400 };
    }
    const normalizedPhone = String(this.data.phone).replace(/[\s\-\(\)]/g, "");
    // More permissive phone regex to allow numbers starting with 0 (common in countries like Nigeria/UK)
    // and ensures a reasonable length for a phone number.
    const phoneRegex = /^\+?\d{7,15}$/;
    if (!phoneRegex.test(normalizedPhone)) {
      return { ok: false, error: "Invalid phone number format", status: 400 };
    }
    const bookingDate = new Date(String(this.data.date));
    const now = new Date();
    if (!(bookingDate instanceof Date) || Number.isNaN(bookingDate.getTime())) {
      return { ok: false, error: "Invalid date", status: 400 };
    }
    if (bookingDate <= now) {
      return {
        ok: false,
        error: "Booking date must be in the future",
        status: 400,
      };
    }
    const value: BookingRequest = {
      name: String(this.data.name),
      email: String(this.data.email),
      phone: normalizedPhone,
      sessionType: String(this.data.sessionType),
      date: String(this.data.date),
      time: String(this.data.time),
      location: String(this.data.location ?? ""),
      message: String(this.data.message ?? ""),
      guests: String(this.data.guests ?? ""),
      duration: String(this.data.duration ?? ""),
    };
    return { ok: true, value };
  }
}

async function sendBookingEmails(body: BookingRequest, bookingDate: Date) {
  const ownerEmail = process.env.OWNER_EMAIL;
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 0);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const secure =
    String(process.env.SMTP_SECURE ?? "false").toLowerCase() === "true";

  if (!ownerEmail || !host || !port || !user || !pass) {
    console.warn(
      "Email not configured. Set OWNER_EMAIL, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS.",
    );
    return;
  }

  const transporter: Transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  const subject = `New Booking: ${body.sessionType} on ${bookingDate.toLocaleDateString()} at ${body.time}`;
  const text = [
    `New booking request`,
    `Name: ${body.name}`,
    `Email: ${body.email}`,
    `Phone: ${body.phone}`,
    `Session: ${body.sessionType}`,
    `Date: ${bookingDate.toLocaleDateString()} ${body.time}`,
    `Guests: ${body.guests}`,
    `Duration: ${body.duration}`,
    `Location: ${body.location}`,
    `Message: ${body.message}`,
  ].join("\n");

  await transporter.sendMail({
    from: `"Photo Portfolio" <${user}>`,
    to: ownerEmail,
    replyTo: body.email,
    subject,
    text,
  });

  await transporter.sendMail({
    from: `"Photo Portfolio" <${user}>`,
    to: body.email,
    subject: "We received your booking request",
    text: `Hi ${body.name},\n\nThanks for your booking request for ${body.sessionType} on ${bookingDate.toLocaleDateString()} at ${body.time}.\nWe will contact you within 24 hours to confirm.\n\nBest,\nPhoto Portfolio`,
  });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const dateParam = searchParams.get("date");

  if (!dateParam) {
    return NextResponse.json(
      { error: "Date parameter is required" },
      { status: 400 },
    );
  }

  const requestedDate = new Date(dateParam);
  if (isNaN(requestedDate.getTime())) {
    return NextResponse.json({ error: "Invalid date" }, { status: 400 });
  }

  const bookedSlots = bookings
    .filter(b => {
      const bDate = new Date(b.date);
      return bDate.toDateString() === requestedDate.toDateString();
    })
    .map(b => b.time);

  return NextResponse.json({ bookedSlots });
}

export async function POST(request: NextRequest) {
  try {
    const raw = await request.json();
    const builder = new BookingRequestBuilder().from(
      raw as Partial<BookingRequest>,
    );
    const built = builder.tryBuild();
    if (!built.ok) {
      return NextResponse.json(
        { error: built.error },
        { status: built.status },
      );
    }
    const body = built.value;
    const bookingDate = new Date(body.date);

    // Check for double booking
    const isBooked = bookings.some(b => {
      const bDate = new Date(b.date);
      return (
        bDate.toDateString() === bookingDate.toDateString() &&
        b.time === body.time
      );
    });

    if (isBooked) {
      return NextResponse.json(
        {
          error:
            "This time slot is already booked. Please choose another time.",
        },
        { status: 409 },
      );
    }

    // Here you would typically:
    // 1. Save to database
    // 2. Send confirmation email to client
    // 3. Send notification email to photographer
    // 4. Check availability

    console.log("New booking request:", {
      ...body,
      bookingDate,
      timestamp: new Date().toISOString(),
    });

    try {
      await sendBookingEmails(body, bookingDate);
    } catch (mailError) {
      console.error("Email sending failed:", mailError);
    }

    // Save booking to in-memory storage
    bookings.push({ date: body.date, time: body.time });

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json(
      {
        success: true,
        message:
          "Booking request received. We will contact you within 24 hours to confirm.",
        bookingId: `BK${Date.now()}`,
        details: {
          date: bookingDate.toLocaleDateString(),
          time: body.time,
          sessionType: body.sessionType,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Booking API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
