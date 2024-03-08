import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../Styles/Section3Carousel.css";
import { GrNext } from "react-icons/gr";
import { MdArrowBackIosNew } from "react-icons/md";
// import slider1 from "../../../Assets/images/sslider3.png";
import cardimgs from "../../../Assets/images/Occasions.png";

function Section3Carousel() {
  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <button className="prev-arrow1" onClick={onClick}>
        <MdArrowBackIosNew />
      </button>
    );
  };

  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <button className="next-arrow1" onClick={onClick}>
        <GrNext />
      </button>
    );
  };
  const settings = {
    className: "center",
    centerMode: false,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 2,
    speed: 500,
    rows: 2,
    slidesPerRow: 2,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };
  return (
    <div className="slider-container1">
      <Slider {...settings}>
        <div className="section3-slide1">
          <div className="slider-1img">
            <img src={cardimgs} alt="" />
          </div>
          <h2>Wedding</h2>
        </div>
        <div className="section3-slide1">
          <div className="slider-1img">
            <img src={cardimgs} alt="" />
          </div>
          <h2>Birthday</h2>
        </div>{" "}
        <div className="section3-slide1">
          <div className="slider-1img">
            <img src={cardimgs} alt="" />
          </div>
          <h2>christmas</h2>
        </div>{" "}
        <div className="section3-slide1">
          <div className="slider-1img">
            <img src={cardimgs} alt="" />
          </div>
          <h2>Valentine</h2>
        </div>{" "}
        <div className="section3-slide1">
          <div className="slider-1img">
            <img src={cardimgs} alt="" />
          </div>
          <h2>Anniversary</h2>
        </div>{" "}
        <div className="section3-slide1">
          <div className="slider-1img">
            <img src={cardimgs} alt="" />
          </div>
          <h2>Engagment</h2>
        </div>{" "}
        <div className="section3-slide1">
          <div className="slider-1img">
            <img src={cardimgs} alt="" />
          </div>
          <h2 style={{ marginLeft: "34px" }}>Party</h2>
        </div>
        <div className="section3-slide1">
          <div className="slider-1img">
            <img src={cardimgs} alt="" />
          </div>
          <h2> Best Wishes</h2>
        </div>
      </Slider>
    </div>
  );
}

export default Section3Carousel;
