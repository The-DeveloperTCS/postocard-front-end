import { toast } from "react-toastify";
import { server } from "../../Setting/GlobalVariable";
import {
  CREATE_PRODUCT_ERROR,
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  DISCOUNT_PRODUCT_ERROR,
  DISCOUNT_PRODUCT_FAIL,
  DISCOUNT_PRODUCT_REQUEST,
  DISCOUNT_PRODUCT_SUCCESS,
  GET_ADMIN_PRODUCT_ERROR,
  GET_ADMIN_PRODUCT_FAIL,
  GET_ADMIN_PRODUCT_REQUEST,
  GET_ADMIN_PRODUCT_SUCCESS,
  GET_PRODUCT_ERROR,
  GET_PRODUCT_FAIL,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
  GET_SINGLE_PRODUCT_FAIL,
  GET_SINGLE_PRODUCT_REQUEST,
  GET_SINGLE_PRODUCT_SUCCESS,
} from "../Variables/UserVariables";
import Cookies from "js-cookie";
import {
  getAllCatalogProducts,
  getCatalogProductById,
  isCatalogProductId,
} from "../../utils/catalogProducts";

const useCatalogProductFallback = (dispatch) => {
  const products = getAllCatalogProducts();
  dispatch({ type: GET_PRODUCT_SUCCESS, payload: products });
  return products;
};

export const CreateProductFunc = (newdata, navigate) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PRODUCT_REQUEST });

    const formData = new FormData();
    // Append your non-file data to the FormData object
    formData.append("ProductName", newdata.ProductName);
    formData.append("artist_id", newdata.artist_id);
    formData.append("Price", newdata.Price);
    formData.append("SubCategory", newdata.SubCategory);

    // Append the files to the FormData object
    formData.append("File1", newdata.File1);
    formData.append("File2", newdata.File2);
    formData.append("File3", newdata.File3);
    formData.append("File4", newdata.File4);

    const res = await fetch(`${server}/product/create`, {
      method: "POST",
      headers: {
        // Remove the "Content-Type" header when using FormData
        // "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
      },
      body: formData, // Use the FormData object as the request body
    });

    dispatch({ type: CREATE_PRODUCT_FAIL });
    const data = await res.json();
    console.log(data);
    if (!data || res.status === 401) {
      return toast.error(data.message);
    } else if (res.status === 500) {
      return toast.error("Internal Server Error new");
    } else {
      dispatch({ type: CREATE_PRODUCT_SUCCESS });
      toast.success(data.message);

      navigate("/admin/products");
    }
  } catch (error) {
    dispatch({ type: CREATE_PRODUCT_ERROR, payload: error.message });
  }
};

// =============== get all product

export const getallproduct = () => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCT_REQUEST });
    const res = await fetch(`${server}/product/list`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
      },
    });
    const data = await res.json();

    if (!data || res.status === 401) {
      dispatch({ type: GET_PRODUCT_FAIL });
      return useCatalogProductFallback(dispatch);
    }

    if (res.status === 500) {
      dispatch({ type: GET_PRODUCT_FAIL });
      toast.error("Internel Server Error new");
      return useCatalogProductFallback(dispatch);
    }

    const products = Array.isArray(data.data) ? data.data : [];
    if (!products.length) {
      return useCatalogProductFallback(dispatch);
    }

    dispatch({ type: GET_PRODUCT_SUCCESS, payload: products });
    return products;
  } catch (error) {
    dispatch({ type: GET_PRODUCT_ERROR, payload: error.message });
    return useCatalogProductFallback(dispatch);
  }
};
// =============== get all product  for admin

export const getallproductforAdmin = (productName, price, categoryName) => async (dispatch) => {
  try {
    dispatch({ type: GET_ADMIN_PRODUCT_REQUEST });
    const res = await fetch(`${server}/product/adminlist?ProductName=${productName}&&Price=${price}&&CategoryName=${categoryName}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
      },
    });
    const data = await res.json();
    dispatch({ type: GET_ADMIN_PRODUCT_FAIL });
    if (!data || res.status === 401) {
      return;
    } else if (res.status === 500) {
      return toast.error("Internel Server Error new");
    } else {
      dispatch({ type: GET_ADMIN_PRODUCT_SUCCESS, payload: data.data });
    }
  } catch (error) {
    dispatch({ type: GET_ADMIN_PRODUCT_ERROR, payload: error.message });
  }
};

// --------- get single product
export const getSingleProduct = (id) => async (dispatch) => {
  if (isCatalogProductId(id)) {
    const catalogProduct = getCatalogProductById(id);
    if (catalogProduct) {
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: catalogProduct });
      return catalogProduct;
    }
  }

  try {
    dispatch({ type: GET_SINGLE_PRODUCT_REQUEST });
    const res = await fetch(`${server}/product/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
      },
    });
    const data = await res.json();

    if (!data || res.status === 401 || res.status === 500) {
      dispatch({ type: GET_SINGLE_PRODUCT_FAIL });
      const catalogProduct = getCatalogProductById(id);
      if (catalogProduct) {
        dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: catalogProduct });
        return catalogProduct;
      }
      return;
    }

    dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: data.data });
    return data.data;
  } catch (error) {
    dispatch({ type: GET_SINGLE_PRODUCT_ERROR, payload: error.message });
    const catalogProduct = getCatalogProductById(id);
    if (catalogProduct) {
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: catalogProduct });
      return catalogProduct;
    }
  }
};

// ---- UPDATE PRODUCT DISCOUNT
export const UpdateProductDiscount =
  (ProductId, Discount) => async (dispatch) => {
    try {
      dispatch({ type: DISCOUNT_PRODUCT_REQUEST });
      const res = await fetch(`${server}/product-discount/${ProductId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
        },
        body: JSON.stringify({ Discount, ProductId }),
      });
      dispatch({ type: DISCOUNT_PRODUCT_FAIL });
      const data = await res.json();
      console.log(data);
      if (!data || res.status === 401) {
        return toast.error(data.message);
      } else if (res.status === 500) {
        return toast.error("Internel Server Error new");
      } else {
        toast.success(data.message);
        dispatch({ type: DISCOUNT_PRODUCT_SUCCESS, payload: data.data });
      }
    } catch (error) {
      dispatch({ type: DISCOUNT_PRODUCT_ERROR, payload: error.message });
    }
  };
