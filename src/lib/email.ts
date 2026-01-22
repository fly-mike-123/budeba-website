import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function assertEmailSetup() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("Missing RESEND_API_KEY in .env");
  }
  if (!process.env.ADMIN_EMAIL) {
    throw new Error("Missing ADMIN_EMAIL in .env");
  }
}

const FROM = "Budeba Quotes <onboarding@resend.dev>";

export async function sendNewQuoteEmail(payload: {
  fullName: string;
  phone: string;
  email?: string;
  company?: string;
  location?: string;
  service: string;
  items: string;
  budget?: string;
  deliveryDate?: string;
}) {
  assertEmailSetup();

  const to = process.env.ADMIN_EMAIL!;
  const subject = `New Quote Request: ${payload.fullName} (${payload.service})`;

  const text = `
New Quote Request Received

Name: ${payload.fullName}
Phone: ${payload.phone}
Email: ${payload.email || "-"}
Company: ${payload.company || "-"}
Location: ${payload.location || "-"}
Service: ${payload.service}
Budget: ${payload.budget || "-"}
Preferred Delivery Date: ${payload.deliveryDate || "-"}

Items Requested:
${payload.items}

---
Budeba General Enterprise Website
`.trim();

  await resend.emails.send({
    from: FROM,
    to,
    subject,
    text,
  });
}

export async function sendCustomerConfirmationEmail(payload: {
  customerEmail: string;
  fullName: string;
  phone: string;
  service: string;
  items: string;
  budget?: string;
  deliveryDate?: string;
}) {
  assertEmailSetup();

  const subject = "We received your quote request — Budeba General Enterprise";

  const text = `
Hello ${payload.fullName},

Thank you for contacting Budeba General Enterprise.
We have received your quote request and our team will contact you shortly.

Summary:
• Phone: ${payload.phone}
• Service: ${payload.service}
• Budget: ${payload.budget || "-"}
• Preferred Delivery Date: ${payload.deliveryDate || "-"}

Items Requested:
${payload.items}

If you need to add more details, reply to this email with updates.

Kind regards,
Budeba General Enterprise
`.trim();

  await resend.emails.send({
    from: FROM,
    to: payload.customerEmail,
    subject,
    text,
  });
}
