"use client"

import Image from "next/image";
import React from "react";

type Product = {
  id: string;
  productname: string;
  presentstock: number;
  purchaseprice: number;
  sellingprice: number;
  unit: string;
  category: string;
  subcategory: string;
  description: string;
  warranty: string;
 image: string
  createdAt: Date;
  updatedAt: Date;
};

type ProductDetailsProps = {
  product: Product;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("bn-BD", { style: "currency", currency: "BDT" }).format(amount);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">{product.productname}</h1>

      {product.image && (
        <Image
          src={product.image}
          alt={product.productname}
          width={500}
          height={400}
          className="w-full h-64 object-cover mb-4 rounded"
        />
      )}

      <p className="mb-2">
        <strong>Category:</strong> {product.category} / {product.subcategory}
      </p>

      <p className="mb-2">
        <strong>Stock:</strong> {product.presentstock} {product.unit}
      </p>

      <p className="mb-2">
        <strong>Purchase Price:</strong> {formatCurrency(product.purchaseprice)}
      </p>

      <p className="mb-2">
        <strong>Selling Price:</strong> {formatCurrency(product.sellingprice)}
      </p>

      <p className="mb-2">
        <strong>Warranty:</strong> {product.warranty}
      </p>

      <p className="mt-4">{product.description}</p>

      <p className="text-sm text-gray-500 mt-4">
        Created at: {product.createdAt.toLocaleString()}
      </p>
      <p className="text-sm text-gray-500">
        Updated at: {product.updatedAt.toLocaleString()}
      </p>
    </div>
  );
};

export default ProductDetails;
