import React from "react";
import ProductDetails1 from "@/components/Products/ProductDetails1";
import Container from "@/components/Container/Container";
import { product } from "../../../../utils/product";

interface IParams {
  productid: string;
}

export default function ProdductID({ params }: { params: IParams }) {

    console.log("params", params)
  return (
    <div>
      <Container>
        <ProductDetails1 product={product} />
      </Container>
    </div>
  );
}
