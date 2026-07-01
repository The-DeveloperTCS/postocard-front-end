import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import { BiErrorCircle } from "react-icons/bi";
import axios from "axios";
import { CreateCartFunction } from "../../../Redux/Action/CartAction";
import { getuseraddress } from "../../../Redux/Action/UserAction";
import SpinnerLoading from "../../../Layout/Loading/SpinnerLoading";
import "./Styles/ProductDetailPricing.css";

const ProductDetailPricing = ({ name, content }) => {
  const singleproduct = useSelector((state) => state.product.singleproduct);
  const cartloading = useSelector((state) => state.cart.isloading);
  const userAddress = useSelector((state) => state.user.userAddress);
  const user = useSelector((state) => state.user.user);
  const loading = useSelector((state) => state.user.loading);

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedStates, setSelectedStates] = useState("");
  const [selectedCities, setSelectedCities] = useState("");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [checkbox, setcheckbox] = useState(0);
  const [show, setShow] = useState(false);
  const [savedAddress, setSavedAddress] = useState(null);
  const [singleAddress, setSingleaddress] = useState([]);

  const dispatch = useDispatch();
  const { id } = useParams();

  const salePrice =
    singleproduct?.Discount > 0
      ? singleproduct.Price - singleproduct.Discount
      : singleproduct?.Price;

  const Schema = Yup.object().shape({
    fname: Yup.string().required("Please Enter First Name"),
    country: Yup.string().required("Plaese Enter Your Country"),
    address: Yup.string().required("Plaese Enter Your Address"),
    state: Yup.string().required("Plaese Enter Your State"),
    town: Yup.string().required("Plaese Enter Your Town"),
    city: Yup.string().required("Plaese Enter Your City"),
    phone: Yup.string().required("Plaese Enter Your Phone Number"),
    postocode: Yup.string().required("Plaese Enter Your PostoCode"),
    email: Yup.string()
      .required("Plaese Enter Your Email")
      .email("Plaese Enter Valid Email"),
  });

  const formik = useFormik({
    initialValues: {
      fname: "",
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
    onSubmit: () => {},
  });

  const { errors, values, touched, handleChange } = formik;

  useEffect(() => {
    const filteraddress = userAddress?.filter(
      (item) => item.id === Number(savedAddress)
    );
    setSingleaddress(filteraddress);
  }, [savedAddress, userAddress]);

  useEffect(() => {
    dispatch(getuseraddress());
    const fetchCountries = async () => {
      try {
        const res = await axios.get(
          "https://countriesnow.space/api/v0.1/countries"
        );
        const specificCountries = res.data.data.filter(
          (item) =>
            item.country === "United States" || item.country === "Canada"
        );
        setCountries(specificCountries);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCountries();
  }, [dispatch]);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        if (selectedCountry) {
          const response = await axios.get(
            `https://countriesnow.space/api/v0.1/countries/states`
          );
          setStates(response.data.data);
        }
      } catch (error) {
        console.log("Error fetching states:", error);
      }
    };
    fetchStates();
  }, [selectedCountry]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        if (selectedStates) {
          const response = await axios.post(
            "https://countriesnow.space/api/v0.1/countries/state/cities",
            {
              country: selectedCountry,
              state: selectedStates,
            }
          );
          setCities(response.data.data);
        }
      } catch (error) {
        console.log("Error fetching cities:", error);
      }
    };
    fetchCities();
  }, [selectedStates, selectedCountry]);

  const additemtocart = () => {
    setShow(false);
    if (content === "") {
      return toast.error("Please enter your description");
    }

    let CartCode = localStorage.getItem("cartcode");
    let FullName;
    let StreetAddress;
    let City;
    let State;
    let Country;
    let MobileNo;
    let NewAddress;

    if ((savedAddress && checkbox === 0) || checkbox === null) {
      FullName = singleAddress[0]?.full_name;
      StreetAddress = singleAddress[0]?.street_address;
      City = singleAddress[0]?.city;
      State = singleAddress[0]?.state;
      Country = singleAddress[0]?.country;
      MobileNo = singleAddress[0]?.phone;
      NewAddress = checkbox === 1 || checkbox === null ? 0 : 1;
    } else {
      FullName = values.fname;
      StreetAddress = values.address;
      City = selectedCities;
      State = selectedStates;
      Country = selectedCountry;
      MobileNo = values.phone;
      NewAddress = checkbox === 1 || checkbox === null ? 0 : 1;
    }

    dispatch(
      CreateCartFunction(
        id,
        content,
        CartCode ? CartCode : null,
        FullName,
        StreetAddress,
        City,
        State,
        Country,
        MobileNo,
        NewAddress,
        "user_address_id" ? Number(savedAddress) : null
      )
    );
  };

  return (
    <div className="product-detail-pricing">
      <div className="product-detail-pricing__box">
        <span className="product-detail-pricing__label">PRICE</span>
        <p className="product-detail-pricing__price">
          ${salePrice != null ? Number(salePrice).toFixed(2) : "30.00"}
        </p>
        {singleproduct?.Price > 0 && (
          <span className="product-detail-pricing__old">
            ${Number(singleproduct.Price).toFixed(2)}
          </span>
        )}
      </div>

      {cartloading ? (
        <button type="button" className="product-detail-pricing__cta" disabled>
          Add to cart
        </button>
      ) : (
        <button
          type="button"
          className="product-detail-pricing__cta"
          onClick={() => setShow(!show)}
        >
          Add to cart
        </button>
      )}

      {show && (
        <div className="fixed z-30 left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10">
          <div className="max-h-full w-full max-w-xl overflow-y-auto sm:rounded-2xl bg-white relative">
            <div className="w-full px-2">
              <div className="m-8 my-20 max-w-[400px] mx-auto px-2">
                <RxCross1
                  className="text-2xl cursor-pointer absolute top-[20px] right-[20px]"
                  onClick={() => setShow(false)}
                />
                <div className="flex justify-between place-items-center gap-2">
                  <div className="flex justify-start place-items-center gap-1 text-[17px]">
                    <input
                      type="checkbox"
                      checked={checkbox === 1}
                      onClick={() => setcheckbox(1)}
                      onChange={() => {}}
                      className="w-[20px] h-[20px]"
                    />
                    <span className="cursor-pointer" onClick={() => setcheckbox(1)}>
                      Shipping Address
                    </span>
                  </div>
                  <span className="mx-2 text-[17px]">OR</span>
                  <div className="flex justify-start place-items-center gap-1 text-[17px]">
                    <input
                      type="checkbox"
                      checked={checkbox === 2}
                      onChange={() => {}}
                      onClick={() => setcheckbox(2)}
                      className="w-[20px] h-[20px]"
                    />
                    <span className="cursor-pointer" onClick={() => setcheckbox(2)}>
                      New Adress
                    </span>
                  </div>
                </div>

                {user?.name && (
                  <div className="block my-3 w-full overflow-y-auto">
                    <p className="!text-[17px]">Select from saved address</p>
                    <select
                      className="my-1 w-full outline-none !max-h-[300px]"
                      value={savedAddress}
                      onChange={(e) => {
                        setSavedAddress(e.target.value);
                        setcheckbox(null);
                      }}
                    >
                      <option value="">Select Address</option>
                      {loading ? (
                        <SpinnerLoading />
                      ) : (
                        userAddress?.map((item, index) => (
                          <option value={item.id} key={index}>
                            {item.address_name}
                          </option>
                        ))
                      )}
                    </select>
                  </div>
                )}

                {checkbox === 2 && (
                  <div className="left_payment px-2">
                    <h2 className="text-center">Shipping address</h2>
                    <div className="inputs_box">
                      <input
                        type="text"
                        placeholder="Full Name"
                        className={
                          errors.fname && touched.fname ? "red first" : "first"
                        }
                        value={values.fname}
                        id="fname"
                        onChange={handleChange}
                      />
                      {errors.fname && touched.fname && (
                        <p className="my-2 px-1 text-[red] font-[Poppins] flex justify-start place-items-center gap-[8px] error_touched">
                          <BiErrorCircle />
                          {errors.fname}
                        </p>
                      )}
                      <input
                        type="text"
                        placeholder="Street Adress"
                        value={values.address}
                        id="address"
                        onChange={handleChange}
                        className={
                          errors.address && touched.address ? "red" : null
                        }
                      />
                      {errors.address && touched.address && (
                        <p className="my-2 px-1 text-[red] font-[Poppins] flex justify-start place-items-center gap-[8px] error_touched">
                          <BiErrorCircle />
                          {errors.address}
                        </p>
                      )}
                      <div>
                        <label htmlFor="country">Select a country:</label>
                        <select
                          id="country"
                          value={selectedCountry}
                          onChange={(e) => setSelectedCountry(e.target.value)}
                        >
                          <option value="">Select...</option>
                          {countries?.map((country) => (
                            <option key={country.country} value={country.country}>
                              {country.country}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="state">Select a state:</label>
                        <select
                          id="state"
                          value={selectedStates}
                          onChange={(e) => setSelectedStates(e.target.value)}
                        >
                          <option value="">Select...</option>
                          {states &&
                            states.map((countryStates) =>
                              selectedCountry === countryStates.name
                                ? countryStates.states.map((state) => (
                                    <option key={state.name} value={state.name}>
                                      {state.name}
                                    </option>
                                  ))
                                : null
                            )}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="city">Select a city:</label>
                        <select
                          id="city"
                          value={selectedCities}
                          onChange={(e) => setSelectedCities(e.target.value)}
                        >
                          <option value="">Select...</option>
                          {cities?.map((city, index) => (
                            <option key={index} value={city}>
                              {city}
                            </option>
                          ))}
                        </select>
                      </div>
                      <input
                        type="number"
                        placeholder="Phone"
                        value={values.phone}
                        id="phone"
                        onChange={handleChange}
                        className={
                          errors.phone && touched.phone ? "red" : null
                        }
                      />
                    </div>
                  </div>
                )}
                <button
                  onClick={additemtocart}
                  className="w-full text-center my-2 flex justify-center place-items-center"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPricing;
