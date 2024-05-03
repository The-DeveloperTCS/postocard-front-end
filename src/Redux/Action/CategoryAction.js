import { server } from "../../Setting/GlobalVariable";
import {

  GET_PARENT_CATEGORY_REQUEST,
  GET_PARENT_CATEGORY_FAIL,
  GET_PARENT_CATEGORY_ERROR,
  GET_PARENT_CATEGORY_SUCCESS,
  PARENT_CATEGORY_CREATE_REQUEST,
  PARENT_CATEGORY_CREATE_FAIL,
  PARENT_CATEGORY_CREATE_ERROR,
  PARENT_CATEGORY_CREATE_SUCCESS,
  PARENT_CATEGORY_UPDATE_REQUEST,
  PARENT_CATEGORY_UPDATE_FAIL,
  PARENT_CATEGORY_UPDATE_ERROR,
  PARENT_CATEGORY_UPDATE_SUCCESS,
  PARENT_CATEGORY_DELETE_REQUEST,
  PARENT_CATEGORY_DELETE_FAIL,
  PARENT_CATEGORY_DELETE_ERROR,
  PARENT_CATEGORY_DELETE_SUCCESS,

  CREATE_CATEGORY_ERROR,
  CREATE_CATEGORY_FAIL,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_SUB_CATEGORY_ERROR,
  CREATE_SUB_CATEGORY_FAIL,
  CREATE_SUB_CATEGORY_REQUEST,
  CREATE_SUB_CATEGORY_SUCCESS,
  GET_CATEGORY_ERROR,
  GET_CATEGORY_FAIL,
  GET_CATEGORY_REQUEST,
  GET_CATEGORY_SUCCESS,
  GET_SUB_CATEGORY_ERROR,
  GET_SUB_CATEGORY_FAIL,
  GET_SUB_CATEGORY_REQUEST,
  GET_SUB_CATEGORY_SUCCESS,

 

  GET_CATEGORY_FOR_USER_REQUEST,
  GET_CATEGORY_FOR_USER_FAIL,
  GET_CATEGORY_FOR_USER_SUCCESS,
  GET_CATEGORY_FOR_USER_ERROR,
  EDIT_PRODUCT_REQUEST,
  EDIT_PRODUCT_FAIL,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_ERROR,
  EDIT_CATEGORY_REQUEST,
  EDIT_CATEGORY_FAIL,
  EDIT_CATEGORY_SUCCESS,
  EDIT_CATEGORY_ERROR,
  EDIT_SUB_CATEGORY_REQUEST,
  EDIT_SUB_CATEGORY_FAIL,
  EDIT_SUB_CATEGORY_SUCCESS,
  EDIT_SUB_CATEGORY_ERROR,
} from "../Variables/UserVariables";
import Cookies from "js-cookie";
import { toast } from "react-toastify";



  // ========= create Parent Category =================================
  export const ParentCategoryCreateFunc = (parentCategoryData) => async (dispatch) => {
    try {
      dispatch({ type: PARENT_CATEGORY_CREATE_REQUEST });
      const res = await fetch(`${server}/parentcategory/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
        },
        body: JSON.stringify(parentCategoryData),
      });
      dispatch({ type: PARENT_CATEGORY_CREATE_FAIL });
      const data = await res.json();
      if (!data || res.status === 400) {
        return toast.error(data.message);
      } else {
        toast.success(data.message);
        dispatch({ type: PARENT_CATEGORY_CREATE_SUCCESS });
      }
    } catch (error) {
      dispatch({ type: PARENT_CATEGORY_CREATE_ERROR });
    }
  };


// ============== get all parent category
export const getallParentCategory = (categoryName) => async (dispatch) => {
  try {
    dispatch({ type: GET_PARENT_CATEGORY_REQUEST });
    const res = await fetch(`${server}/parentcategoryListWithSearch?name=${categoryName}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
      },
    });
    dispatch({ type: GET_PARENT_CATEGORY_FAIL });
    const data = await res.json();
    console.log(data , 'data')
    if (!data || res.status === 401) {
      return;
    } else if (res.status === 500) {
      return alert("Internel Server Error new");
    } else {
      dispatch({ type: GET_PARENT_CATEGORY_SUCCESS, payload: data.data.data
      });
    }
  } catch (error) {
    dispatch({ type: GET_PARENT_CATEGORY_ERROR, payload: error.message });
  }
};



export const CreateProductFunc =
  (CategoryName, ParentItem, navigate) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_CATEGORY_REQUEST });
      const res = await fetch(`${server}/category/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
        },
        body: JSON.stringify({ CategoryName, ParentItem }),
      });
      dispatch({ type: CREATE_CATEGORY_FAIL });
      const data = await res.json();
      if (!data || res.status === 400) {
        return toast.error(data.message);
      } else if (res.status === 500) {
        return toast.error("Internel Server Error new");
      } else {
        dispatch({ type: CREATE_CATEGORY_SUCCESS });
        toast.success(data.message);
        // navigate("/admin/dashboard")
      }
    } catch (error) {
      dispatch({ type: CREATE_CATEGORY_ERROR, payload: error.message });
    }
  };

// ======== update product
export const UpdateproductFunc =
  (categorydata, navigate) => async (dispatch) => {
    try {
        console.log(categorydata);
      dispatch({ type: EDIT_PRODUCT_REQUEST });
      const res = await fetch(`${server}/product/edit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
        },
        body: JSON.stringify(categorydata),
      });
      dispatch({ type: EDIT_PRODUCT_FAIL });
      const data = await res.json();
      console.log(data);
      if (!data || res.status === 400) {
        return toast.error(data.message);
      } else if (res.status === 500) {
        return toast.error("Internel Server Error new");
      } else {
        dispatch({ type: EDIT_PRODUCT_SUCCESS });
        toast.success(data.message);
        // navigate("/admin/dashboard")
      }
    } catch (error) {
      dispatch({ type: EDIT_PRODUCT_ERROR, payload: error.message });
    }
  };





