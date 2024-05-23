import { server } from "../../Setting/GlobalVariable";
import {
  GET_PARENT_CATEGORY_REQUEST,
  GET_PARENT_CATEGORY_FAIL,
  GET_PARENT_CATEGORY_ERROR,
  GET_PARENT_CATEGORY_SUCCESS,
  GET_SPECIFIC_PARENT_CATEGORY_REQUEST,
  GET_SPECIFIC_PARENT_CATEGORY_FAIL,
  GET_SPECIFIC_PARENT_CATEGORY_SUCCESS,
  GET_SPECIFIC_PARENT_CATEGORY_ERROR,
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
  GET_CATEGORY_ERROR,
  GET_CATEGORY_FAIL,
  GET_CATEGORY_REQUEST,
  GET_CATEGORY_SUCCESS,
  GET_SPECIFIC_CATEGORY_ERROR,
  GET_SPECIFIC_CATEGORY_FAIL,
  GET_SPECIFIC_CATEGORY_REQUEST,
  GET_SPECIFIC_CATEGORY_SUCCESS,
  CREATE_CATEGORY_ERROR,
  CREATE_CATEGORY_FAIL,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  EDIT_CATEGORY_REQUEST,
  EDIT_CATEGORY_FAIL,
  EDIT_CATEGORY_SUCCESS,
  EDIT_CATEGORY_ERROR,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_FAIL,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_ERROR,
  GET_SUB_CATEGORY_ERROR,
  GET_SUB_CATEGORY_FAIL,
  GET_SUB_CATEGORY_REQUEST,
  GET_SUB_CATEGORY_SUCCESS,
  GET_SPECIFIC_SUB_CATEGORY_ERROR,
  GET_SPECIFIC_SUB_CATEGORY_FAIL,
  GET_SPECIFIC_SUB_CATEGORY_REQUEST,
  GET_SPECIFIC_SUB_CATEGORY_SUCCESS,
  CREATE_SUB_CATEGORY_ERROR,
  CREATE_SUB_CATEGORY_FAIL,
  CREATE_SUB_CATEGORY_REQUEST,
  CREATE_SUB_CATEGORY_SUCCESS,
  EDIT_SUB_CATEGORY_REQUEST,
  EDIT_SUB_CATEGORY_FAIL,
  EDIT_SUB_CATEGORY_SUCCESS,
  EDIT_SUB_CATEGORY_ERROR,
  DELETE_SUB_CATEGORY_REQUEST,
  DELETE_SUB_CATEGORY_FAIL,
  DELETE_SUB_CATEGORY_SUCCESS,
  DELETE_SUB_CATEGORY_ERROR,




  GET_CATEGORY_FOR_USER_REQUEST,
  GET_CATEGORY_FOR_USER_FAIL,
  GET_CATEGORY_FOR_USER_SUCCESS,
  GET_CATEGORY_FOR_USER_ERROR,
  EDIT_PRODUCT_REQUEST,
  EDIT_PRODUCT_FAIL,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_ERROR,
} from "../Variables/UserVariables";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

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
    if (!data || res.status === 401) {
      return;
    } else if (res.status === 500) {
      return alert("Internel Server Error new");
    } else {
      dispatch({
        type: GET_PARENT_CATEGORY_SUCCESS, payload: data.data.data
      });
    }
  } catch (error) {
    dispatch({ type: GET_PARENT_CATEGORY_ERROR, payload: error.message });
  }
};


