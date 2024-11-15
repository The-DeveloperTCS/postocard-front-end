import React, { useEffect, useState } from "react";
import "../Styles/Section4.css";
import Carousel4 from "./Carousel4";

import axios from "axios";
import { server } from "../../../Setting/GlobalVariable";
import Cookies from "js-cookie";

const Sectoion4 = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])


  useEffect(() => {
    fetchFeaturedProduct()
  }, [])


  const fetchFeaturedProduct = async () => {
    try {
      const response = await axios.get(`${server}/product/featured/list`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
        },
      });
      setFeaturedProducts(response.data.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };


  return (
    <div className="section4">
      {featuredProducts.length > 2 && (
        <>
          <div className="section-4left">
            <h1>
              WE THINK YOU'LL <br />
              LOVE THESE
            </h1>
            <p>
              Welcome to TiatailToys, where joy reigns supreme! Dive into a world of
              enchantment with our Bubble Bath Toys, experience precision play with
              the Dart Shooter, and find warmth in our timeless Teddy Bears. Quality
              and safety are our top priorities, ensuring every TiatailToy is a
              trusted companion in the journey of childhood. Come, explore, and
              embrace the magic at TiatailToys – where playtime dreams come true
            </p>
            {/* <button>
          {" "}
          <h2>View all</h2>{" "}
        </button> */}
          </div>
          <div className="section-4right">
            <Carousel4 slidesToShow={2} featuredProducts={featuredProducts} />
          </div>
        </>
      )}
    </div>
  );
};

export default Sectoion4;
