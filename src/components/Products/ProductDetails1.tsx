"use client";

import { Rating } from "@mui/material";
import React from "react";
import Horizontal from "../../../utils/horizontal";

interface ProductDetails1Props {
  product: any;
}

const ProductDetails1: React.FC<ProductDetails1Props> = ({ product }) => {
  const productRating =
    product.reviews.length === 0
      ? 0
      : product.reviews.reduce(
          (acc: number, review: { rating: number }) => acc + review.rating,
          0
        ) / product.reviews.length;

  return (
    <div className="max-w-7xl mx-auto p-6 mt-6 bg-white rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left - Product Image */}
        <div className="w-full h-[400px] bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
          {/* Replace this with actual product image */}
          <img
            src={product.image || "/placeholder.jpg"}
            alt={product.name}
            className="object-contain max-h-full"
          />
        </div>

        {/* Right - Product Details */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-semibold text-slate-800">
              {product.name}
            </h1>

            {/* Rating and Review Count */}
            <div className="flex items-center gap-2 mt-3">
              <Rating value={productRating} precision={0.5} readOnly />
              <span className="text-slate-600 text-sm">
                {product.reviews.length}{" "}
                {product.reviews.length === 1 ? "Review" : "Reviews"}
              </span>
            </div>

            <Horizontal />

            {/* Description */}
            <p className="text-slate-600 text-base leading-relaxed mt-4">
              {product.description}
            </p>

            <Horizontal />

            {/* Other Info */}
            <div className="space-y-2 mt-4">
              <div className="text-base text-slate-700">
                <span className="font-semibold">Category:</span>{" "}
                {product.category}
              </div>
              <div className="text-xl font-bold text-green-600">
                ${product.price}
              </div>
              <div className="text-base text-slate-700">
                <span className="font-semibold">Brand:</span>{" "}
                {product.brand || "N/A"}
              </div>
              <div
                className={`text-base font-semibold ${
                  product.stock > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {product.stock > 0 ? `In Stock: ${product.stock}` : "Out of Stock"}
              </div>
            </div>
          </div>

          {/* Optional Button or Action */}
          <div className="mt-6">
            <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails1;
