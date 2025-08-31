import ProductDetails from "@/components/ProductDetails";
import { PrismaClient } from "@prisma/client";
import React from "react";

const prisma = new PrismaClient();

const Page = async ({ params }: { params: { id: string } }) => {
  const productId = params.id;

  // যদি Prisma id number হয় → Number(productId)
  const productDetails = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!productDetails) {
    return (
      <p className="text-center text-gray-500 text-lg">
        No product available at the moment.
      </p>
    );
  }

  return <ProductDetails product={productDetails} />;
};

export default Page;
