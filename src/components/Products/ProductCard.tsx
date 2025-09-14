"use client";

import Image from "next/image";
import React from "react";
import { truncateText } from "../../../utils/truncateText";
import { formatPrice } from "../../../utils/formatePrice";
import {Rating} from "@mui/material";


interface ProductCardProps {
  data: any;
}


const ProductCard: React.FC<ProductCardProps> = ({ data }) => {

  const productRating = data.reviews.length === 0 ? 0 : data.reviews.reduce((acc: number, review: { rating: number }) => acc + review.rating, 0) / data.reviews.length;

  return (
    <div className="col-span-1 cursor-pointer border-[1.2px] border-slate-200 bg-slate-50 rounded-sm p-2 transition hover:scale-105 text-center text-sm">
      <div className="flex flex-col gap-1 items-center w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-md">
          <Image src={data.images[0].image} alt={data.name} fill className="w-full h-full object-cover"/>
        </div>
        <div>
          <h2 className="font-semibold text-md mt-4">{truncateText(data.name)}</h2>
        </div>
        <div></div>
        <div>{data.reviews.length} Reviews</div>
        <div className="font-semibold">  {formatPrice(data.price)}</div>
        <div><Rating  readOnly value={productRating}/></div>
        <div></div>
      </div>
    </div>
  );
}

export default ProductCard;