// ============== get specicific parent category
export const getSpecificParentCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SPECIFIC_PARENT_CATEGORY_REQUEST });
    const res = await fetch(`${server}/parentcategory/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
      },
    });
    dispatch({ type: GET_SPECIFIC_PARENT_CATEGORY_FAIL });
    const data = await res.json();
    if (!data || res.status === 401) {
      return;
    } else if (res.status === 500) {
      return alert("Internel Server Error new");
    } else {
      dispatch({
        type: GET_SPECIFIC_PARENT_CATEGORY_SUCCESS, payload: data.data
      });
    }
  } catch (error) {
    dispatch({ type: GET_SPECIFIC_PARENT_CATEGORY_ERROR, payload: error.message });
  }
};

// ========= create Parent Category =================================
export const ParentCategoryCreateFunc = (parentCategoryData, navigate) => async (dispatch) => {
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
      navigate("/admin/parent-category/list");
    }
  } catch (error) {
    dispatch({ type: PARENT_CATEGORY_CREATE_ERROR });
  }
};

// ========= Update Parent Category =================================
export const ParentCategoryUpdateFunc = (parentCategoryData, id, navigate) => async (dispatch) => {
  try {
    dispatch({ type: PARENT_CATEGORY_UPDATE_REQUEST });
    const res = await fetch(`${server}/parentcategory/update/${id}`, {
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
      },
      body: JSON.stringify(parentCategoryData),
    });
    dispatch({ type: PARENT_CATEGORY_UPDATE_FAIL });
    const data = await res.json();
    if (!data || res.status === 400) {
      return toast.error(data.message);
    } else {
      toast.success(data.message);
      dispatch({ type: PARENT_CATEGORY_UPDATE_SUCCESS });
      navigate("/admin/parent-category/list");
    }
  } catch (error) {
    dispatch({ type: PARENT_CATEGORY_UPDATE_ERROR });
  }
};

// ========= Delete Parent Category =================================
export const ParentCategoryDeleteFunc = (parentCategoryData) => async (dispatch) => {
  try {
    dispatch({ type: PARENT_CATEGORY_DELETE_REQUEST });
    const res = await fetch(`${server}/parentcategory/delete/${parentCategoryData.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
      },
      body: JSON.stringify(parentCategoryData),
    });
    dispatch({ type: PARENT_CATEGORY_DELETE_FAIL });
    const data = await res.json();
    if (!data || res.status === 400) {
      return toast.error(data.message);
    } else {
      toast.success(data.message);
      dispatch(getallParentCategory(""))
      dispatch({ type: PARENT_CATEGORY_DELETE_SUCCESS });
    }
  } catch (error) {
    dispatch({ type: PARENT_CATEGORY_DELETE_ERROR });
  }
};

//  =============== get all Category
export const getallCategory = (name) => async (dispatch) => {
  try {
    dispatch({ type: GET_CATEGORY_REQUEST });
    const res = await fetch(`${server}/category/listWithSearch?name=${name}`, {
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
      dispatch({ type: GET_CATEGORY_SUCCESS, payload: data.data.data });
    }
  } catch (error) {
    dispatch({ type: GET_CATEGORY_ERROR, payload: error.message });
  }
};

//  =============== get specific Category
export const getSpecificCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SPECIFIC_CATEGORY_REQUEST });
    const res = await fetch(`${server}/category/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
      },
    });
    dispatch({ type: GET_SPECIFIC_CATEGORY_FAIL });
    const data = await res.json();
    if (!data || res.status === 401) {
      return;
    } else if (res.status === 500) {
      return alert("Internel Server Error new");
    } else {
      dispatch({ type: GET_SPECIFIC_CATEGORY_SUCCESS, payload: data.data });
    }
  } catch (error) {
    dispatch({ type: GET_SPECIFIC_CATEGORY_ERROR, payload: error.message });
  }
};

export const CreateCategoryFunc =
  (category, navigate) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_CATEGORY_REQUEST });
      const res = await fetch(`${server}/category/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
        },
        body: JSON.stringify(category),
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
        navigate("/admin/category/list")
      }
    } catch (error) {
      dispatch({ type: CREATE_CATEGORY_ERROR, payload: error.message });
    }
  };

// ========
export const UpdateCategoryActiveFunc =
  (id, navigate) => async (dispatch) => {
    try {
      dispatch({ type: EDIT_CATEGORY_REQUEST });
      const res = await fetch(`${server}/category/update/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
        },
        body: JSON.stringify(id),
      });
      dispatch({ type: EDIT_CATEGORY_FAIL });
      const data = await res.json();
      if (!data || res.status === 400) {
        return toast.error(data.message);
      } else if (res.status === 500) {
        return toast.error("Internel Server Error new");
      } else {
        dispatch({ type: EDIT_CATEGORY_SUCCESS });
        toast.success(data.message);
        navigate("/admin/category/list")

      }
    } catch (error) {
      dispatch({ type: EDIT_CATEGORY_ERROR, payload: error.message });
    }
  };


// ========= Delete Parent Category =================================
export const categoryDeleteFunc = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CATEGORY_REQUEST });
    const res = await fetch(`${server}/category/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
      },
      body: JSON.stringify(id),
    });
    dispatch({ type: DELETE_CATEGORY_FAIL });
    const data = await res.json();
    if (!data || res.status === 400) {
      return toast.error(data.message);
    } else {
      toast.success(data.message);
      dispatch(getallCategory(""))
      dispatch({ type: DELETE_CATEGORY_SUCCESS });
    }
  } catch (error) {
    dispatch({ type: DELETE_CATEGORY_ERROR });
  }
};

