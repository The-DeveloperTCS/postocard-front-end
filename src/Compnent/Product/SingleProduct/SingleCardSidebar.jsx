import React from "react";
import "./Styles/SingleCardSidebar.css";

const SingleCardSidebar = ({
  firstName,
  lastName,
  content,
  setFirstName,
  setLastName,
  setContent,
  productName,
}) => {
  return (
    <div className="SingleCardSidebar">
      <h2>EDIT YOUR CARD</h2>
      <div className="SingleCardSidebar_inputs">
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <textarea
          placeholder="Message"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={7}
        />
      </div>
      {productName ? (
        <h3 className="SingleCardSidebar__product-name">{productName}</h3>
      ) : null}
    </div>
  );
};

export default SingleCardSidebar;
