import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GrNext } from "react-icons/gr";
import { MdArrowBackIosNew } from "react-icons/md";
import wed from "../../../Assets/images/Wedding Card2.png";
import newbd from "../../../Assets/images/newbdc.png";
import "../Styles/Carousel4.css";
import { IoStarSharp } from "react-icons/io5";

const products = [
  { title: "Wedding Card", image: wed, imageClass: "" },
  { title: "Birthday Card", image: newbd, imageClass: "carousel4-img-photo" },
  { title: "Wedding Card", image: wed, imageClass: "" },
  { title: "Birthday Card", image: newbd, imageClass: "carousel4-img-photo" },
  { title: "Wedding Card", image: wed, imageClass: "" },
];

const FeaturedProductCard = ({ title, image, imageClass }) => (
  <div className="carousel4-main-slider">
    <div className="carousel4-img">
      <img src={image} alt={title} className={imageClass} />
    </div>
    <div className="carousel4-text">
      <h2>{title}</h2>
      <div className="carousel4-meta">
        <p className="carousel4-stock">15+ stock</p>
        <span className="carousel4-rating">
          <IoStarSharp /> 4.5
        </span>
      </div>
      <div className="carousel4-price-main">
        <div className="forcarousel4-price">
          <p>$20</p>
        </div>
        <div className="Confiqure-care">
          <p>Configure card</p>
        </div>
      </div>
    </div>
  </div>
);

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

  return (
    <div className="carousel4-wrapper">
      <div className="slider-container4">
        <Slider {...settings}>
          {products.map((product, index) => (
            <div key={`${product.title}-${index}`}>
              <FeaturedProductCard {...product} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Carousel4;
