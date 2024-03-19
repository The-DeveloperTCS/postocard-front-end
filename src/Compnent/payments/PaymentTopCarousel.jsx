import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../payments/Styles/PaymentTopCarousel.css";
import { GrNext } from "react-icons/gr";
import { MdArrowBackIosNew } from "react-icons/md";
import { IoStarSharp } from "react-icons/io5";
import wedimg from "../../Assets/images/Wedding Card.png";
import bdimg from "../../Assets/images/Birthday Card.png";
import crisimg from "../../Assets/images/christmas Card.png";

function PaymentTopCarousel() {
  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <button className="prev-arrow" onClick={onClick}>
        <MdArrowBackIosNew />
      </button>
    );
  };

  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <button className="next-arrow" onClick={onClick}>
        <GrNext />
      </button>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1224,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {/* slid2 */}
        <div className="Discounted-slide1-main">
          <div className="slide1-inner">
            <div className="slide1-text">
              <h2>Wedding Card</h2>
              <span className="strike-through">$30</span>
              <h1>$20</h1>
              <h3>
                {" "}
                <IoStarSharp />
                <IoStarSharp />
                <IoStarSharp />
                <IoStarSharp />
                <IoStarSharp />
              </h3>
            </div>
            <div className="slide1-img">
              <img src={wedimg} alt="" />
            </div>
          </div>
        </div>
        {/* slid2 */}
        <div className="Discounted-slide1-main">
          <div className="slide1-inner">
            <div className="slide1-text">
              <h2>Birthday Card</h2>
              <span className="strike-through">$30</span>
              <h1>$20</h1>
              <h3>
                {" "}
                <IoStarSharp />
                <IoStarSharp />
                <IoStarSharp />
                <IoStarSharp />
                <IoStarSharp />
              </h3>
            </div>
            <div className="slide1-img">
              <img src={bdimg} alt="" />
            </div>
          </div>
        </div>
        {/* slid2 */}
        <div className="Discounted-slide1-main">
          <div className="slide1-inner">
            <div className="slide1-text">
              <h2>christmas Card</h2>
              <span className="strike-through">$30</span>
              <h1>$20</h1>
              <h3>
                {" "}
                <IoStarSharp />
                <IoStarSharp />
                <IoStarSharp />
                <IoStarSharp />
                <IoStarSharp />
              </h3>
            </div>
            <div className="slide1-img">
              <img src={crisimg} alt="" />
            </div>
          </div>
        </div>
        {/* slid2 */}
        <div className="Discounted-slide1-main">
          <div className="slide1-inner">
            <div className="slide1-text">
              <h2>Wedding Card</h2>
              <span className="strike-through">$30</span>
              <h1>$20</h1>
              <h3>
                {" "}
                <IoStarSharp />
                <IoStarSharp />
                <IoStarSharp />
                <IoStarSharp />
                <IoStarSharp />
              </h3>
            </div>
            <div className="slide1-img">
              <img src={wedimg} alt="" />
            </div>
          </div>
        </div>
        {/* slid2 */}
        <div className="Discounted-slide1-main">
          <div className="slide1-inner">
            <div className="slide1-text">
              <h2>Wedding Card</h2>
              <span className="strike-through">$30</span>
              <h1>$20</h1>
              <h3>
                {" "}
                <IoStarSharp />
                <IoStarSharp />
                <IoStarSharp />
                <IoStarSharp />
                <IoStarSharp />
              </h3>
            </div>
            <div className="slide1-img">
              <img src={wedimg} alt="" />
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
}

export default PaymentTopCarousel;
