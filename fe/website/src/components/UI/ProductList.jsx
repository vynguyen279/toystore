import React from "react";
import ProductCard from "./ProductCard";


const ProductList = (data) => {
  return (
    <>
      {
        data && data.map((item, index) => (
          <ProductCard item={item} />
        ))
      }
    </>
  );
};

export default ProductList;
