import React, { useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import "../payments/Styles/PriceDropdown.css";

const PriceDropdown = ({ cart }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`payment_dropdown ${isOpen ? "active" : ""}`}>
      <div className="payment_title" onClick={toggleDropdown}>
        <p
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0px 30px 0px 15px",
          }}
        >
          Subtotal
          <span>$120{cart?.CartData?.GrossAmount} </span>
        </p>
        <IoChevronDown />
     
      <div className="payment_content">
        {/* <p>
          Subtotal
          <span>${cart?.CartData?.GrossAmount}</span>
        </p> */}
        <p>
          Discount Coupon
          <span>$20{cart?.CartData?.Discount}</span>
        </p>
        <p className="payment_total">
          Total
          <span>$100{cart?.CartData?.NetAmount}</span>
        </p>
      </div>
      </div>
    </div>
  );
};

export default PriceDropdown;
