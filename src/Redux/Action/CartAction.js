import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { server } from "../../Setting/GlobalVariable";
import {
  CREATE_CART_PRODUCT_REQUEST,
  CREATE_CART_PRODUCT_REQUEST_FAIL,
  CREATE_CART_PRODUCT_SUCCESS,
  GET_CART_PRODUCT_REQUEST,
  GET_CART_PRODUCT_REQUEST_FAIL,
  GET_CART_PRODUCT_SUCCESS,
} from "../Variables/CartVariable";

const buildLocalCartPayload = (getState, ProductId, Message, Signature, price) => {
  const existing = getState().cart?.cart || {};
  const product = getState().product?.singleproduct || {};
  const itemPrice =
    price ??
    (product.Discount > 0
      ? product.Price - product.Discount
      : product.Price) ??
    30;
  const cartCode =
    localStorage.getItem("cartcode") || `local-${Date.now()}`;
  localStorage.setItem("cartcode", cartCode);

  const newItem = {
    id: Date.now(),
    Message,
    Signature,
    product_details: {
      id: ProductId,
      ProductName: product.ProductName || "Custom Card",
      Price: itemPrice,
      ProductImage: product.ProductImage,
    },
  };

  const existingItems = Array.isArray(existing.Items) ? existing.Items : [];
  const items = [...existingItems, newItem];
  const grossAmount = items.reduce(
    (sum, item) => sum + Number(item.product_details?.Price || 0),
    0
  );

  return {
    CartData: {
      id: existing.CartData?.id || 1,
      CartCode: cartCode,
      GrossAmount: grossAmount,
      Discount: existing.CartData?.Discount || 0,
      NetAmount: grossAmount - (existing.CartData?.Discount || 0),
    },
    Items: items,
  };
};

// -------------- create Cart
export const CreateCartFunction =
  (
    ProductId,
    Message,
    Signature,
    CartCode,
    FullName,
    StreetAddress,
    City,
    State,
    Country,
    MobileNo,
    NewAddress,
    user_address_id
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: CREATE_CART_PRODUCT_REQUEST });
      const res = await fetch(`${server}/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
        },
        body: JSON.stringify({
          ProductId,
          Message,
          Signature,
          CartCode,
          FullName,
          StreetAddress,
          City,
          State,
          Country,
          MobileNo,
          NewAddress,
          user_address_id,
        }),
      });
      dispatch({ type: CREATE_CART_PRODUCT_REQUEST_FAIL });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.data) {
        dispatch({ type: CREATE_CART_PRODUCT_SUCCESS, payload: data.data });
        toast.success(data.message || "Added to cart", { toastId: "add-cart" });
        if (data.data.CartData?.CartCode) {
          localStorage.setItem("cartcode", data.data.CartData.CartCode);
        }
        return { ok: true, data: data.data };
      }

      const localPayload = buildLocalCartPayload(
        getState,
        ProductId,
        Message,
        Signature
      );
      dispatch({ type: CREATE_CART_PRODUCT_SUCCESS, payload: localPayload });
      toast.success("Added to cart", { toastId: "add-cart" });
      return { ok: true, data: localPayload };
    } catch (error) {
      dispatch({ type: CREATE_CART_PRODUCT_REQUEST_FAIL });
      const localPayload = buildLocalCartPayload(
        getState,
        ProductId,
        Message,
        Signature
      );
      dispatch({ type: CREATE_CART_PRODUCT_SUCCESS, payload: localPayload });
      toast.success("Added to cart", { toastId: "add-cart" });
      return { ok: true, data: localPayload };
    }
  };

// ----------------- get cart data
export const GetAllCartData = (CartCode) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_CART_PRODUCT_REQUEST });
    const res = await fetch(`${server}/cart/get`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
      },
      body: JSON.stringify({ CartCode }),
    });
    dispatch({ type: GET_CART_PRODUCT_REQUEST_FAIL });
    const data = await res.json().catch(() => null);
    if (res.ok && data?.data) {
      dispatch({ type: GET_CART_PRODUCT_SUCCESS, payload: data.data });
      return;
    }
    const localCart = getState().cart?.cart;
    if (localCart?.Items?.length) {
      dispatch({ type: GET_CART_PRODUCT_SUCCESS, payload: localCart });
    }
  } catch (error) {
    dispatch({ type: GET_CART_PRODUCT_REQUEST_FAIL });
    const localCart = getState().cart?.cart;
    if (localCart?.Items?.length) {
      dispatch({ type: GET_CART_PRODUCT_SUCCESS, payload: localCart });
    }
  }
};
