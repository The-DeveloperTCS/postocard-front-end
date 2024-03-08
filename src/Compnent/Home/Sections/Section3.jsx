import React from "react";
import "../Styles/Section3.css";
import happimg from "../../../Assets/images/HappyBirthday.png";
import Section3Carousel from "./Section3Carousel";
import { IoStarSharp } from "react-icons/io5";

const Section3 = () => {
  return (
    <div className="section3">
      <div className="section3-left">
        <img src={happimg} alt="" />
      </div>
      <div className="section3-right">
        <div className="section3-right-text">
          <h2>Occasions</h2>
          <p>
            Welcome to TiatailToys, where joy reigns supreme! Dive into a world
            of enchantment with our Bubble Bath Toys, experience precision play
            with the Dart Shooter, and find warmth in our timeless Teddy Bears.
            Quality and safety are our top priorities, ensuring every TiatailToy
            is a trusted companion in the journey of childhood. Come, explore,
            and embrace the magic at TiatailToys – where playtime dreams come
            true
          </p>
        </div>
        <div className="section3-cards-data">
          <div className="card-name-nbr">
            <h1>Birthday Card</h1>
            <p>15+ stock</p>
          </div>
          <div className="sectoion-3-cards-price">
            <h1>$20</h1>
            <p>
              <IoStarSharp />
              4.5
            </p>
          </div>
          <div className="Configure-card">
            <button>Configure card</button>
          </div>
        </div>
        <div
          className=""
          style={{ width: "80%", margin: " 70px auto auto auto" }}
        >
          <Section3Carousel />
        </div>
      </div>
    </div>
  );
};

export default Section3;
