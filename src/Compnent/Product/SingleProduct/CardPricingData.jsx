import React from "react";
import { useSelector } from "react-redux";
import RelatedProductsCarousel from "./RelatedProductsCarousel";
import "./Styles/CardPricingData.css";

const CardPricingData = () => {
  const allProduct = useSelector((state) => state.product.allProduct);
  const singleproduct = useSelector((state) => state.product.singleproduct);
  const isLoading = useSelector((state) => state.product.singleProductLoad);

  const relatedProduct = allProduct?.filter(
    (item) =>
      item?.sub_category_details?.category_details?.CategoryName ===
        singleproduct?.sub_category_details?.category_details?.CategoryName &&
      item?.id !== singleproduct?.id
  );
  const sliceProduct = relatedProduct?.slice(0, 6) || [];

  if (isLoading) {
    return (
      <section className="also-like-section">
        <p className="also-like-loading">Loading...</p>
      </section>
    );
  }

  return (
    <section className="also-like-section">
      <div className="also-like-header">
        <div className="also-like-header__text">
          <h2>YOU MAY ALSO LIKE</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus,
            magnam accusantium necessitatibus non magni voluptates quas nam
            facilis saepe sint velit ut eligendi corporis, nobis iste!
          </p>
        </div>
      </div>

      {sliceProduct.length > 0 ? (
        <RelatedProductsCarousel products={sliceProduct} />
      ) : (
        <p className="also-like-empty">No related products found.</p>
      )}
    </section>
  );
};

export default CardPricingData;
