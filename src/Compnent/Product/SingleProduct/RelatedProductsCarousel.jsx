import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GrNext } from "react-icons/gr";
import { MdArrowBackIosNew } from "react-icons/md";
import ProductGridCard from "../../shared/ProductGridCard";
import "./Styles/RelatedProductsCarousel.css";

function RelatedProductsCarousel({ products = [] }) {
  const PrevArrow = ({ onClick }) => (
    <button
      type="button"
      className="related-carousel-arrow related-carousel-arrow--prev"
      onClick={onClick}
      aria-label="Previous"
    >
      <MdArrowBackIosNew />
    </button>
  );

  const NextArrow = ({ onClick }) => (
    <button
      type="button"
      className="related-carousel-arrow related-carousel-arrow--next"
      onClick={onClick}
      aria-label="Next"
    >
      <GrNext />
    </button>
  );

  const settings = {
    dots: false,
    infinite: products.length > 3,
    speed: 500,
    slidesToShow: Math.min(3, products.length || 1),
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1080,
        settings: { slidesToShow: Math.min(2, products.length || 1) },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  if (!products.length) return null;

  return (
    <div className="related-products-carousel">
      <Slider {...settings}>
        {products.map((product, index) => (
          <div key={product.id}>
            <ProductGridCard item={product} index={index} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default RelatedProductsCarousel;
