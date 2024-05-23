import React, { useEffect, useState } from "react";
import Sidebar from "../Compnent/Product/ProductPage/Component/Sidebar.jsx";
import ViewMainProduct from "../Compnent/Product/ViewMainProduct.jsx";
import "../Compnent/Product/ProductPage/Styles/Sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AiOutlineFilter } from "react-icons/ai";
import Loading from "../Layout/Loading/Loading.jsx";
import SVGGET from "../Layout/Loading/notfound.json";
import AnimateLoading from "../Layout/Loading/AnimateLoading.jsx";
import { getallproduct } from "../Redux/Action/ProductAction";
import { getallSubCategory } from "../Redux/Action/CategoryAction.js";

const Allcollection = () => {
  const [filtershow, setFilterShow] = useState(false);
  const allProduct = useSelector((state) => state.product.allProduct);
  const [copyData, setCopyData] = useState(null);
  const isLoading = useSelector((state) => state.product.isLoading);
  const { all } = useParams();

  // ========== slice the data
  const [count, setCount] = useState(1);
  const slicedata = copyData?.slice(0, count * 12);

  //   ---- search by seacr input
  const [search, setSerach] = useState(all);
  const [price, setprice] = useState(0);

  useEffect(() => {
    setSerach(all);
  }, [all]);
  const filterdata = () => {
    if (search === "all") {
      setCopyData(allProduct);
    } else {
      const FilterDatabyName =
        allProduct &&
        allProduct.filter((item) =>
          item.ProductName.toLowerCase().includes(search.toLowerCase())
        );
      setCopyData(FilterDatabyName);
    }
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getallproduct());
  }, []);
  useEffect(() => {
    if (search === "all") {
      setCopyData(allProduct);
    }
  }, [allProduct, all]);

  useEffect(() => {
    setSerach(all);
    filterdata();
  }, [all, search]);

  // ====================

  useEffect(() => {
    dispatch(getallproduct());
  }, []);

  return (
    <>
      <div className="paroduct_hero">
        {/* <img src="./data/product/productpage.png" alt="" /> */}
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
          <button className="filter_btn" onClick={() => setFilterShow(true)}>
            <p>Filters</p> <AiOutlineFilter className="mx-2" />
          </button>
          <div className="Product_Section2-flex">
            <div className="abc1">
              <div className="product_section2_sidebar">
                <Sidebar
                  search={search}
                  setSerach={setSerach}
                  filterdata={filterdata}
                  setshowfilter={setFilterShow}
                  showfilter={filtershow}
                  setprice={setprice}
                  price={price}
                />
              </div>
            </div>
            {/* -------- */}
            <div className="abc2">
              {slicedata?.length > 0 ? (
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
                  <ViewMainProduct data={slicedata} />
                  {/* <button onClick={() => setCount(count + 1)}>Load more</button> */}
                </div>
              ) : (
                <div className="">
                  <AnimateLoading SVGGET={SVGGET} />
                  <p className="text-[#14BDA5] rounded-[7px] py-2 px-3  m-2 text-[25px] font-bold">
                    <span className="text-[28px]">OOPS!</span> No Product Found
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Allcollection;
