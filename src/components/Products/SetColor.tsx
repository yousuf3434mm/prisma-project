import React from "react";
import { CartProductType, SelectedImgType } from "./ProductDetails1";

interface SetColorProps {
  images: SelectedImgType[];
  cartProduct: CartProductType;
  handleColorSelect: (value: SelectedImgType) => void;
}

export default function SetColor({
  images,
  cartProduct,
  handleColorSelect,
}: SetColorProps) {
  return (
    <div className="flex flex-row gap-2">
      {/* হেডার */}
      <div className="flex gap-4 items-center mb-2">
        <span className="font-medium">Color:</span>
      </div>

      {/* কালারের তালিকা */}
      <div className="flex gap-1">
        {images.map((image) => {
          const isSelected = cartProduct.selectedImg.color === image.color;

          return (
            <div
              key={image.color} // রেন্ডারের জন্য key
              className={`h-7 w-7 rounded-full flex items-center justify-center border-teal-300 transition-all
                ${isSelected ? "border-[1.5px] shadow-md" : "border border-transparent"}`}
            >
              {/* ভেতরের কালার ডট */}
              <div
                onClick={() => handleColorSelect(image)} // এখানে ক্লিক করলে সিলেক্ট হবে
                style={{ background: image.colorCode }}
                className={`h-5 w-5 rounded-full border-[1.2px] border-slate-300 cursor-pointer hover:scale-110 transition-transform`}
                title={image.color} // Tooltip-এর জন্য কালারের নাম
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
