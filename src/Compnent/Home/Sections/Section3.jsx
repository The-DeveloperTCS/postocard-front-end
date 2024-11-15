import React, { useEffect, useState } from "react";
import "../Styles/Section3.css";
import happimg from "../../../Assets/images/HappyBirthday.png";
import { IoStarSharp } from "react-icons/io5";
import axios from "axios";
import { server } from "../../../Setting/GlobalVariable";
import Cookies from "js-cookie";

const Section3 = () => {
  const [mainFeaturedProduct, setmMinFeaturedProduct] = useState()

  useEffect(() => {
    fetchMainFeaturedProduct()
  }, [])

  const fetchMainFeaturedProduct = async () => {
    try {
      const response = await axios.get(`${server}/product/MainFeaturedProductList`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
        },
      });
      setmMinFeaturedProduct(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  
  return (
    <div className="section3">
      {mainFeaturedProduct !== undefined && (
        <>
          <div className="section3-left">
            <img src={mainFeaturedProduct?.File1} alt="" />
          </div>
          <div className="section3-right">
            <div className="section3-right-text">
              <h2>{mainFeaturedProduct?.ProductName}</h2>
              <p>
                {mainFeaturedProduct?.description}
              </p>
            </div>
            <div className="section3-cards-data">
              <div className="card-name-nbr">
                <h1>{mainFeaturedProduct?.sub_category_details?.SubCategoryName}</h1>
                <p>{mainFeaturedProduct?.quantity}+ Stock</p>
              </div>
              <div className="sectoion-3-cards-price">
                <h1>${mainFeaturedProduct?.Price}</h1>
                {/* <p>
                <IoStarSharp />
                4.5
              </p> */}
              </div>
              <div className="Configure-card">
                <button>Configure card</button>
              </div>
            </div>
            <div
              className=""
              style={{ width: "80%", margin: " 70px auto auto auto" }}
            >
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Section3;