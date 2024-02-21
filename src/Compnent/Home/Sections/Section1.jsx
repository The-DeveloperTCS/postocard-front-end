import React from "react";
import "../Styles/Section1.css";
import madetrue from "../../../Assets/images/made-true.svg";
import nextday from "../../../Assets/images/next-day.svg";
import recyled from "../../../Assets/images/recyled.svg";
import unbeatable from "../../../Assets/images/unbeatable.svg";

const Section1 = () => {
  return (
    <div className="section1">
      <h2>What makes us different</h2>
      <div className="section1-box-main">
        <div className="section1-box1">
          <div className="for-box1-img">
            <img src={nextday} alt="" />
          </div>
          <h3>Next day as standard</h3>
          <p>
            Order before 3pm and get your order the next day as standard working
            days.
          </p>
        </div>
        <div className="section1-box1">
          <div className="for-box1-img">
            <img src={madetrue} alt="" />
          </div>
          <h3>Next day as standard</h3>
          <p>
            Order before 3pm and get your order the next day as standard working
            days.
          </p>
        </div>{" "}
        <div className="section1-box1">
          <div className="for-box1-img">
            <img src={unbeatable} alt="" />
          </div>
          <h3>Next day as standard</h3>
          <p>
            Order before 3pm and get your order the next day as standard working
            days.
          </p>
        </div>{" "}
        <div className="section1-box1">
          <div className="for-box1-img">
            <img src={recyled} alt="" />
          </div>
          <h3>Next day as standard</h3>
          <p>
            Order before 3pm and get your order the next day as standard working
            days.
          </p>
        </div>{" "}
      </div>
    </div>
  );
};

export default Section1;
