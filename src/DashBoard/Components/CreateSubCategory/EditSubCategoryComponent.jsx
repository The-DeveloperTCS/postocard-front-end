import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  UpdateSubCategoryActiveFunc,
  getSpecicificSubCategory,
  getallCategory,
  getallParentCategory
} from "../../../Redux/Action/CategoryAction";
import { Button, Spinner } from "react-bootstrap";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const EditParentCategoryComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const subCategorySpecific = useSelector((state) => state.category.subCategorySpecific)
  const allParentCategory = useSelector((state) => state.category.allParentCategory)
  const allCategory = useSelector((state) => state.category.allcategory)
  const [selectedParentCategory, setSelectedParentCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [subCategory, setSubCategory] = useState({
    SubCategoryName: "",
    CategoryId: null,
    ParentItem: null,
  });

  useEffect(() => {
    dispatch(getallParentCategory(""))
    dispatch(getallCategory(""))

  }, []) 

  useEffect(() => {
    getDetails()
  }, [])

  const getDetails = () => {
    dispatch(getSpecicificSubCategory(params.id))
  }

  useEffect(() => {
    setSubCategory({
      ...subCategory,
      SubCategoryName: subCategorySpecific?.SubCategoryName,
      id: subCategorySpecific?.id,
      CategoryId:subCategorySpecific?.Category,
      ParentItem: null,
    })
  }, [subCategorySpecific])
  useEffect(() => {
    const selectCategory = allCategory.filter((c) => c.id === subCategory.CategoryId)[0];
    setSelectedCategory(selectCategory)
  }, [allCategory && subCategory])

  const updateSubCategoryHandler = () => {
    setIsLoading(true)
    if (!subCategory.SubCategoryName) {
      setIsLoading(false);
      return toast.error("Please fill in the field");
    }
    dispatch(UpdateSubCategoryActiveFunc(subCategory, navigate));
    setIsLoading(false);
  };

  return (
    <>
      <div className="flex justify-center place-items-center h-[90vh]">
        <div className="w-[650px]">
          <h2 className="text-[50px] text-center mb-3 font-semibold">
            Edit Sub Category
          </h2>
          <div className="w-full mb-2">
            <label htmlFor="name" className="w-full text-[19px] font-bold px-1">
              Parent Category.
            </label>
            <Autocomplete
              id="combo-box-demo"
              options={allParentCategory}
              getOptionLabel={option => option.name}
              value={selectedParentCategory}
              onChange={(e, value) => {
                if (value !== null) {
                  setSubCategory({
                    ...subCategory,
                    ParentItem: value.id
                  })
                  setSelectedParentCategory(value)
                }
                else {
                  setSubCategory({
                    ...subCategory,
                    ParentItem: null
                  })
                  setSelectedParentCategory(value)
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
          <div className="w-full mb-2">
            <label htmlFor="name" className="w-full text-[19px] font-bold px-1">
              Category.
            </label>
            <Autocomplete
              id="combo-box-demo"
              options={allCategory}
              getOptionLabel={option => option.CategoryName}
              value={selectedCategory}
              onChange={(e, value) => {
                if (value !== null) {
                  setSubCategory({
                    ...subCategory,
                    CategoryId: value.id
                  })
                  setSelectedCategory(value)
                }
                else {
                  setSubCategory({
                    ...subCategory,
                    CategoryId: null
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
          <div className="w-full mb-2">
            <label htmlFor="name" className="w-full text-[19px] font-bold px-1">
              Sub Category Name.
            </label>
            <input
              type="text"
              value={subCategory.SubCategoryName}
              onChange={(e) => setSubCategory({
                ...subCategory,
                SubCategoryName: e.target.value
              })}
              placeholder="Enter Parent Category Name"
              className="w-full border-[1px] border-[#8080803b] rounded-sm px-2 py-1 my-1 text-[17px] outline-none bg-[#8080803a]"
            />
          </div>
          <Button
            disabled={isLoading}
            onClick={updateSubCategoryHandler}
            className="w-full px-3 py-2 bg-[#6E6EEF] text-[white] my-3 rounded-sm"
          >
            {isLoading && <Spinner as="span" animation="grow" />}
            {isLoading ? "Loading" : "Update"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default EditParentCategoryComponent;
