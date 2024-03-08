import React from "react";
import "../Styles/Section2.css";
import { NavLink } from "react-router-dom";
import Section2Carousel from "./Section2Carousel";

const Section2 = () => {
  return (
    <div className="section2-main">
      <div className="section2-text-btn">
        <h2>Discounted offer</h2>
        <NavLink to={"/allcollection/all"}>
          <button className="rounded-md">View All</button>
        </NavLink>
      </div>
      <div className="for-section2-caroudel">
        <Section2Carousel />
      </div>
    </div>
  );
};

export default Section2;
