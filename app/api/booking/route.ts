import { NextRequest, NextResponse } from "next/server";
import type { Transporter } from "nodemailer";
import nodemailer from "nodemailer";
import { adminDB } from "@/lib/firebase-admin";

export const dynamic = "force-dynamic";

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

// Helper to check if a date string matches requested date (ignoring time)
function isSameDate(dateStr: string, requestedDate: Date) {
  const d = new Date(dateStr);
  return d.toDateString() === requestedDate.toDateString();
}

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

  // Replace this with your actual logo URL (must be an absolute URL, e.g., https://your-site.com/logo.png)
  const logoUrl = "https://via.placeholder.com/200x60/000000/ffffff?text=APD.by+Paul-Ray-vibes";

  const transporter: Transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  // 1. Email to Owner (You)
  const ownerText = [
    `New Booking Request`,
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

  const ownerHtml = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="${logoUrl}" alt="APD.by Paul-Ray-vibes" style="max-width: 200px; height: auto;">
      </div>
      <h2>New Booking Request</h2>
      <p>You have received a new booking request from your website.</p>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Name:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${body.name}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${body.email}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Phone:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${body.phone}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Session Type:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${body.sessionType}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Date:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${bookingDate.toLocaleDateString()}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Time:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${body.time}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Guests:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${body.guests}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Duration:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${body.duration}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Location:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${body.location}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Message:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${body.message}</td></tr>
      </table>
    </div>
  `;

  await transporter.sendMail({
    from: `"Photo Portfolio" <${user}>`,
    to: ownerEmail,
    replyTo: body.email,
    subject: `New Booking Request: ${body.name} - ${body.sessionType}`,
    text: ownerText,
    html: ownerHtml,
  });

  // 2. Email to Customer (Confirmation)
  const customerText = `Hi ${body.name},\n\nThanks for your booking request for ${body.sessionType} on ${bookingDate.toLocaleDateString()} at ${body.time}.\nWe will contact you within 24 hours to confirm.\n\nBest,\nAPD.by Paul-Ray-vibes Photography`;
  
  const customerHtml = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="${logoUrl}" alt="APD.by Paul-Ray-vibes" style="max-width: 200px; height: auto;">
      </div>
      <h2 style="color: #333;">Booking Request Received</h2>
      <p>Hi ${body.name},</p>
      <p>Thank you for requesting a <strong>${body.sessionType}</strong> session with us.</p>
      <p>We have received your details and will review your request. We aim to get back to you within 24 hours to confirm the booking.</p>
      
      <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <h3 style="margin-top: 0; font-size: 16px;">Request Details:</h3>
        <p style="margin: 5px 0;"><strong>Date:</strong> ${bookingDate.toLocaleDateString()}</p>
        <p style="margin: 5px 0;"><strong>Time:</strong> ${body.time}</p>
        <p style="margin: 5px 0;"><strong>Location:</strong> ${body.location || 'To be discussed'}</p>
      </div>

      <p>If you have any urgent questions, please reply to this email.</p>
      <p>Best regards,<br>APD.by Paul-Ray-vibes Photography</p>
    </div>
  `;

  await transporter.sendMail({
    from: `"Photo Portfolio" <${user}>`,
    to: body.email,
    subject: "We received your booking request",
    text: customerText,
    html: customerHtml,
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

  try {
    // Query Firestore for bookings on this date
    // Note: Storing date as ISO string allows string comparison if format matches,
    // but better to query range or filter in code if volume is low.
    // For now, let's fetch all future bookings or bookings near this date if possible.
    // Simpler: Fetch ALL bookings (if small scale) or use range query.
    // Let's use a range query for the whole day.
    
    const startOfDay = new Date(requestedDate);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(requestedDate);
    endOfDay.setHours(23, 59, 59, 999);

    // If dates are stored as ISO strings in "date" field:
    // We can't easily range query ISO strings unless they are strictly formatted.
    // However, our BookingRequest saves "date" as provided by frontend (likely ISO).
    // Let's assume we filter client-side or fetch strict matches if exact string matches.
    // But frontend sends "2023-10-25T..." usually.
    // Let's try to find bookings where the date matches string-wise?
    // Safer: Fetch bookings collection and filter. (Scale warning: okay for small business).
    
    const snapshot = await adminDB.collection("bookings").get();
    const bookedSlots: string[] = [];
    
    snapshot.forEach(doc => {
      const data = doc.data();
      if (data.date && isSameDate(data.date, requestedDate)) {
        bookedSlots.push(data.time);
      }
    });

    return NextResponse.json({ bookedSlots });
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    return NextResponse.json({ bookedSlots: [] }); // Fail graceful
  }
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
    const snapshot = await adminDB.collection("bookings").get();
    let isBooked = false;
    
    snapshot.forEach(doc => {
      const b = doc.data();
      if (b.date && b.time) {
         const bDate = new Date(b.date);
         if (bDate.toDateString() === bookingDate.toDateString() && b.time === body.time) {
           isBooked = true;
         }
      }
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

    // Save booking to Firestore
    try {
      await adminDB.collection("bookings").add({
        ...body,
        createdAt: new Date().toISOString()
      });
    } catch (dbError) {
      console.error("Database save failed:", dbError);
      // We continue to send email even if DB fails? Or fail?
      // Better to fail if DB is critical, but email is also critical.
      // Let's log and continue, or return error. 
      // If DB fails, we probably shouldn't confirm the booking.
      return NextResponse.json(
        { error: "Failed to save booking" },
        { status: 500 }
      );
    }

    try {
      await sendBookingEmails(body, bookingDate);
    } catch (mailError) {
      console.error("Email sending failed:", mailError);
    }

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
