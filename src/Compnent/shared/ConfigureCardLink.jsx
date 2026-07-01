import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getallproduct } from "../../Redux/Action/ProductAction";
import { Store } from "../../Redux/Store";
import { getProductDetailPathForItem } from "../../utils/catalogProducts";

const ConfigureCardLink = ({
  title,
  productId,
  fallbackIndex = 0,
  className = "configure-card-link",
  children,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allProduct = useSelector((state) => state.product.allProduct);

  const handleClick = async (e) => {
    e.preventDefault();

    let products = allProduct;

    if (!products?.length) {
      const loaded = await dispatch(getallproduct());
      products =
        Array.isArray(loaded) && loaded.length
          ? loaded
          : Store.getState().product.allProduct;
    }

    const path = getProductDetailPathForItem(
      title,
      productId,
      products,
      fallbackIndex
    );

    if (path) {
      navigate(path);
    }
  };

  return (
    <button type="button" className={className} onClick={handleClick}>
      {children}
    </button>
  );
};

export default ConfigureCardLink;
