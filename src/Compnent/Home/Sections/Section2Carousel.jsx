import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GrNext } from "react-icons/gr";
import { MdArrowBackIosNew } from "react-icons/md";
import { IoStarSharp } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import "../Styles/Section2Carousel.css";
import { CARD_CATEGORIES } from "../../../data/cardCategories";
import { getCategoryCollectionPath } from "../../../utils/productCatalog";

function Section2Carousel() {
  const PrevArrow = ({ onClick }) => (
    <button
      type="button"
      className="section2-carousel-arrow section2-carousel-arrow--prev"
      onClick={onClick}
      aria-label="Previous slide"
    >
      <MdArrowBackIosNew />
    </button>
  );

  const NextArrow = ({ onClick }) => (
    <button
      type="button"
      className="section2-carousel-arrow section2-carousel-arrow--next"
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
    arrows: true,
    slidesToShow: 3,
    slidesToScroll: 1,
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
          arrows: true,
        },
      },
    ],
  };

  return (
    <div className="section2-carousel-wrapper">
      <div className="slider-container">
        <Slider {...settings}>
          {CARD_CATEGORIES.map((category) => (
            <div key={category.slug}>
              <NavLink
                to={getCategoryCollectionPath(category.slug)}
                className="discounted-offer-card-link"
              >
                <div className="Discounted-slide1-main">
                  <div className="slide1-inner">
                    <div className="slide1-text">
                      <h2>{category.name}</h2>
                      <span className="strike-through">
                        ${category.originalPrice}
                      </span>
                      <p className="slide1-price">${category.price}</p>
                      <div className="slide1-stars" aria-hidden="true">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <IoStarSharp key={index} />
                        ))}
                      </div>
                    </div>
                    <div className="slide1-img">
                      <img
                        src={category.image}
                        alt={category.name}
                        className={category.imageClass || ""}
                      />
                    </div>
                  </div>
                </div>
              </NavLink>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Section2Carousel;
