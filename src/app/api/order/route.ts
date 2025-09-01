// app/api/order/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { fullName, email, village, po, postcode, upazilla, zilla, paymentMethod, items, totalAmount } = data;

    const order = await prisma.order.create({
      data: {
        fullName,
        email,
        village,
       po,
        postcode,
        upazilla,
        zilla,
        paymentMethod,
        items,
        totalAmount,
      },
    });

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to create order" }, { status: 500 });
  }
}
