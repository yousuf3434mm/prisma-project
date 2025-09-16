"use client";

import React from "react";
import { CartProductType } from "./ProductDetails1";

interface SetQuantityProps {
  cartCounter?: boolean;
  cartProduct: CartProductType;
  handleQuantityIncrease: () => void;
  handleQuantityDecrease: () => void;
}

export default function SetQuantity({
  cartCounter,
  cartProduct,
  handleQuantityIncrease,
  handleQuantityDecrease,
}: SetQuantityProps) {
  return (
    <div className="flex items-center gap-6">
      {/* Label */}
      {!cartCounter && (
        <div className="text-base font-semibold text-gray-700">
          Quantity
        </div>
      )}

      {/* Buttons & Display */}
      <div className="flex items-center bg-gray-100 rounded-xl shadow-sm overflow-hidden">
        <button
          onClick={handleQuantityDecrease}
          className="px-4 text-lg font-bold text-gray-600 hover:bg-gray-200 active:bg-gray-300 transition-colors"
        >
          −
        </button>

        <span className="px-5  text-lg font-semibold text-gray-800 bg-white">
          {cartProduct.quantity}
        </span>

        <button
          onClick={handleQuantityIncrease}
          className="px-4  text-lg font-bold text-gray-600 hover:bg-gray-200 active:bg-gray-300 transition-colors"
        >
          +
        </button>
      </div>
    </div>
  );
}
