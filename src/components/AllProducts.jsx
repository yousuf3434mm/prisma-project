import Link from "next/link";
import React from "react";

const AllProducts = ({ product }) => {
  return (
    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md bg-white shadow-lg rounded-2xl overflow-hidden border border-purple-200 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 mx-auto">
      {/* Product Image */}
      <div className="bg-gray-100 flex items-center justify-center h-40 sm:h-48">
        {/* Replace src with product.image if available */}
        <img
          src={product.image || "https://via.placeholder.com/150"}
          alt={product.productname}
          className="object-contain h-32 sm:h-40"
        />
      </div>

      {/* Header */}
      <div className="bg-purple-800 text-white text-center py-2">
        <Link href={`/products/${id}`}>
        <h2 className="text-lg sm:text-xl font-bold truncate">
          {product.productname}
        </h2>
        </Link>
      </div>

      {/* Product Details */}
      <div className="p-5 sm:p-6 space-y-2 text-sm sm:text-base">
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-semibold text-gray-600">Present Stock:</span>
          <span className="text-gray-800">{product.presentstock}</span>
        </div>
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-semibold text-gray-600">Purchase Price:</span>
          <span className="text-green-600 font-bold">
            {product.purchaseprice}
          </span>
        </div>
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-semibold text-gray-600">Selling Price:</span>
          <span className="text-purple-800 font-bold">
            {product.sellingprice}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-600">Unit:</span>
          <span className="text-gray-800">{product.unit}</span>
        </div>
      </div>

      {/* Action Button */}
      <div className="px-5 sm:px-6 pb-5">
        <button
          className="w-full bg-purple-800 text-white py-2.5 rounded-lg font-medium hover:bg-purple-900 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          aria-label={`View details for ${product.productname}`}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default AllProducts;
