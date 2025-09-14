import React from "react";

const AllNumbers = ({ number }) => {
  const { username, phone } = number;
  return (
    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md bg-white shadow-lg rounded-2xl overflow-hidden border border-purple-200 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 mx-auto">
      {/* Header */}
      <div className="bg-purple-800 text-white text-center py-4">
        <p className="text-lg sm:text-xl font-bold truncate">{username}</p>
        <p className="text-lg sm:text-xl font-bold truncate">{phone}</p>
      </div>
    </div>
  );
};

export default AllNumbers;
