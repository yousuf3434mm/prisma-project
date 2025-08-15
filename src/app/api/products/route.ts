import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/prismadb';


export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const product = await prisma.product.create({
      data: {
        productname: data.productname,
        presentstock: parseInt(data.presentstock, 10),
        purchaseprice: parseFloat(data.purchaseprice),
        sellingprice: parseFloat(data.sellingprice),
        unit: data.unit,
        category: data.category,
        subcategory: data.subcategory,
        description: data.description,
        warranty: data.warranty,
        
        
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
