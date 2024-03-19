import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import required modules
import { Navigation } from "swiper/modules";
import "./ViewMainProduct.css";
import { AiFillStar } from "react-icons/ai";
import { NavLink, Navigate, useNavigate } from "react-router-dom";

// const ViewMainProduct = ({ data }) => {
//   const navigate = useNavigate();
//   const redirect = (item) => {
//     // navigate(`/product/${item.id}`);
//     // <Navigate replace to={`/product/${item.id}`} />
//   };

//   return (
//     <>
//       {/* <button className="filter !w-[160px]">Apply Filter</button> */}
//       <div className="main_product_view">
//         {data &&
//           data?.map((item, index) => {
//             return (
//               <div className="main_product" key={index}>
//                 <p className="new_Arrival">New Arrival</p>
//                 {item?.Discount > 0 && (
//                   <div className="ribbon text-[13px] !z-[9] text-center">
//                     {`${(item?.Discount / item?.Price) * 100}%`} <br /> Off
//                   </div>
//                 )}

//                 {/* ---------- map images */}
//                 <Swiper
//                   navigation={true}
//                   modules={[Navigation]}
//                   className="mySwiper"
//                 >
//                   <SwiperSlide>
//                     <img src={item.File1 && item.File1} alt="" />
//                   </SwiperSlide>
//                   <SwiperSlide>
//                     <img src={item.File2 && item.File2} alt="" />
//                   </SwiperSlide>
//                   <SwiperSlide>
//                     <img src={item.File3 && item.File3} alt="" />
//                   </SwiperSlide>
//                   <SwiperSlide>
//                     <img src={item.File4 && item.File4} alt="" />
//                   </SwiperSlide>
//                 </Swiper>
//                 {/* ------------ */}
//                 <a
//                   href={`/product/${item.id}`}
//                   className="main_product_content"
//                 >
//                   <div className="main_product_content_title">
//                     {/* <div className='flex justify-between place-items-center'> */}
//                     <h3>{item.ProductName && item.ProductName}</h3>
//                     <p>15+ Sold</p>
//                     {/* </div> */}
//                   </div>
//                   <div className="main_product_content_description">
//                     <div className="price">
//                       <p>
//                         $
//                         {item?.Discount > 0
//                           ? item?.Price - item?.Discount
//                           : item.Price}
//                       </p>
//                       <p className="off">{item?.Discount > 0 && item?.Price}</p>
//                     </div>
//                     <p className="flex justify-center place-items-center ratting">
//                       <AiFillStar />
//                       4.5
//                     </p>
//                   </div>
//                   <button>Configure Card</button>
//                 </a>
//               </div>
//             );
//           })}
//       </div>
//     </>
//   );
// };

// export default ViewMainProduct;
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GrNext } from "react-icons/gr";
import { MdArrowBackIosNew } from "react-icons/md";
import wed from "../../Assets/images/Wedding Card2.png";
import newbd from "../../Assets/images/newbdc.png";
import "../Home/Styles/Carousel4.css";
// import "../Product/SingleProduct/Styles/";
import { IoStarSharp } from "react-icons/io5";

function ViewMainProduct() {
  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <button className="prev-arrow21" onClick={onClick}>
        <MdArrowBackIosNew />
      </button>
    );
  };

  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <button className="next-arrow21" onClick={onClick}>
        <GrNext />
      </button>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Default number of slides to show
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024, // Medium devices (tablets, 768px and up)
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 600, // Small devices (landscape phones, 576px and up)
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <div className="slider-container41">
      <Slider {...settings}>
        <div className="carousel41-main-slider">
          <div className="carousel41-img">
            <img src={newbd} alt="" style={{ width: "55%" }} />
          </div>
          <div className="carousel41-text">
            <h2>Wedding Card</h2>
            <p>15+ stock</p>
            <span>
              <IoStarSharp /> 4.5
            </span>
            <div className="carousel41-price-main">
              <div className="forcarousel4-price">
                <p>20$</p>
              </div>
              <div className="Confiqure-care1">
                <p>Confiqure care</p>
              </div>
            </div>
          </div>
        </div>
        <div className="carousel41-main-slider">
          <div className="carousel41-img">
            <img src={newbd} alt="" style={{ width: "55%" }} />
          </div>
          <div className="carousel41-text">
            <h2>Wedding Card</h2>
            <p>15+ stock</p>
            <span>
              <IoStarSharp /> 4.5
            </span>
            <div className="carousel41-price-main">
              <div className="forcarousel4-price">
                <p>20$</p>
              </div>
              <div className="Confiqure-care1">
                <p>Confiqure care</p>
              </div>
            </div>
          </div>
        </div>
        <div className="carousel41-main-slider">
          <div className="carousel41-img">
            <img src={wed} alt="" />
          </div>
          <div className="carousel41-text">
            <h2>Wedding Card</h2>
            <p>15+ stock</p>
            <span>
              <IoStarSharp /> 4.5
            </span>
            <div className="carousel41-price-main">
              <div className="forcarousel4-price">
                <p>20$</p>
              </div>
              <div className="Confiqure-care1">
                <p>Confiqure care</p>
              </div>
            </div>
          </div>
        </div>
        <div className="carousel41-main-slider">
          <div className="carousel41-img">
            <img src={newbd} alt="" style={{ width: "55%" }} />
          </div>
          <div className="carousel41-text">
            <h2>Wedding Card</h2>
            <p>15+ stock</p>
            <span>
              <IoStarSharp /> 4.5
            </span>
            <div className="carousel41-price-main">
              <div className="forcarousel4-price">
                <p>20$</p>
              </div>
              <div className="Confiqure-care1">
                <p>Confiqure care</p>
              </div>
            </div>
          </div>
        </div>
        <div className="carousel41-main-slider">
          <div className="carousel41-img">
            <img src={wed} alt="" />
          </div>
          <div className="carousel41-text">
            <h2>Wedding Card</h2>
            <p>15+ stock</p>
            <span>
              <IoStarSharp /> 4.5
            </span>
            <div className="carousel41-price-main">
              <div className="forcarousel4-price">
                <p>20$</p>
              </div>
              <div className="Confiqure-care1">
                <p>Confiqure care</p>
              </div>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
}

export default ViewMainProduct;