// ============== get all sub category
export const getallSubCategory = (name) => async (dispatch) => {
  try {
    dispatch({ type: GET_SUB_CATEGORY_REQUEST });
    const res = await fetch(`${server}/subcategory/listWithSearch?name=${name}`, {
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
      dispatch({ type: GET_SUB_CATEGORY_SUCCESS, payload: data.data.data });
    }
  } catch (error) {
    dispatch({ type: GET_SUB_CATEGORY_ERROR, payload: error.message });
  }
};

// ============== get all sub category
export const getSpecicificSubCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SPECIFIC_SUB_CATEGORY_REQUEST });
    const res = await fetch(`${server}/subcategory/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
      },
    });
    dispatch({ type: GET_SPECIFIC_SUB_CATEGORY_FAIL });
    const data = await res.json();
    if (!data || res.status === 401) {
      return;
    } else if (res.status === 500) {
      return alert("Internel Server Error new");
    } else {
      dispatch({ type: GET_SPECIFIC_SUB_CATEGORY_SUCCESS, payload: data.data });
    }
  } catch (error) {
    dispatch({ type: GET_SPECIFIC_SUB_CATEGORY_ERROR, payload: error.message });
  }
};


// =========== create Sub Category
export const CreateSubCategoryFunc =
  (subCategory, navigate) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_SUB_CATEGORY_REQUEST });
      const res = await fetch(`${server}/subcategory/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
        },
        body: JSON.stringify(subCategory),
      });
      dispatch({ type: CREATE_SUB_CATEGORY_FAIL });
      const data = await res.json();
      if (!data || res.status === 401) {
        return toast.error(data.message);
      } else if (res.status === 500) {
        return toast.error("Internel Server Error new");
      } else {
        dispatch({ type: CREATE_SUB_CATEGORY_SUCCESS });
        toast.success(data.message);
        navigate("/admin/sub-category/list")
      }
    } catch (err) {
      dispatch({ type: CREATE_SUB_CATEGORY_ERROR, payload: err.message });
    }
  };

// ==== update or edit Subcategory 
export const UpdateSubCategoryActiveFunc =
  (subCategory, navigate) => async (dispatch) => {
    try {
      dispatch({ type: EDIT_SUB_CATEGORY_REQUEST });
      const res = await fetch(`${server}/subcategory/update/${subCategory.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
        },
        body: JSON.stringify(subCategory),
      });
      dispatch({ type: EDIT_SUB_CATEGORY_FAIL });
      const data = await res.json();
      if (!data || res.status === 400) {
        return toast.error(data.message);
      } else if (res.status === 500) {
        return toast.error("Internel Server Error new");
      } else {
        dispatch({ type: EDIT_SUB_CATEGORY_SUCCESS });
        toast.success(data.message);
        navigate("/admin/sub-category/list")
      }
    } catch (error) {
      dispatch({ type: EDIT_SUB_CATEGORY_ERROR, payload: error.message });
    }
  };


// ========= Delete Sub Category =================================
export const subCategoryDeleteFunc = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_SUB_CATEGORY_REQUEST });
    const res = await fetch(`${server}/subcategory/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
      },
      body: JSON.stringify(id),
    });
    dispatch({ type: DELETE_SUB_CATEGORY_FAIL });
    const data = await res.json();
    if (!data || res.status === 400) {
      return toast.error(data.message);
    } else {
      toast.success(data.message);
      dispatch({ type: DELETE_SUB_CATEGORY_SUCCESS });
      dispatch(getallSubCategory(""))
    }
  } catch (error) {
    dispatch({ type: DELETE_SUB_CATEGORY_ERROR });
  }
};



// ======== update product
export const UpdateproductFunc =
  (categorydata, navigate) => async (dispatch) => {
    try {
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