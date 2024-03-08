import React from "react";
import logo from "../../Assets/logo 1.png";
import { FaLinkedin } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaSkype } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaPinterest } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer-main">
      <div className="footer-main-inner">
        <div className="footer-logo-text">
          <img src={logo} alt="" />
          <p>
            Lorem ipsum dolor sit amet, consectetur theithis adipiscing elit.
            Quis facilisis quam semper urna rutrum egestas ante.{" "}
          </p>
        </div>
        <div className="footer-links-left">
          <h2>Categories </h2>
          <ul>
            <li>Wedding card</li>
            <li>Birthday card</li>
            <li>Christamas card</li>
            <li>Valentine card</li>
            <li>anniversary Card</li>
            <li>Engagment Card</li>
            <li>Party Card</li>
            <li>Best Wishes card</li>
          </ul>
        </div>
        <div class="vl"></div>
        <div className="footer-links-right">
          <h2>Categories </h2>
          <ul>
            <li>Home</li>
            <li>Contact-Us</li>
            <li>About-Us</li>
            <li>Privacy-policy</li>
            <li>terms-conditions</li>
            <li>Refund-Policy</li>
          </ul>
        </div>
        <div className="footer-media">
          <FaLinkedin />
          <FaFacebookSquare />
          <FaInstagram />
          <FaSkype />
          <FaSquareXTwitter />
          <FaPinterest />
        </div>
      </div>
      <div className="footer-bootm">
        <p>Copyright 2023 PostoCard</p>
      </div>
    </div>
  );
};

export default Footer;
