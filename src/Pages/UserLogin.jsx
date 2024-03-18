import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CiLock } from "react-icons/ci";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UserLoginAction } from "../Redux/Action/UserAction";
import SpinnerLoading from "../Layout/Loading/SpinnerLoading";
import UserAuth from "../Hooks/UserAuth";
import "../Layout/Header/Styles/UserLogin.css";

const Schema = Yup.object().shape({
  email: Yup.string()
    .email("Plaese Enter Valid Email Address")
    .required("Plaese Enter Your Email"),
  password: Yup.string().required("Plaese Enter Your Password"),
});

const UserLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [checkbox, setCheckbox] = useState(false);
  const IsLoading = useSelector((state) => state.user.loading);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Schema,
    onSubmit: () => {
      // alert(values.email, values.password);
      dispatch(
        UserLoginAction(values.email, values.password, navigate, checkbox)
      );
    },
  });
  const { errors, values, touched, handleChange, handleSubmit } = formik;
  return (
    <UserAuth>
      <div className="mt-[20px] mb-[120px] w-full  flex justify-center place-items-center flex-col">
        <h2
          className="text-[35px]  my-2"
          style={{ fontFamily: "Luckiest Guy", color: "#30404D" }}
        >
          Login to your account
        </h2>

        <div className="py-[15px] px-[7px] w-[550px] shadow-lg bg-white user-Login">
          <div className="my-2 ">
            <label
              htmlFor="Email"
              className="block text-[15px] font-bold mb-1 px-[3px]"
              style={{ fontFamily: "Poppins" }}
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Please enter your email"
              className={`w-full border-[1px] border-[#dbdbdb] outline-none px-[5px] py-[8px] ${
                errors.email && touched.email
                  ? "border-1 border-[red] shake"
                  : null
              }`}
              value={values.email}
              onChange={handleChange}
              name="email"
              style={{ fontFamily: "Poppins" }}
            />
          </div>
          <div className="">
            <label
              htmlFor="password"
              className="block text-[15px] font-bold mb-1 px-[3px]"
              style={{ fontFamily: "Poppins" }}
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Please enter your password"
              className={`w-full border-[1px] border-[#30404D] outline-none px-[5px] py-[8px]
            ${
              errors.password && touched.password
                ? "border-1 border-[red] shake"
                : null
            }
            `}
              name="password"
              onChange={handleChange}
              value={values.password}
              style={{ fontFamily: "Poppins" }}
            />
          </div>

          <div className="my-2 flex justify-between place-items-center">
            <p
              className="flex justify-start place-items-center cursor-pointer gap-1 text-[15px]"
              onClick={() => setCheckbox(!checkbox)}
            >
              <input
                type="checkbox"
                className="text-[20px] cursor-pointer text-[#30404D]  border-radius "
                checked={checkbox}
                onClick={(e) => setCheckbox(e.target.value)}
                style={{
                  fontFamily: "Poppins",
                  borderRadius: "10px",
                  padding: "15px 10px",
                }}
              />
              <span style={{ fontFamily: "Poppins" }}>Rember me</span>
            </p>
            <p
              className="flex justify-start place-items-center gap-1 my-2 text-[#30404D] text-[16px] cursor-pointer"
              style={{ fontFamily: "Poppins" }}
            >
              <CiLock className="text-[18px]" /> Forgot Password
            </p>
          </div>
          <button
            onClick={handleSubmit}
            disabled={IsLoading}
            className="mt-2 w-full flex justify-center place-items-center disabled:cursor-no-drop disabled:bg-[#f49d3f57]  font-bold rounded-sm text-[16px] px-2 py-2 text-[#30404D] bg-[#FCC79F] cursor-pointer"
            style={{
              fontFamily: "Poppins",
              borderRadius: "10px",
              padding: "15px 10px",
              marginTop: "30px",
            }}
          >
            {IsLoading ? <SpinnerLoading /> : "Login"}
          </button>
          <NavLink to="/user/signup">
            <p
              className="mt-4 text-center text-[16px] text-[#30404D] font-bold cursor-pointer"
              style={{ fontFamily: "Poppins" }}
            >
              Don't have an account?
            </p>
          </NavLink>
        </div>
      </div>
    </UserAuth>
  );
};

export default UserLogin;
