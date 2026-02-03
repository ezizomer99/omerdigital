import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Create Gmail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Simple in-memory rate limiting (resets on server restart)
const rateLimitMap = new Map();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const timeWindow = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 3; // Max 3 submissions per 15 minutes per IP

  const requestLog = rateLimitMap.get(ip) || [];
  const requestsInWindow = requestLog.filter(
    (timestamp: number) => now - timestamp < timeWindow,
  );

  if (requestsInWindow.length >= maxRequests) {
    return false;
  }

  requestsInWindow.push(now);
  rateLimitMap.set(ip, requestsInWindow);
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Check rate limit
    if (!rateLimit(ip)) {
      return NextResponse.json(
        { error: "For mange forespørsler. Prøv igjen senere." },
        { status: 429 },
      );
    }

    const formData = await request.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const projectType = formData.get("project-type") as string;
    const message = formData.get("message") as string;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Navn, e-post og melding er påkrevd." },
        { status: 400 },
      );
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Ugyldig e-postadresse." },
        { status: 400 },
      );
    }

    // Spam detection (basic)
    const suspiciousPatterns = [
      /viagra/i,
      /casino/i,
      /lottery/i,
      /\$\$\$/,
      /urgent.*money/i,
      /click.*here.*now/i,
    ];

    const fullText = `${name} ${email} ${message}`.toLowerCase();
    if (suspiciousPatterns.some((pattern) => pattern.test(fullText))) {
      return NextResponse.json(
        { error: "Melding blokkert som spam." },
        { status: 400 },
      );
    }

    // Here you would normally send the email
    // For now, just log it (in production, use a proper email service)
    console.log("New contact form submission:", {
      name,
      email,
      projectType,
      message,
      timestamp: new Date().toISOString(),
      ip,
    });

    // Send email via Gmail SMTP
    try {
      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: process.env.GMAIL_USER, // Send to your own email
        replyTo: email, // Set reply-to as the form submitter
        subject: `Ny henvendelse fra ${name} - ${projectType || "Generell forespørsel"}`,
        html: `
          <h2>Ny kontakthenvendelse fra omerdigital.com</h2>
          <p><strong>Navn:</strong> ${name}</p>
          <p><strong>E-post:</strong> ${email}</p>
          <p><strong>Prosjekttype:</strong> ${projectType || "Ikke spesifisert"}</p>
          <p><strong>Melding:</strong></p>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
            ${message.replace(/\n/g, "<br>")}
          </div>
          <hr>
          <p style="color: #666; font-size: 12px;">
            Sendt: ${new Date().toLocaleString("no-NO")}<br>
            IP: ${ip}
          </p>
        `,
        text: `
Ny kontakthenvendelse fra omerdigital.com

Navn: ${name}
E-post: ${email}
Prosjekttype: ${projectType || "Ikke spesifisert"}

Melding:
${message}

---
Sendt: ${new Date().toLocaleString("no-NO")}
IP: ${ip}
        `,
      });

      // Send confirmation email to the user
      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: email,
        subject: "Takk for din henvendelse - Ømer Digital",
        html: `
          <h2>Takk for din henvendelse!</h2>
          <p>Hei ${name},</p>
          <p>Takk for at du tok kontakt med meg. Jeg har mottatt din melding og vil svare deg så snart som mulig, vanligvis innen 24 timer.</p>
          
          <h3>Din melding:</h3>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
            ${message.replace(/\n/g, "<br>")}
          </div>
          
          <p>Hvis du har hastende spørsmål, kan du også kontakte meg direkte på:</p>
          <ul>
            <li>E-post: oemerdigital@gmail.com</li>
          </ul>
          
          <p>Med vennlig hilsen,<br>
          <strong>Eziz Ømer - Ømer Digital</strong><br>
          Digital Konsulent & Webutvikler</p>
        `,
        text: `
Takk for din henvendelse!

Hei ${name},

Takk for at du tok kontakt med meg. Jeg har mottatt din melding og vil svare deg så snart som mulig, vanligvis innen 24 timer.

Din melding:
${message}

Hvis du har hastende spørsmål, kan du også kontakte meg direkte på:
- E-post: oemerdigital@gmail.com  

Med vennlig hilsen,
Eziz Ømer - ØmerDigital
Digital Konsulent & Webutvikler
        `,
      });
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      // Still return success to user, but log the email error
      // You might want to implement a fallback notification system
    }

    // TODO: Implement actual email sending here
    // You could use:
    // - Nodemailer with Gmail SMTP
    // - SendGrid
    // - Resend
    // - AWS SES

    return NextResponse.json(
      { success: true, message: "Melding sendt! Jeg vil svare snart." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Noe gikk galt. Prøv igjen senere." },
      { status: 500 },
    );
  }
}
