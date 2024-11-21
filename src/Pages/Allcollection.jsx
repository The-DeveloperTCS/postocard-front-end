import React, { useEffect, useState } from "react";
import Sidebar from "../Compnent/Product/ProductPage/Component/Sidebar.jsx";
import "../Compnent/Product/ProductPage/Styles/Sidebar.css";
import { AiOutlineFilter } from "react-icons/ai";
import Loading from "../Layout/Loading/Loading.jsx";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { server } from "../Setting/GlobalVariable.js";
import Cookies from "js-cookie";

import ViewMainProduct from "../Compnent/Product/ViewMainProduct.jsx";

const Allcollection = () => {
  const isLoading = useSelector((state) => state.product.isLoading);
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetchProducts("", "")
  }, [])

  const fetchProducts = async (subCategoryId, productName) => {
    console.log(Cookies.get("ApiLoginToken"), 'Cookies.get("ApiLoginToken")')
    try {
      const response = await axios.get(`${server}/products/subCategory?subcategoryId=${subCategoryId}&ProductName=${productName}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: Cookies.get("ApiLoginToken") !== undefined ? "Bearer " + Cookies.get("ApiLoginToken") : "",
        },
      });
      setProducts(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="paroduct_hero">
        <img
          src="https://images.pexels.com/photos/9429448/pexels-photo-9429448.jpeg?auto=compress&cs=tinysrgb&w=1260&h=1200&dpr=1"
          style={{ margin: "auto", width: "100%" }}
          alt=""
        />
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <button className="filter_btn" >
            <p>Filters</p> <AiOutlineFilter className="mx-2" />
          </button>
          <div className="Product_Section2-flex">
            <div className="abc1">
              <div className="product_section2_sidebar">
                <Sidebar />
              </div>
            </div>

            {/* -------- */}
            <div className="abc2">
              {/* {slicedata?.length > 0 ? (
                // <div className="pro flex justify-center flex-col place-items-center">
                <div className="also_like11">
                  {/* {
                  SliceFilterSubCategory && SliceFilterSubCategory.map((item,index)=>{
                    return (
                      <div className="" key={index}>
                            <p className="text-2xl">{item?.SubCategoryName}</p>
                        </div>
                    )
                  })
                } */}
              {/* <ViewMainProduct data={slicedata} /> */}
              {/* <button onClick={() => setCount(count + 1)}>Load more</button> 
                </div>
              ) : (
                <div className="">
                  <AnimateLoading SVGGET={SVGGET} />
                  <p className="text-[#14BDA5] rounded-[7px] py-2 px-3  m-2 text-[25px] font-bold">
                    <span className="text-[28px]">OOPS!</span> No Product Found
                  </p>
                </div>
              )} */}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Allcollection;