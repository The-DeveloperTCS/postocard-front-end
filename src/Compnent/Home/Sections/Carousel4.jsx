import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GrNext } from "react-icons/gr";
import { MdArrowBackIosNew } from "react-icons/md";
import "../Styles/Carousel4.css";


function Carousel4({ featuredProducts }) {
  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <button className="prev-arrow2" onClick={onClick}>
        <MdArrowBackIosNew />
      </button>
    );
  };

  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <button className="next-arrow2" onClick={onClick}>
        <GrNext />
      </button>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2, // Show 3 slides initially
    slidesToScroll: 1, // Scroll one slide at a time
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1200, // Adjust the breakpoint as needed
        settings: {
          slidesToShow: 2, // Show 2 slides on tablets
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // Adjust the breakpoint as needed
        settings: {
          slidesToShow: 1, // Show 1 slide on mobile devices
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="slider-container4">
      <Slider {...settings}>
        {featuredProducts.length > 0 && featuredProducts.map((fp, i) => {

          return (
            <div className="carousel4-main-slider">
              <div className="carousel4-img">
                <img src={fp.File1} alt="img" />
              </div>
              <div className="carousel4-text">
                <h2>{fp.ProductName}</h2>
                <p>{fp.quantity}+ stock</p>
                {/* <span>
                  <IoStarSharp /> 4.5
                </span> */}
                <div className="carousel4-price-main">
                  <div className="forcarousel4-price">
                    <p>${fp.Price}</p>
                  </div>
                  <div className="Confiqure-care">
                    <p>Confiqure care</p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </Slider>
    </div>
  );
}

export default Carousel4;