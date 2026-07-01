import React, { useEffect } from "react";
import IndexCom from "../Compnent/Product/SingleProduct/IndexCom";
import { useDispatch } from "react-redux";
import { getallproduct } from "../Redux/Action/ProductAction";

const SingleProduct = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getallproduct());
  }, [dispatch]);

  return (
    <div>
      <IndexCom />
    </div>
  );
};

export default SingleProduct;