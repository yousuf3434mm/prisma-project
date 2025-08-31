import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/prismadb';


export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const user = await prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: data.password,
        phone: data.phone,
        gender:data.gender,
        terms: data.terms,
        
        
        
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
