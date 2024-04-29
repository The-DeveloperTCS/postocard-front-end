import React from "react";
import "../Styles/Section4.css";
import Carousel4 from "./Carousel4";
const Sectoion4 = () => {
  return (
    <div className="section4">
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
        <button>
          {" "}
          <h2>View all</h2>{" "}
        </button>
      </div>
      <div className="section-4right">
      <Carousel4 slidesToShow={2} />

      </div>
    </div>
  );
};

export default Sectoion4;
