import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../Styles/Section2Carousel.css";
import { GrNext } from "react-icons/gr";
import { MdArrowBackIosNew } from "react-icons/md";
import wedimg from "../../../Assets/images/Wedding Card.png";
import bdimg from "../../../Assets/images/Birthday Card.png";
import crisimg from "../../../Assets/images/christmas Card.png";

const slides = [
  { title: "Wedding Card", image: wedimg, tilt: true },
  { title: "Birthday Card", image: bdimg, tilt: false },
  { title: "christmas Card", image: crisimg, tilt: true },
];

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
          {slides.map((slide, index) => (
            <div key={`${slide.title}-${index}`}>
              <div className="Discounted-slide1-main">
                <div className="slide1-inner">
                  <div className="slide1-text">
                    <h2>{slide.title}</h2>
                    <span className="strike-through">$30</span>
                    <p className="slide1-price">$20</p>
                  </div>
                  <div className="slide1-img">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className={slide.tilt ? "slide1-img-tilted" : ""}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Section2Carousel;
