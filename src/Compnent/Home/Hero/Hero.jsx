import React from "react";
import "../Styles/Hero.css";
import herosec from "../../../Assets/images/herosec-1.png";
const Hero = () => {
  return (
    <div className="hero">
      {/* -------- left  */}
      <div className="left_hero">
        <h2>
          Lets gather for
          <br /> the extreme Fun..
        </h2>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer.
        </p>
      </div>
      {/* ----------- */}
      <div className="right_hero">
        <img src={herosec} alt="" />
      </div>
    </div>
  );
};

export default Hero;