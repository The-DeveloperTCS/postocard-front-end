import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GrNext } from "react-icons/gr";
import { MdArrowBackIosNew } from "react-icons/md";
import "../Styles/Carousel4.css";
import { CARD_CATEGORIES } from "../../../data/cardCategories";
import ProductGridCard from "../../shared/ProductGridCard";

function Carousel4() {
  const PrevArrow = ({ onClick }) => (
    <button
      type="button"
      className="carousel4-arrow carousel4-arrow--prev"
      onClick={onClick}
      aria-label="Previous slide"
    >
      <MdArrowBackIosNew />
    </button>
  );

  const NextArrow = ({ onClick }) => (
    <button
      type="button"
      className="carousel4-arrow carousel4-arrow--next"
      onClick={onClick}
      aria-label="Next slide"
    >
      <GrNext />
    </button>
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1080,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const carouselProducts = CARD_CATEGORIES.map((category, index) => ({
    id: `catalog-${category.slug}`,
    ProductName: category.name,
    Price: category.price,
    Discount: category.originalPrice - category.price,
    File1: category.image,
    _imageClass: category.imageClass || "",
    _fallbackIndex: index,
  }));

  return (
    <div className="carousel4-wrapper">
      <div className="slider-container4">
        <Slider {...settings}>
          {carouselProducts.map((product, index) => (
            <div key={product.id}>
              <ProductGridCard item={product} index={index} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Carousel4;
