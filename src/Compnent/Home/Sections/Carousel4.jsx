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

function Carousel4() {
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
    slidesToShow: 2,
    slidesToScroll: 3,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <div className="slider-container4">
      <Slider {...settings}>
        <div className="carousel4-main-slider">
          <div className="carousel4-img">
            <img src={wed} alt="" />
          </div>
          <div className="carousel4-text">
            <h2>Wedding Card</h2>
            <p>15+ stock</p>
            <span>
              <IoStarSharp /> 4.5
            </span>
            <div className="carousel4-price-main">
              <div className="forcarousel4-price">
                <p>20$</p>
              </div>
              <div className="Confiqure-care">
                <p>Confiqure care</p>
              </div>
            </div>
          </div>
        </div>
        <div className="carousel4-main-slider">
          <div className="carousel4-img">
            <img src={newbd} alt="" style={{ width: "55%" }} />
          </div>
          <div className="carousel4-text">
            <h2>Wedding Card</h2>
            <p>15+ stock</p>
            <span>
              <IoStarSharp /> 4.5
            </span>
            <div className="carousel4-price-main">
              <div className="forcarousel4-price">
                <p>20$</p>
              </div>
              <div className="Confiqure-care">
                <p>Confiqure care</p>
              </div>
            </div>
          </div>
        </div>
        <div className="carousel4-main-slider">
          <div className="carousel4-img">
            <img src={wed} alt="" />
          </div>
          <div className="carousel4-text">
            <h2>Wedding Card</h2>
            <p>15+ stock</p>
            <span>
              <IoStarSharp /> 4.5
            </span>
            <div className="carousel4-price-main">
              <div className="forcarousel4-price">
                <p>20$</p>
              </div>
              <div className="Confiqure-care">
                <p>Confiqure care</p>
              </div>
            </div>
          </div>
        </div>
        <div className="carousel4-main-slider">
          <div className="carousel4-img">
            <img src={newbd} alt="" style={{ width: "55%" }} />
          </div>
          <div className="carousel4-text">
            <h2>Wedding Card</h2>
            <p>15+ stock</p>
            <span>
              <IoStarSharp /> 4.5
            </span>
            <div className="carousel4-price-main">
              <div className="forcarousel4-price">
                <p>20$</p>
              </div>
              <div className="Confiqure-care">
                <p>Confiqure care</p>
              </div>
            </div>
          </div>
        </div>
        <div className="carousel4-main-slider">
          <div className="carousel4-img">
            <img src={wed} alt="" />
          </div>
          <div className="carousel4-text">
            <h2>Wedding Card</h2>
            <p>15+ stock</p>
            <span>
              <IoStarSharp /> 4.5
            </span>
            <div className="carousel4-price-main">
              <div className="forcarousel4-price">
                <p>20$</p>
              </div>
              <div className="Confiqure-care">
                <p>Confiqure care</p>
              </div>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
}

export default Carousel4;
