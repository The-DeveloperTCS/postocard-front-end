import React from "react";
import ProductGridCard from "../shared/ProductGridCard";
import "./ViewMainProduct.css";

const ViewMainProduct = ({ data = [] }) => {
  return (
    <div className="main_product_view">
      {data?.map((item, index) => (
        <ProductGridCard
          key={item.id || `${item.ProductName}-${index}`}
          item={item}
          index={index}
        />
      ))}
    </div>
  );
};

export default ViewMainProduct;
