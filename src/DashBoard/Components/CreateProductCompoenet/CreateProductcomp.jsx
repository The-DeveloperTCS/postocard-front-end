import React, { useEffect, useState } from "react";
import "./Style/CreateProductcomp.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getallArtist
} from "../../../Redux/Action/ArtistAction";
import {
  getallParentCategory,
  getallCategory,
  getallSubCategory,
} from "../../../Redux/Action/CategoryAction";
import { Button, Spinner } from "react-bootstrap";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

// import { CreateProductFunc } from "../../../Redux/Action/ProductAction";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { server } from "../../../Setting/GlobalVariable";
// import Artists from "../../Pages/Artists";
// import { parse } from "date-fns";

const CreateProductcomp = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const allArtist = useSelector((state) => state.artist.allArtist);
  const allParentCategory = useSelector((state) => state.category.allParentCategory)
  const allCategory = useSelector((state) => state.category.allcategory)
  const allSubCategory = useSelector((state) => state.category.allsubcategory)
  const isLoading = useSelector((state) => state.product.isLoading);
  const [selectedParentCategory, setSelectedParentCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedArtisit, setSelectedArtisit] = useState(null);

  const [productDetails, setProductDetails] = useState({
    ProductName: "",
    Price: 0,
    File1: "",
    File2: "",
    SubCategory: "",
    artist_id: "",
    isActive: false
  });


  useEffect(() => {
    dispatch(getallArtist(""));
    dispatch(getallParentCategory(""))
    dispatch(getallCategory(""))
    dispatch(getallSubCategory(""))
  }, []);

  // useEffect(() => {
  //   const filteredCategories =
  //     subCategoryData &&
  //     subCategoryData.filter((item) =>
  //       item.SubCategoryName.toLowerCase().includes(
  //         subCategorysearch.toLowerCase()
  //       )
  //     );
  //   setCopyCategory(filteredCategories);
  // }, [subCategoryData, subCategorysearch]);

  // // --------- file2change

  // const data = {
  //   productDetails: productDetails,
  //   artist_id: parseInt(Artist),
  //   Price: Price,
  //   File1: File1,
  //   File2: File2,
  //   // File3: File3,
  //   // File4: File4,
  //   SubCategory: subCategory,
  // };
  // // ----------- usedisatch

  // // -----------createproduct
  // const createproduct = () => {
  //   dispatch(CreateProductFunc(data, Navigate));
  // };

  // // const addcategory = (id,name)=>{
  // //   setProductDetails(id)
  // //   setshowsubcategory(false)
  // //   setSubCategorysearch(name)
  // // }

  // // const subcategorychangevalue = (e)=>{
  // //   setSubCategorysearch(e.target.value)
  // //   console.log(subCategorysearch)
  // //   setshowsubcategory(true)
  // // }

  // const saveArtistId = (id) => {
  //   setArtist(id);
  // };

  // const getArtist = async () => {
  //   try {
  //     const res = await axios.get(`${server}/artists`, {
  //       headers: {
  //         Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
  //       },
  //     });
  //     setGetArtists(res.data);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };


  // const handleSubCategoryChange = (e) => {
  //   const selectedOption = e.target.value;

  //   // Find the selected subcategory
  //   const selectedSubCategory = subCategoryData.find(
  //     (item) => item.SubCategoryName === selectedOption
  //   );

  //   // Update state with the selected subcategory's id
  //   if (selectedSubCategory) {
  //     setProductDetails(selectedSubCategory.id);
  //   } else {
  //     // Handle the case where no matching subcategory is found
  //     setProductDetails("");
  //   }
  // };

  return (
    <>
      {isLoading ? (
        <p>Loading....</p>
      ) : (
        <div className="create_product_admin_comp">
          <h2 className="text-center mb-4 font-bold text-3xl">
            Create Product
          </h2>
          <div className="create_product_box">
            {/* ------- product name  */}
            <div className="create_product_input">
              <label htmlFor="productname">Product Name</label>
              <input
                type="text"
                name="productname"
                value={productDetails.ProductName}
                onChange={(e) => setProductDetails({ ...productDetails, ProductName: e.target.value })}
              />
            </div>
            {/* ----------- is active  */}
            <div className="create_product_input_check">
              <input
                type="checkbox"
                checked
                disabled
                value={productDetails.isActive}
                onChange={(e) => setProductDetails({ ...productDetails, isActive: e.target.checked })}
              />
              <label htmlFor="f4">Is Active</label>
            </div>

            <div className="create_product_input">
              {/* <label htmlFor="productname">Select Parent Category</label> */}
              <Autocomplete
                id="combo-box-demo"
                options={allParentCategory}
                getOptionLabel={option => option.name}
                value={selectedParentCategory}
                onChange={(e, value) => {
                  if (value !== null) {
                    setProductDetails({
                      ...productDetails,
                      parentCategory: value.id
                    })
                    setSelectedParentCategory(value)
                  }
                  else {
                    setProductDetails({
                      ...productDetails,
                      category: null
                    })
                    setSelectedParentCategory(value)
                  }
                }}
                renderInput={(params) =>
                  <TextField
                    {...params}
                    variant="standard"
                    label="Parent Category"
                    placeholder="Select Category"
                    margin="normal"
                    fullWidth
                    className="w-full border-[1px] border-[#8080803b] rounded-sm px-2 py-1 my-1 text-[17px] outline-none bg-[#8080803a]"
                  />}
              />
            </div>

            <div className="create_product_input">
              {/* <label htmlFor="productname">Select Parent Category</label> */}
              <Autocomplete
                id="combo-box-demo"
                options={allCategory}
                getOptionLabel={option => option.name}
                value={selectedCategory}
                onChange={(e, value) => {
                  if (value !== null) {
                    setProductDetails({
                      ...productDetails,
                      category: value.id
                    })
                    setSelectedCategory(value)
                  }
                  else {
                    setProductDetails({
                      ...productDetails,
                      category: null
                    })
                    setSelectedCategory(value)
                  }
                }}
                renderInput={(params) =>
                  <TextField
                    {...params}
                    variant="standard"
                    label="Category"
                    placeholder="Select Category"
                    margin="normal"
                    fullWidth
                    className="w-full border-[1px] border-[#8080803b] rounded-sm px-2 py-1 my-1 text-[17px] outline-none bg-[#8080803a]"
                  />}
              />
            </div>

            <div className="create_product_input">
              {/* <label htmlFor="productname">Select Parent Category</label> */}
              <Autocomplete
                id="combo-box-demo"
                options={allSubCategory}
                getOptionLabel={option => option.name}
                value={selectedSubCategory}
                onChange={(e, value) => {
                  if (value !== null) {
                    setProductDetails({
                      ...productDetails,
                      SubCategory: value.id
                    })
                    setSelectedSubCategory(value)
                  }
                  else {
                    setProductDetails({
                      ...productDetails,
                      SubCategory: null
                    })
                    setSelectedSubCategory(value)
                  }
                }}
                renderInput={(params) =>
                  <TextField
                    {...params}
                    variant="standard"
                    label="Sub Category"
                    placeholder="Select Sub-Category"
                    margin="normal"
                    fullWidth
                    className="w-full border-[1px] border-[#8080803b] rounded-sm px-2 py-1 my-1 text-[17px] outline-none bg-[#8080803a]"
                  />}
              />
            </div>

            <div className="create_product_input">
              {/* <label htmlFor="productname">Select Parent Category</label> */}
              <Autocomplete
                id="combo-box-demo"
                options={allArtist}
                getOptionLabel={option => option.name}
                value={selectedArtisit}
                onChange={(e, value) => {
                  if (value !== null) {
                    setProductDetails({
                      ...productDetails,
                      artist_id: value.id
                    })
                    setSelectedArtisit(value)
                  }
                  else {
                    setProductDetails({
                      ...productDetails,
                      artist_id: null
                    })
                    setSelectedArtisit(value)
                  }
                }}
                renderInput={(params) =>
                  <TextField
                    {...params}
                    variant="standard"
                    label="Artist"
                    placeholder="Select Artist"
                    margin="normal"
                    fullWidth
                    className="w-full border-[1px] border-[#8080803b] rounded-sm px-2 py-1 my-1 text-[17px] outline-none bg-[#8080803a]"
                  />}
              />
            </div>

            <div className="create_product_input">
              <label htmlFor="Price">Product Price</label>
              <input
                type="number"
                name="price"
                value={productDetails.Price}
                onChange={(e) => setProductDetails({ ...productDetails, Price: e.target.value })}
              />
            </div>
            {/* ------------ file 1 */}
            <div className="create_product_input">
              <label htmlFor="f1">File 1</label>
              <input
                type="file"
                accept=".jpg, .jpeg, .png"
                name="File1"
                onChange={(e) => setProductDetails({ ...productDetails, File1: e.target.files[0] })}
              />
            </div>
            {/* ------------ file 2 */}
            <div className="create_product_input">
              <label htmlFor="f2">File 2</label>
              <input
                type="file"
                accept=".jpg, .jpeg, .png"
                name="File2"
                onChange={(e) => setProductDetails({ ...productDetails, File2: e.target.files[0] })}
              />
            </div>

          </div>
          <button
            // onClick={createproduct}
            className="btn_create_p">
            Create Product
          </button>
        </div>
      )}
    </>
  );
};

export default CreateProductcomp;