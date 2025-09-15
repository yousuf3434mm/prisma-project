"use client";

import Image from "next/image";
import React from "react";
import { truncateText } from "../../../utils/truncateText";
import { formatPrice } from "../../../utils/formatePrice";
import {Rating} from "@mui/material";
import { useRouter } from "next/navigation";


interface ProductCardProps {
  data: any;
}


const ProductCard: React.FC<ProductCardProps> = ({ data }) => {

  const router = useRouter()
  

  const productRating = data.reviews.length === 0 ? 0 : data.reviews.reduce((acc: number, review: { rating: number }) => acc + review.rating, 0) / data.reviews.length;

  return (
    <div onClick={()=> router.push(`/product/${data.id}`)} className="col-span-1 cursor-pointer border-[1.2px] border-slate-200 bg-slate-50 rounded-sm p-2 transition hover:scale-105 text-center text-sm">
      <div className="flex flex-col gap-1 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-md">
          <Image src={data.images[0].image} alt={data.name} fill className="w-full h-full object-cover"/>
        </div>
        <div>
          <h2 className="font-bold text-start text-xl mt-4">{truncateText(data.name)}</h2>
        </div>
        <div></div>
        <div className="flex items-center gap-2">
          <div><Rating  readOnly value={productRating}/></div>
        <div>{data.reviews.length} Reviews</div>
        </div>
        <div className="font-semibold text-start">  {formatPrice(data.price)}</div>
        <div className="text-start">{truncateText(data.description)}</div>
      </div>
    </div>
  );
}

export default ProductCard;
