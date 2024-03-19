import React, { useEffect, useState } from "react";
import "./Styles/PaymentCompo.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BiErrorCircle } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { media } from "../../Setting/GlobalVariable";
import { GetAllCartData } from "../../Redux/Action/CartAction";
import {
  DELETE_CART_PRODUCT_ERROR,
  DELETE_CART_PRODUCT_REQUEST,
  DELETE_CART_PRODUCT_REQUEST_FAIL,
  DELETE_CART_PRODUCT_SUCCESS,
} from "../../Redux/Variables/CartVariable";
import { CommonPOSTCall } from "../../Redux/Action/DeleteCommonFunction";
import { MdDelete } from "react-icons/md";
import PayPalButton from "./PayPalButton";
import { OrderCreateFunction } from "../../Redux/Action/OrderAction";
import { useNavigate } from "react-router-dom";
import Section2Carousel from "../Home/Sections/Section2Carousel";
import PaymentTopCarousel from "./PaymentTopCarousel";
import productimg from "../../Assets/images/Wedding Card2.png";
import PriceDropdown from "./PriceDropdown";
import "../payments/Styles/PriceDropdown.css";

// -------- schema
const Schema = Yup.object().shape({
  fname: Yup.string().required("Please Enter First Name"),
  lname: Yup.string().required("Please Enter Last Name"),
  country: Yup.string().required("Plaese Enter Your Country"),
  address: Yup.string().required("Plaese Enter Your Address"),
  state: Yup.string().required("Plaese Enter Your State"),
  state: Yup.string().required("Plaese Enter Your State"),
  town: Yup.string().required("Plaese Enter Your Town"),
  city: Yup.string().required("Plaese Enter Your City"),
  phone: Yup.string().required("Plaese Enter Your Phone Number"),
  postocode: Yup.string().required("Plaese Enter Your PostoCode"),
  email: Yup.string()
    .required("Plaese Enter Your Email")
    .email("Plaese Enter Valid Email"),
});

