import { NextRequest, NextResponse } from "next/server";

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

class BookingRequestBuilder {
  private data: Partial<BookingRequest> = {};
  set<K extends keyof BookingRequest>(key: K, value: BookingRequest[K]) {
    this.data[key] = typeof value === "string" ? value.trim() : value;
    return this;
  }
  from(body: Partial<BookingRequest>) {
    Object.entries(body).forEach(([k, v]) => {
      if (v !== undefined && v !== null) this.set(k as keyof BookingRequest, v as any);
    });
    return this;
  }
  tryBuild():
    | { ok: true; value: BookingRequest }
    | { ok: false; error: string; status: number } {
    const required = ["name", "email", "phone", "sessionType", "date", "time"] as const;
    for (const f of required) {
      if (!this.data[f]) return { ok: false, error: `Missing required field: ${f}`, status: 400 };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(String(this.data.email))) {
      return { ok: false, error: "Invalid email format", status: 400 };
    }
    const normalizedPhone = String(this.data.phone).replace(/[\s\-\(\)]/g, "");
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(normalizedPhone)) {
      return { ok: false, error: "Invalid phone number format", status: 400 };
    }
    const bookingDate = new Date(String(this.data.date));
    const now = new Date();
    if (!(bookingDate instanceof Date) || Number.isNaN(bookingDate.getTime())) {
      return { ok: false, error: "Invalid date", status: 400 };
    }
    if (bookingDate <= now) {
      return { ok: false, error: "Booking date must be in the future", status: 400 };
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

export async function POST(request: NextRequest) {
  try {
    const raw = await request.json();
    const builder = new BookingRequestBuilder().from(raw as Partial<BookingRequest>);
    const built = builder.tryBuild();
    if (!built.ok) {
      return NextResponse.json({ error: built.error }, { status: built.status });
    }
    const body = built.value;
    const bookingDate = new Date(body.date);

    // Here you would typically:
    // 1. Save to database
    // 2. Send confirmation email to client
    // 3. Send notification email to photographer
    // 4. Check availability
    
    // For now, we'll simulate a successful booking
    console.log("New booking request:", {
      ...body,
      bookingDate,
      timestamp: new Date().toISOString(),
    });

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json(
      { 
        success: true, 
        message: "Booking request received. We will contact you within 24 hours to confirm.",
        bookingId: `BK${Date.now()}`,
        details: {
          date: bookingDate.toLocaleDateString(),
          time: body.time,
          sessionType: body.sessionType,
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Booking API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
