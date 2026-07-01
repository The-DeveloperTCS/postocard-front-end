import React, { useState } from "react";
import InteractiveCardPreview from "./InteractiveCardPreview";
import SingleCardSidebar from "./SingleCardSidebar";
import ProductDetailPricing from "./ProductDetailPricing";
import CardPricingData from "./CardPricingData";
import Jointheclub from "./Jointheclub";
import { useSelector } from "react-redux";
import "./Styles/IndexCom.css";

const IndexCom = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [content, setContent] = useState("");
  const singleproduct = useSelector((state) => state.product.singleproduct);
  const displayName = `${firstName} ${lastName}`.trim();

  return (
    <div className="product-detail-page">
      <section className="product-detail-hero">
        <div className="product-detail-left">
          <SingleCardSidebar
            firstName={firstName}
            lastName={lastName}
            setFirstName={setFirstName}
            setLastName={setLastName}
            setContent={setContent}
            productName={singleproduct?.ProductName}
          />
          <div className="product-detail-meta">
            <h2>{singleproduct?.ProductName || "Your card"}</h2>
            <p>
              Personalize your card with a name and message, then press Next to
              open it and preview the inside before adding to cart.
            </p>
          </div>
        </div>

        <div className="product-detail-right">
          <InteractiveCardPreview content={content} displayName={displayName} />
          <ProductDetailPricing name={displayName} content={content} />
        </div>
      </section>

      <CardPricingData content={content} name={displayName} />
      <Jointheclub />
    </div>
  );
};

export default IndexCom;