const PaymentCompo = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const checkUser = useSelector((state) => state.user.isAuthantication);

  const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      country: "",
      address: "",
      state: "",
      town: "",
      city: "",
      phone: "",
      postocode: "",
      email: "",
    },
    validationSchema: Schema,
    onSubmit: (values) => {
      handlePayPalPayment();
    },
  });

  const { errors, values, touched, handleChange, handleSubmit } = formik;

  const [payment, setPayment] = useState("");
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    const CartCode = localStorage.getItem("cartcode");
    dispatch(GetAllCartData(CartCode));
  }, []);

  const v1 = DELETE_CART_PRODUCT_REQUEST;
  const v2 = DELETE_CART_PRODUCT_REQUEST_FAIL;
  const v3 = DELETE_CART_PRODUCT_SUCCESS;
  const v4 = DELETE_CART_PRODUCT_ERROR;

  const deleteitem = async (productid) => {
    const bodydata = {
      CartId: cart.CartData.id,
      ItemId: productid,
    };
    const url = "cart/delete";
    const CartCode = localStorage.getItem("cartcode");
    await dispatch(CommonPOSTCall(v1, v2, v3, v4, bodydata, url));
    dispatch(GetAllCartData(CartCode));
  };

  // ==============
  // ...form and other code...

  // PayPal payment handler
  const [isPayPalButtonShown, setIsPayPalButtonShown] = useState(false);
  const [showsuccess, setShowScess] = useState(false);
  const [orderId, setOrderIdpayment] = useState("");

  const handlePayPalPayment = async () => {
    if (!checkUser) {
      // const guestUrl = "guest/cart/order/success"
      // const data = {
      //   CartCode: localStorage.getItem("cartcode"),
      //   FullName: values.fname + values.lname,
      //   StreetAddress: values.address,
      //   City: values.city,
      //   State: values.state,
      //   Country: values.country,
      //   PaymentMethod: "Paypal",
      //   PostalCode: values.postocode,
      //   OrderId: "abc",
      //   PayerName: "Max",
      //   Email: values.email,
      //   Mobile: values.phone,
      // };
      // await dispatch(OrderCreateFunction(data, guestUrl,navigate));
      // const CartCode = localStorage.getItem("CartCode");
      // dispatch(GetAllCartData(CartCode));
      setIsPayPalButtonShown(true);
      const payPalButton = document.querySelector(
        ".paypal-button-container button"
      );
      if (payPalButton) {
        payPalButton.click();
      }
    } else {
      const userUrl = "cart/order/success";
      const userCount = user?.package && user?.package[0]?.count;
      const userPackageCount =
        user?.package && user?.package[0]?.package?.card_count;
      const isPackageExist = user?.package && user?.package[0];

      if (
        userCount !== undefined &&
        userPackageCount !== undefined &&
        isPackageExist
      ) {
        if (userCount !== 0) {
          const data = {
            CartCode: localStorage.getItem("cartcode"),
            FullName: values.fname + values.lname,
            StreetAddress: values.address,
            City: values.city,
            State: values.state,
            Country: values.country,
            PaymentMethod: "Paypal",
            PostalCode: values.postocode,
            OrderId: "abc",
            PayerName: "Max",
            Email: values.email,
            Mobile: values.phone,
          };
          await dispatch(OrderCreateFunction(data, userUrl, navigate));
          const CartCode = localStorage.getItem("CartCode");
          dispatch(GetAllCartData(CartCode));
        } else {
          setIsPayPalButtonShown(true);
          const payPalButton = document.querySelector(
            ".paypal-button-container button"
          );
          if (payPalButton) {
            payPalButton.click();
          }
        }
      } else {
        setIsPayPalButtonShown(true);
        const payPalButton = document.querySelector(
          ".paypal-button-container button"
        );
        if (payPalButton) {
          payPalButton.click();
        }
      }
    }
  };

  const CreateOrderFunctiontobackend = async (id, name) => {
    // if(checkUser){

    //   var userUrl = "cart/order/success";
    // }else{

    //   var userUrl = "guest/cart/order/success"
    // }
    const userUrl = checkUser
      ? "cart/order/success"
      : "guest/cart/order/success";
    const data = {
      CartCode: localStorage.getItem("cartcode"),
      FullName: values.fname + values.lname,
      StreetAddress: values.address,
      City: values.city,
      State: values.state,
      Country: values.country,
      PaymentMethod: "Paypal",
      PostalCode: values.postocode,
      OrderId: id,
      PayerName: name,
      Email: values.email,
      Mobile: values.phone,
    };
    await dispatch(OrderCreateFunction(data, userUrl, navigate));
    const CartCode = localStorage.getItem("CartCode");
    dispatch(GetAllCartData(CartCode));
  };

  const cartloading = useSelector((state) => state.cart.isloading);

  return (
    <>
      {showsuccess === true ? (
        <p className="bg-[#48B02C] p-3 text-white text-center my-2 text-[18px]">
          Payment Done Successfull
        </p>
      ) : null}
      <div className="payment_page">
        {/* ------- left side  */}
        <div className="product-on-top">
          <div className="main-product-img">
            <img src={productimg} alt="" />
            <div className="border-right"></div>
          </div>
          <div className="main-product-price">
            <h1>wedding card</h1>
            <h3>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim
            </h3>
            <p>$. 30.00</p>
          </div>
        </div>
        <div className="left_payment">
          <div className="payment-top-Carousel">
            <h1>add ons</h1>
            <PaymentTopCarousel />
          </div>
          {/* <h2>Shipping address</h2> */}
          <div className="inputs_box">
            <div className="input_box1">
              <label
                htmlFor="fname"
                className="block mb-1 text-[#555] font-[Poppins] font-weight-500 text-[16px]"
              >
                First Name
              </label>
              <input
                type="text"
                placeholder="First Name"
                className={
                  errors.fname && touched.fname ? "red first" : "first"
                }
                value={values.fname}
                name="fname"
                id="fname"
                onChange={handleChange}
              />
              {errors.fname && touched.fname && (
                <p className="my-2 px-1 text-[red] font-[Poppins] flex justify-start place-items-center gap-[8px] error_touched">
                  {" "}
                  <BiErrorCircle />
                  {errors.fname}
                </p>
              )}

              <label
                htmlFor="lname"
                className="block mb-1 text-[#555] font-[Poppins] font-weight-500 text-[16px]"
              >
                Last Name
              </label>
              <input
                type="text"
                placeholder="Last Name"
                value={values.lname}
                name="lname"
                id="lname"
                onChange={handleChange}
                className={errors.lname && touched.lname ? "red" : null}
              />
              {errors.lname && touched.lname && (
                <p className="my-2 px-1 text-[red] font-[Poppins] flex justify-start place-items-center gap-[8px] error_touched">
                  {" "}
                  <BiErrorCircle />
                  {errors.lname}
                </p>
              )}

              <label
                htmlFor="country"
                className="block mb-1 text-[#555] font-[Poppins] font-weight-500 text-[16px]"
              >
                Country
              </label>
              <input
                type="text"
                placeholder="Country"
                value={values.country}
                name="country"
                id="country"
                onChange={handleChange}
                className={errors.country && touched.country ? "red" : null}
              />
              {errors.country && touched.country && (
                <p className="my-2 px-1 text-[red] font-[Poppins] flex justify-start place-items-center gap-[8px] error_touched">
                  {" "}
                  <BiErrorCircle />
                  {errors.country}
                </p>
              )}

              <label
                htmlFor="address"
                className="block mb-1 text-[#555] font-[Poppins] font-weight-500 text-[16px]"
              >
                Street Adress
              </label>
              <input
                type="text"
                placeholder="Street Adress"
                value={values.address}
                id="address"
                name="address"
                onChange={handleChange}
                className={errors.address && touched.address ? "red" : null}
              />
              {errors.address && touched.address && (
                <p className="my-2 px-1 text-[red] font-[Poppins] flex justify-start place-items-center gap-[8px] error_touched">
                  {" "}
                  <BiErrorCircle />
                  {errors.address}
                </p>
              )}

              <label
                htmlFor="town"
                className="block mb-1 text-[#555] font-[Poppins] font-weight-500 text-[16px]"
              >
                Town
              </label>
              <input
                type="text"
                placeholder="Town"
                value={values.town}
                name="town"
                id="town"
                onChange={handleChange}
                className={errors.town && touched.town ? "red" : null}
              />
              {errors.town && touched.town && (
                <p className="my-2 px-1 text-[red] font-[Poppins] flexjustify-start place-items-center gap-[8px] error_touched">
                  {" "}
                  <BiErrorCircle />
                  {errors.town}
                </p>
              )}
            </div>
            <div className="input_box2">
              <label
                htmlFor="city"
                className="block mb-1 text-[#555] font-[Poppins] font-weight-500 text-[16px]"
              >
                City
              </label>
              <input
                type="text"
                placeholder="City"
                value={values.city}
                name="city"
                id="city"
                onChange={handleChange}
                className={errors.city && touched.city ? "red" : null}
              />
              {errors.city && touched.city && (
                <p className="my-2 px-1 text-[red] font-[Poppins] flex justify-start place-items-center gap-[8px] error_touched">
                  {" "}
                  <BiErrorCircle />
                  {errors.city}
                </p>
              )}

              <label
                htmlFor="state"
                className="block mb-1 text-[#555] font-[Poppins] font-weight-500 text-[16px]"
              >
                State
              </label>
              <input
                type="text"
                placeholder="State"
                value={values.state}
                name="state"
                id="state"
                onChange={handleChange}
                className={errors.state && touched.state ? "red" : null}
              />
              {errors.state && touched.state && (
                <p className="my-2 px-1 text-[red] font-[Poppins] flex justify-start place-items-center gap-[8px] error_touched">
                  {" "}
                  <BiErrorCircle />
                  {errors.state}
                </p>
              )}

              <label
                htmlFor="postocode"
                className="block mb-1 text-[#555] font-[Poppins] font-weight-500 text-[16px]"
              >
                Postal Code
              </label>
              <input
                type="number"
                placeholder="Postal Code"
                value={values.postocode}
                name="postocode"
                id="postocode"
                onChange={handleChange}
                className={errors.postocode && touched.postocode ? "red" : null}
              />
              {errors.postocode && touched.postocode && (
                <p className="my-2 px-1 text-[red] font-[Poppins] flex justify-start place-items-center gap-[8px] error_touched">
                  {" "}
                  <BiErrorCircle />
                  {errors.postocode}
                </p>
              )}

              <label
                htmlFor="phone"
                className="block mb-1 text-[#555] font-[Poppins] font-weight-500 text-[16px]"
              >
                Phone
              </label>
              <input
                type="number"
                placeholder="Phone"
                value={values.phone}
                name="phone"
                id="phone"
                onChange={handleChange}
                className={errors.phone && touched.phone ? "red" : null}
              />
              {errors.phone && touched.phone && (
                <p className="my-2 px-1 text-[red] font-[Poppins] flex justify-start place-items-center gap-[8px] error_touched">
                  {" "}
                  <BiErrorCircle />
                  {errors.phone}
                </p>
              )}

              <label
                htmlFor="email"
                className="block mb-1 text-[#555] font-[Poppins] font-weight-500 text-[16px]"
              >
                Email
              </label>
              <input
                type="text"
                placeholder="Email"
                className={errors.email && touched.email ? "red last" : "last"}
                value={values.email}
                name="email"
                id="email"
                onChange={handleChange}
              />
              {errors.email && touched.email && (
                <p className="my-2 px-1 text-[red] font-[Poppins] flex justify-start place-items-center gap-[8px] error_touched">
                  {" "}
                  <BiErrorCircle />
                  {errors.email}
                </p>
              )}
            </div>
          </div>
          <div
            className=""
            style={{
              width: "100%",
              margin: "auto",
              backgroundColor: "#FDECD9",
            }}
          >
            <PriceDropdown />
          </div>
        </div>
        {/* ----------- right  */}
        <div className="right_payment">
          {/* ==============product img on checkout page============== */}
          {/* <div
            className={`cart_item_in_payment h-[128px] overflow-y-auto ${
              cartloading ? "opacity-[.4]" : ""
            }`}
          >
            {cart &&
              cart?.Items &&
              cart?.Items?.map((item, index) => {
                return (
                  <div className="cart_item_in_payment_img " key={index}>
                    <div className="flex justify-between place-items-center gap-[7px]">
                      <img
                        src={`${media}/${item.product_details?.File1}`}
                        alt=""
                        className="w-[30px] h-[30px] object-contain"
                      />
                      <p>
                        {item.product_details?.ProductName?.slice(0, 20)}{" "}
                        {`${
                          item.product_details?.ProductName?.length > 20
                            ? "..."
                            : ""
                        }`}
                      </p>
                    </div>
                    {cartloading ? (
                      <MdDelete className="text-[25px] text-[#ff00007e] cursor-not-allowed" />
                    ) : (
                      <MdDelete
                        className="text-[25px] text-[red] cursor-pointer"
                        onClick={() => deleteitem(item.id)}
                      />
                    )}
                  </div>
                );
              })}
          </div> */}
          {/* ------- */}
          {/* <div className="payment_payment">
            <p>
              Subtotal
              <span>${cart?.CartData?.GrossAmount}</span>
            </p>
            <p>
              Discount Cupon <span>${cart?.CartData?.Discount}</span>
            </p>
            <p className="payment_total">
              Total
              <span>${cart?.CartData?.NetAmount}</span>
            </p>
          </div> */}

          {/* ---------------------- payments detail  */}
          <div className="payment_methods">
            {/* ---- */}
            {isPayPalButtonShown && (
              <PayPalButton
                setpaypalbtn={setIsPayPalButtonShown}
                setShowScess={setShowScess}
                setOrderIddata={setOrderIdpayment}
                CreateOrderFunctiontobackend={CreateOrderFunctiontobackend}
                amount={cart?.CartData?.NetAmount}
              />
            )}
            {isPayPalButtonShown ||
            showsuccess === true ||
            (cart?.Items && Object.keys(cart?.Items)?.length === 0) ? null : (
              <button onClick={handleSubmit}>Place order</button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentCompo;
