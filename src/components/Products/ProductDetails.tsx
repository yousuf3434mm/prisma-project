"use client";

import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

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
  image: string;
  iscopyormarketoriginalororignal: string;
  createdAt: Date;
  updatedAt: Date;
};

type ProductDetailsProps = {
  product: Product;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const router = useRouter();

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("bn-BD", {
      style: "currency",
      currency: "BDT",
    }).format(amount);

  // 🟡 Add to Cart
  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    // check if product already exists
    const existing = cart.find((item: any) => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.productname} added to cart!`);
  };

  // 🟣 Buy Now
  const handleBuyNow = () => {
    // store item temporarily for checkout
    localStorage.setItem(
      "checkoutItem",
      JSON.stringify({ ...product, quantity: 1 })
    );

    // redirect to checkout page
     router.push(`/checkout/${product.id}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Section */}
        <div>
          {product.image && (
            <Image
              src={product.image}
              alt={product.productname}
              width={500}
              height={400}
              className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-xl shadow-md"
            />
          )}
          <h1 className="text-2xl sm:text-3xl font-bold mt-4 text-gray-800">
            {product.productname}
          </h1>
          <p className="mt-3 text-gray-600 text-sm sm:text-base leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Right Section */}
        <div className="bg-purple-50 rounded-xl p-5 sm:p-6 shadow-inner flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm sm:text-base text-gray-700">
                <span className="font-semibold text-gray-900">Category:</span>{" "}
                {product.category}
              </p>
              <p className="text-sm sm:text-base text-gray-700">
                <span className="font-semibold text-gray-900">Sub-Category:</span>{" "}
                {product.subcategory}
              </p>
            </div>

            <div>
              <p className="text-sm sm:text-base text-gray-700">
                <span className="font-semibold text-gray-900">Stock:</span>{" "}
                {product.presentstock} {product.unit}
              </p>
              <p className="text-sm sm:text-base text-gray-700">
                <span className="font-semibold text-gray-900">Purchase Price:</span>{" "}
                {formatCurrency(product.purchaseprice)}
              </p>
            </div>

            <div>
              <p className="text-sm sm:text-base text-gray-700">
                <span className="font-semibold text-gray-900">Selling Price:</span>{" "}
                {formatCurrency(product.sellingprice)}
              </p>
              <p className="text-sm sm:text-base text-gray-700">
                <span className="font-semibold text-gray-900">Warranty:</span>{" "}
                {product.warranty}
              </p>
            </div>

            <div>
              <p className="text-sm sm:text-base text-gray-700">
                <span className="font-semibold text-gray-900">Quality:</span>{" "}
                {product.iscopyormarketoriginalororignal}
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg shadow transition"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 border-t pt-4 flex flex-col sm:flex-row justify-between text-xs sm:text-sm text-gray-500">
        <p>Created at: {product.createdAt.toLocaleString()}</p>
        <p>Updated at: {product.updatedAt.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default ProductDetails;
