"use client";

import { Rating } from "@mui/material";
import React, { useState, useCallback } from "react";
import Horizontal from "../../../utils/horizontal";
import SetColor from "./SetColor";
import SetQuantity from "./SetQuantity";
import { Button } from "../ui/button";
import ProductImage from "./ProductImage";

interface ProductDetails1Props {
  product: any;
}

export type CartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectedImg: SelectedImgType;
  quantity: number;
  price: number;
};

export type SelectedImgType = {
  color: string;
  colorCode: string;
  image: string;
};

const ProductDetails1: React.FC<ProductDetails1Props> = ({ product }) => {
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImg: product.images?.[0] || { color: "", colorCode: "", image: "" },
    quantity: 1,
    price: product.price,
  });

  const handleColorSelect = useCallback(
    (value: SelectedImgType) => {
      setCartProduct((prev) => ({ ...prev, selectedImg: value }));
    },
    [cartProduct]
  );

  const productRating =
    product.reviews.length === 0
      ? 0
      : product.reviews.reduce(
          (acc: number, review: { rating: number }) => acc + review.rating,
          0
        ) / product.reviews.length;

  const handleQuantityIncrease = useCallback(() => {
    setCartProduct((prev) => {
      return { ...prev, quantity: prev.quantity + 1 };
    });
  }, []);

  const handleQuantityDecrease = useCallback(() => {
    setCartProduct((prev) => {
      if (prev.quantity > 1) {
        return { ...prev, quantity: prev.quantity - 1 };
      }
      return prev;
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6 mt-6 bg-white rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left - Product Image */}
        <div>
          <div className="w-full h-[400px] bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
            {/* Replace this with actual product image */}
            
            <ProductImage product={product} cartProduct={cartProduct} handleColorSelect={handleColorSelect}/>
            
          </div>
          {/* Description */}
          <p className="text-slate-600 text-base leading-relaxed mt-4 text-justify">
            {product.description}
          </p>
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

            {/* Other Info */}
            <div className="space-y-2 mt-4">
              <div className="text-base text-slate-700">
                <span className="font-semibold">Category:</span>{" "}
                {product.category}
              </div>
              <Horizontal />
              <div className="text-xl font-bold text-green-600">
                ${product.price}
              </div>
              <Horizontal />
              <div className="text-base text-slate-700">
                <span className="font-semibold">Brand:</span>{" "}
                {product.brand || "N/A"}
              </div>
              <Horizontal />
              <div
                className={`text-base font-semibold ${
                  product.inStock ? "text-green-600" : "text-red-600"
                }`}
              >
                {product.inStock ? "In Stock" : "Out of Stock"}
              </div>
              <Horizontal />
            </div>
            <div>
              <SetColor
                cartProduct={cartProduct}
                images={product.images}
                handleColorSelect={handleColorSelect}
              />
            </div>
            <Horizontal />
            <div className="mt-2">
              <SetQuantity
                cartProduct={cartProduct}
                handleQuantityIncrease={handleQuantityIncrease}
                handleQuantityDecrease={handleQuantityDecrease}
              />
            </div>
            <Horizontal />
            <Button className="bg-purple-700 hover:bg-purple-900 transition duration-200">
              Add To Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails1;
