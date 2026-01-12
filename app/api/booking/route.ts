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

export async function POST(request: NextRequest) {
  try {
    const body: BookingRequest = await request.json();
    
    // Validate required fields
    const requiredFields = ["name", "email", "phone", "sessionType", "date", "time"];
    for (const field of requiredFields) {
      if (!body[field as keyof BookingRequest]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate phone number (basic validation)
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(body.phone.replace(/[\s\-\(\)]/g, ""))) {
      return NextResponse.json(
        { error: "Invalid phone number format" },
        { status: 400 }
      );
    }

    // Validate date is in the future
    const bookingDate = new Date(body.date);
    const now = new Date();
    if (bookingDate <= now) {
      return NextResponse.json(
        { error: "Booking date must be in the future" },
        { status: 400 }
      );
    }

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