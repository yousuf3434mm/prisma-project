import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const timestamp = Date.now();
    const image: File | null = formData.get("image") as unknown as File;

    let imageUrl = "";
    if (image) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // নিরাপদ filename বানানো
      const ext = path.extname(image.name) || ".png";
      const filename = `${timestamp}${ext}`;
      const filepath = path.join(process.cwd(), "public", filename);

      await writeFile(filepath, buffer);
      imageUrl = `/${filename}`;
    }

    const product = await prisma.product.create({
      data: {
        productname: formData.get("productname") as string,
        presentstock: parseInt(formData.get("presentstock") as string),
        purchaseprice: parseFloat(formData.get("purchaseprice") as string),
        sellingprice: parseFloat(formData.get("sellingprice") as string),
        unit: formData.get("unit") as string,
        category: formData.get("category") as string,
        subcategory: formData.get("subcategory") as string,
        description: formData.get("description") as string,
        warranty: formData.get("warranty") as string,
        image: imageUrl,
        iscopyormarketoriginalororignal: formData.get("iscopyormarketoriginalororignal") as string,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Product create error:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
