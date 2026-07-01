import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "../Compnent/Product/ProductPage/Component/Sidebar.jsx";
import ViewMainProduct from "../Compnent/Product/ViewMainProduct.jsx";
import "../Compnent/Product/ProductPage/Styles/Sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineFilter } from "react-icons/ai";
import Loading from "../Layout/Loading/Loading.jsx";
import SVGGET from "../Layout/Loading/notfound.json";
import AnimateLoading from "../Layout/Loading/AnimateLoading.jsx";
import { getallproduct } from "../Redux/Action/ProductAction";
import {
  filterProductsBySearch,
  mergeCatalogWithApi,
} from "../utils/productCatalog";

const Allcollection = () => {
  const [filtershow, setFilterShow] = useState(false);
  const allProduct = useSelector((state) => state.product.allProduct);
  const isLoading = useSelector((state) => state.product.isLoading);
  const { all } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [search, setSerach] = useState(all || "all");
  const [count, setCount] = useState(1);

  const catalogProducts = useMemo(
    () => mergeCatalogWithApi(allProduct),
    [allProduct]
  );

  const filteredProducts = useMemo(
    () => filterProductsBySearch(catalogProducts, search),
    [catalogProducts, search]
  );

  const slicedata = filteredProducts?.slice(0, count * 12);

  useEffect(() => {
    dispatch(getallproduct());
  }, [dispatch]);

  useEffect(() => {
    setSerach(all || "all");
    setCount(1);
  }, [all]);

  const filterdata = () => {
    const term = String(search || "all").trim().toLowerCase();
    if (term === "all") {
      navigate("/allcollection/all");
      return;
    }
    navigate(`/allcollection/${encodeURIComponent(term)}`);
  };

  return (
    <>
      {isLoading && !catalogProducts.length ? (
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
                />
              </div>
            </div>
            <div className="abc2">
              {slicedata?.length > 0 ? (
                <div className="also_like11">
                  <ViewMainProduct data={slicedata} />
                  {slicedata.length < filteredProducts.length && (
                    <div className="collection-load-more">
                      <button type="button" onClick={() => setCount(count + 1)}>
                        Load more
                      </button>
                    </div>
                  )}
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
