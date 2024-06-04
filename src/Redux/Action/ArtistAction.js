import { server } from "../../Setting/GlobalVariable";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import {
    GET_ARTIST_REQUEST,
    GET_ARTIST_SUCCESS,
    GET_ARTIST_FAIL,
    GET_ARTIST_ERROR,
    GET_SPECIFIC_ARTIST_REQUEST,
    GET_SPECIFIC_ARTIST_FAIL,
    GET_SPECIFIC_ARTIST_SUCCESS,
    GET_SPECIFIC_ARTIST_ERROR,
    ARTIST_CREATE_REQUEST,
    ARTIST_CREATE_FAIL,
    ARTIST_CREATE_SUCCESS,
    ARTIST_CREATE_ERROR,
    ARTIST_UPDATE_REQUEST,
    ARTIST_UPDATE_FAIL,
    ARTIST_UPDATE_ERROR,
    ARTIST_UPDATE_SUCCESS,
    ARTIST_DELETE_ERROR,
    ARTIST_DELETE_FAIL,
    ARTIST_DELETE_REQUEST,
    ARTIST_DELETE_SUCCESS,
  } from "../Variables/ArtistVariable";
  
// ============== get all artist
export const getallArtist = (artistName) => async (dispatch) => {
  try {
    dispatch({ type: GET_ARTIST_REQUEST });
    const res = await fetch(`${server}/artists?name=${artistName}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
      },
    });
    dispatch({ type: GET_ARTIST_FAIL });
    const data = await res.json();
    if (!data || res.status === 401) {
      return;
    } else if (res.status === 500) {
      return alert("Internel Server Error new");
    } else {
      dispatch({
        type: GET_ARTIST_SUCCESS, payload: data.data
      });
    }
  } catch (error) {
    dispatch({ type: GET_ARTIST_ERROR, payload: error.message });
  }
};

// ============== get specicific artist
export const getSpecificArtist = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SPECIFIC_ARTIST_REQUEST });
    const res = await fetch(`${server}/artist/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
      },
    });
    dispatch({ type: GET_SPECIFIC_ARTIST_FAIL });
    const data = await res.json();
    if (!data || res.status === 401) {
      return;
    } else if (res.status === 500) {
      return alert("Internel Server Error new");
    } else {
      dispatch({
        type: GET_SPECIFIC_ARTIST_SUCCESS, payload: data
      });
    }
  } catch (error) {
    dispatch({ type: GET_SPECIFIC_ARTIST_ERROR, payload: error.message });
  }
};

// ========= create artist =================================
export const ArtistCreateFunc = (artistData, navigate) => async (dispatch) => {
  try {
    dispatch({ type: ARTIST_CREATE_REQUEST });
    const res = await fetch(`${server}/artist/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
      },
      body: JSON.stringify(artistData),
    });
    dispatch({ type: ARTIST_CREATE_FAIL });
    const data = await res.json();
    if (!data || res.status === 400) {
      return toast.error(data.message);
    } else {
      toast.success(data.message);
      dispatch({ type: ARTIST_CREATE_SUCCESS });
      navigate("/admin/artists");
    }
  } catch (error) {
    dispatch({ type: ARTIST_CREATE_ERROR });
  }
};

// ========= Update Artist =================================
export const artistUpdateFunc = (artistData, id, navigate) => async (dispatch) => {
  try {
    dispatch({ type: ARTIST_UPDATE_REQUEST });
    const res = await fetch(`${server}/artist/${id}`, {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
      },
      body: JSON.stringify(artistData),
    });
    dispatch({ type: ARTIST_UPDATE_FAIL });
    const data = await res.json();
    if (!data || res.status === 400) {
      return toast.error(data.message);
    } else {
      toast.success(data.message);
      dispatch({ type: ARTIST_UPDATE_SUCCESS });
      navigate("/admin/parent-category/list");
    }
  } catch (error) {
    dispatch({ type: ARTIST_UPDATE_ERROR });
  }
};

// ========= Delete Artist =================================
export const artistDeleteFunc = (artistData) => async (dispatch) => {
  try {
    dispatch({ type: ARTIST_DELETE_REQUEST });
    const res = await fetch(`${server}/artist/${artistData.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
      },
      body: JSON.stringify(artistData),
    });
    dispatch({ type: ARTIST_DELETE_FAIL });
    const data = await res.json();
    if (!data || res.status === 400) {
      return toast.error(data.message);
    } else {
      toast.success(data.message);
      dispatch(getallArtist(""))
      dispatch({ type: ARTIST_DELETE_SUCCESS });
    }
  } catch (error) {
    dispatch({ type: ARTIST_DELETE_ERROR });
  }
};