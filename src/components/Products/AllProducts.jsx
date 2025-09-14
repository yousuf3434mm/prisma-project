import Link from "next/link";
import React from "react";

const AllProducts = ({ product }) => {
  return (
    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md bg-white shadow-lg rounded-2xl overflow-hidden border border-purple-200 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 mx-auto">
      {/* Product Image */}
      <div className="bg-gray-100 flex items-center justify-center h-40 sm:h-48">
        {/* Replace src with product.image if available */}
        
        <Link href={`/products/${product.id}`}>
        <img
          src={product.image || "https://via.placeholder.com/150"}
          alt={product.productname}
          className="object-contain h-32 sm:h-40"
        />
        </Link>
      </div>

      {/* Header */}
      <div className="bg-purple-800 text-white text-center py-4">
        <h2 className="text-sm truncate mx-2">{product.productname}</h2>
      </div>

      {/* Product Details */}
      <div className="grid grid-cols-2 sm:p-6 space-x-4 text-sm sm:text-base">
        <div className="flex justify-items-start items-center border-b pb-2 space-x-2">
          <span className="font-semibold text-gray-600">Stock:</span>
          <span className="text-gray-800">{product.presentstock}</span>
        </div>
        <div className="flex justify-items-start items-center border-b pb-2 space-x-2">
          <span className="font-semibold text-gray-600">Purchase:</span>
          <span className="text-green-600 font-bold">
            {product.purchaseprice}
          </span>
        </div>
        <div className="flex justify-items-start items-center border-b pb-2 space-x-2">
          <span className="font-semibold text-gray-600">Sell:</span>
          <span className="text-purple-800 font-bold">
            {product.sellingprice}
          </span>
        </div>
        <div className="flex justify-items-start items-center border-b pb-2 space-x-2">
          <span className="font-semibold text-gray-600">Unit:</span>
          <span className="text-gray-800">{product.unit}</span>
        </div>
      </div>

      {/* Action Button */}
      <div className="px-5 sm:px-6 pb-5">
        <Link href={`/products/${product.id}`}>View Details</Link>
      </div>
    </div>
  );
};

export default AllProducts;
