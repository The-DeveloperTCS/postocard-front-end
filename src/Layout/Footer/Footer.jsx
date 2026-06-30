import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../Assets/logo 1.png";
import { FaLinkedin } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaSkype } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaPinterest } from "react-icons/fa";
import "./Footer.css";

const companyLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/contactus", label: "Contact-Us" },
  { to: "/aboutus", label: "About-Us" },
  { to: "/privacypolicy", label: "Privacy-policy" },
  { to: "/termsconditions", label: "terms-conditions" },
  { to: "/refundpolicy", label: "Refund-Policy" },
];

const categoryLinks = [
  "Wedding card",
  "Birthday card",
  "Christamas card",
  "Valentine card",
  "anniversary Card",
  "Engagment Card",
  "Party Card",
  "Best Wishes card",
];

const Footer = () => {
  return (
    <div className="footer-main">
      <div className="footer-main-inner">
        <div className="footer-logo-text">
          <NavLink to="/">
            <img src={logo} alt="" />
          </NavLink>
          <p>
            Lorem ipsum dolor sit amet, consectetur theithis adipiscing elit.
            Quis facilisis quam semper urna rutrum egestas ante.
          </p>
        </div>
        <div className="footer-links-left">
          <h2>Categories </h2>
          <ul>
            {categoryLinks.map((label) => (
              <li key={label}>
                <NavLink to="/allcollection/all">{label}</NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="vl"></div>
        <div className="footer-links-right">
          <h2>Company </h2>
          <ul>
            {companyLinks.map(({ to, label, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    isActive ? "nav-link-active" : ""
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
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