//  =============== get all getallCategory

export const getallCategory = () => async (dispatch) => {
  try {
    dispatch({ type: GET_CATEGORY_REQUEST });
    const res = await fetch(`${server}/category/list`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
      },
    });
    dispatch({ type: GET_CATEGORY_FAIL });
    const data = await res.json();
    if (!data || res.status === 401) {
      return;
    } else if (res.status === 500) {
      return alert("Internel Server Error new");
    } else {
      dispatch({ type: GET_CATEGORY_SUCCESS, payload: data.data });
    }
  } catch (error) {
    dispatch({ type: GET_CATEGORY_ERROR, payload: error.message });
  }
};
export const getallCategoryforuser = () => async (dispatch) => {
  try {
    dispatch({ type: GET_CATEGORY_FOR_USER_REQUEST });
    const res = await fetch(`${server}/nav/category/list`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({ type: GET_CATEGORY_FOR_USER_FAIL });
    const data = await res.json();
    if (!data || res.status === 401) {
      return;
    } else if (res.status === 500) {
      return alert("Internel Server Error new");
    } else {
      dispatch({ type: GET_CATEGORY_FOR_USER_SUCCESS, payload: data.data });
    }
  } catch (error) {
    dispatch({ type: GET_CATEGORY_FOR_USER_ERROR, payload: error.message });
  }
};



// ============== get all sub category
export const getallSubCategory = () => async (dispatch) => {
  try {
    dispatch({ type: GET_SUB_CATEGORY_REQUEST });
    const res = await fetch(`${server}/subcategory/list`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
      },
    });
    dispatch({ type: GET_SUB_CATEGORY_FAIL });
    const data = await res.json();
    if (!data || res.status === 401) {
      return;
    } else if (res.status === 500) {
      return alert("Internel Server Error new");
    } else {
      dispatch({ type: GET_SUB_CATEGORY_SUCCESS, payload: data.data });
    }
  } catch (error) {
    dispatch({ type: GET_SUB_CATEGORY_ERROR, payload: error.message });
  }
};

// =========== create Sub Category

export const CreateSubCategoryFunc =
  (CategoryId, SubCategoryName, navigate) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_SUB_CATEGORY_REQUEST });
      const res = await fetch(`${server}/subcategory/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
        },
        body: JSON.stringify({ CategoryId, SubCategoryName }),
      });
      dispatch({ type: CREATE_SUB_CATEGORY_FAIL });
      const data = await res.json();
      console.log(data);
      if (!data || res.status === 401) {
        return toast.error(data.message);
      } else if (res.status === 500) {
        return toast.error("Internel Server Error new");
      } else {
        dispatch({ type: CREATE_SUB_CATEGORY_SUCCESS });
        toast.success(data.message);
        navigate("/admin/dashboard");
      }
    } catch (err) {
      dispatch({ type: CREATE_SUB_CATEGORY_ERROR, payload: err.message });
    }
  };

  // ==== update or edit category 
  // ========
export const UpdateCategoryActiveFunc =
(id, navigate) => async (dispatch) => {
  try {
    dispatch({ type: EDIT_CATEGORY_REQUEST });
    const res = await fetch(`${server}/product/edit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
      },
      body: JSON.stringify(id),
    });
    dispatch({ type: EDIT_CATEGORY_FAIL });
    const data = await res.json();
    console.log(data);
    if (!data || res.status === 400) {
      return toast.error(data.message);
    } else if (res.status === 500) {
      return toast.error("Internel Server Error new");
    } else {
      dispatch({ type: EDIT_CATEGORY_SUCCESS });
      toast.success(data.message);
      // navigate("/admin/dashboard")
    }
  } catch (error) {
    dispatch({ type: EDIT_CATEGORY_ERROR, payload: error.message });
  }
};

 // ==== update or edit Subcategory 
  // ========
  export const UpdateSubCategoryActiveFunc =
  (id, navigate) => async (dispatch) => {
    try {
      dispatch({ type: EDIT_SUB_CATEGORY_REQUEST });
      const res = await fetch(`${server}/product/edit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
        },
        body: JSON.stringify(id),
      });
      dispatch({ type: EDIT_SUB_CATEGORY_FAIL });
      const data = await res.json();
      console.log(data);
      if (!data || res.status === 400) {
        return toast.error(data.message);
      } else if (res.status === 500) {
        return toast.error("Internel Server Error new");
      } else {
        dispatch({ type: EDIT_SUB_CATEGORY_SUCCESS });
        toast.success(data.message);
        // navigate("/admin/dashboard")
      }
    } catch (error) {
      dispatch({ type: EDIT_SUB_CATEGORY_ERROR, payload: error.message });
    }
  };
  
