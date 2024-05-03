import React, { useEffect } from "react";
import "./Style/CartCompo.css";
import { useDispatch } from "react-redux";
// import { GetAllCartData } from "../../Redux/Action/CartAction";
import { GetAllCartData } from "../../Redux/Action/CartAction";
import cartimg from "../../Assets/cartLayer 1 1.png"
import { RiDeleteBin5Line } from "react-icons/ri";

const CartCompo = () => {
  return (
  <div className="cartcomponenet-main">
    {/* <div className="for-cross-cart"></div> */}
    <div className="main-text-cart">
      <h1>your cart</h1>
    </div>
    <div className="cart-comp-img-text-main">
      <div className="for-cart-p-img">
        <img src={cartimg} alt="Product-img" />
      </div>
      <div className="for-cart-price">
        <div className="Product-total-text">
          <p>Product</p>
          <p>Total</p>
        </div>
        <div className="prodcut-name-cart">
          <h1>Birthday Card</h1>
        </div>
        <div className="cart-delet">
          <p>$. 30.00</p>
          <RiDeleteBin5Line />
        </div>
        <div className="Subtotal-cart-main">
        <div className="Subtotal-cart1">
        <p>Subtotal</p>
        <p>$30</p>
        </div>
        <div className="Subtotal-cart1">
        <p>Discount cupon</p>
        <p>$00</p>
        </div>
        <div className="Subtotal-cart1">
        <p>Total</p>
        <p>$30</p>
        </div>
      </div>
      </div>
    </div>
    <div className="cart-btn-out">
      <button>Check out</button>
    </div>
  </div>
  );
};

export default CartCompo;
