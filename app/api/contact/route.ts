import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const ownerEmail = process.env.OWNER_EMAIL;
    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT ?? 0);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const secure =
      String(process.env.SMTP_SECURE ?? "false").toLowerCase() === "true";

    if (!ownerEmail || !host || !port || !user || !pass) {
      console.error("SMTP not configured");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });

    // Email to Owner (You)
    await transporter.sendMail({
      from: `"Contact Form" <${user}>`,
      to: ownerEmail, // artsbypaulray@gmail.com
      replyTo: email,
      subject: `New Contact Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>New Contact Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <hr />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    });

    // Email to User (Auto-reply)
    await transporter.sendMail({
      from: `"Photo Portfolio" <${user}>`,
      to: email,
      subject: "We received your message",
      text: `Hi ${name},\n\nThank you for contacting us. We have received your message and will get back to you shortly.\n\nBest regards,\nAPD.by Paul-Ray-vibes Photography`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Message Received</h2>
          <p>Hi ${name},</p>
          <p>Thank you for contacting us. We have received your message and will get back to you shortly.</p>
          <hr />
          <p><strong>Your Message:</strong></p>
          <p style="white-space: pre-wrap; color: #555;">${message}</p>
          <br />
          <p>Best regards,<br>APD.by Paul-Ray-vibes Photography</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
