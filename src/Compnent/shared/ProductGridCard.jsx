import React from "react";
import { IoStarSharp } from "react-icons/io5";
import ConfigureCardLink from "./ConfigureCardLink";
import { getProductId } from "../../utils/productLink";
import "./ProductCard.css";

const ProductGridCard = ({ item, index = 0 }) => {
  const productId = getProductId(item);
  const hasDiscount = item?.Discount > 0;
  const salePrice = hasDiscount ? item.Price - item.Discount : item?.Price ?? 20;
  const originalPrice = hasDiscount ? item?.Price : null;

  return (
    <article className="product-card">
      <div className="product-card__image-wrap">
        {hasDiscount && <span className="product-card__badge">Sale</span>}
        <div className="product-card__image-frame">
          <img
            src={item?.File1}
            alt={item?.ProductName}
            loading="lazy"
          />
        </div>
      </div>

      <div className="product-card__body">
        <h3 className="product-card__title">{item?.ProductName}</h3>

        <div className="product-card__meta">
          <span className="product-card__stock">15+ stock</span>
          <span className="product-card__rating" aria-label="Rating 4.5 out of 5">
            {Array.from({ length: 5 }).map((_, starIndex) => (
              <IoStarSharp key={starIndex} />
            ))}
            <span className="product-card__rating-value">4.5</span>
          </span>
        </div>

        <div className="product-card__footer">
          <div className="product-card__price">
            {originalPrice != null && (
              <span className="product-card__price-old">
                ${Number(originalPrice).toFixed(0)}
              </span>
            )}
            <span className="product-card__price-current">
              ${Number(salePrice).toFixed(0)}
            </span>
          </div>

          <ConfigureCardLink
            title={item?.ProductName}
            productId={productId}
            fallbackIndex={item?._fallbackIndex ?? index}
            className="product-card__cta configure-card-link"
          >
            Configure card
          </ConfigureCardLink>
        </div>
      </div>
    </article>
  );
};

export default ProductGridCard;
