import React from "react";
import ProductDetails1 from "@/components/Products/ProductDetails1";
import { product } from "../../../../utils/product";
import Container from "@/components/Container/Container";

interface IParams {
  productid: string;
}

export default function ProdductID({ params }: { params: IParams }) {
  return (
    <div>
      <Container>
        <ProductDetails1 product={product} />
      </Container>
    </div>
  );
}
