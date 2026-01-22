import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { sendNewQuoteEmail, sendCustomerConfirmationEmail } from "@/lib/email";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Basic validation
    if (!body.fullName || !body.phone || !body.items) {
      return NextResponse.json(
        { error: "Missing required fields (fullName, phone, items)." },
        { status: 400 }
      );
    }

    const created = await prisma.quoteRequest.create({
      data: {
        fullName: body.fullName,
        phone: body.phone,
        email: body.email || null,
        company: body.company || null,
        location: body.location || null,
        service: body.service || "Office Supplies & Stationery",
        items: body.items,
        budget: body.budget || null,
        deliveryDate: body.deliveryDate || null,
        status: "new",
      },
    });

    // ✅ Admin email notification
    try {
      await sendNewQuoteEmail({
        fullName: body.fullName,
        phone: body.phone,
        email: body.email || undefined,
        company: body.company || undefined,
        location: body.location || undefined,
        service: body.service || "Office Supplies & Stationery",
        items: body.items,
        budget: body.budget || undefined,
        deliveryDate: body.deliveryDate || undefined,
      });
    } catch (emailErr) {
      console.error("Admin email failed:", emailErr);
    }

    // ✅ Customer confirmation email (only if they entered an email)
    try {
      const customerEmail = (body.email || "").trim();
      if (customerEmail) {
        await sendCustomerConfirmationEmail({
          customerEmail,
          fullName: body.fullName,
          phone: body.phone,
          service: body.service || "Office Supplies & Stationery",
          items: body.items,
          budget: body.budget || undefined,
          deliveryDate: body.deliveryDate || undefined,
        });
      }
    } catch (customerEmailErr) {
      console.error("Customer email failed:", customerEmailErr);
    }

    return NextResponse.json({ ok: true, id: created.id });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Something went wrong submitting your quote." },
      { status: 500 }
    );
  }
}