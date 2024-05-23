import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateCategoryFunc, getallParentCategory,
} from "../../../Redux/Action/CategoryAction";
import { useNavigate } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const CategoreyComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allParentCategory = useSelector((state) => state.category.allParentCategory)
  const [selectedParentCategory, setSelectedParentCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState({
    CategoryName: "",
    ParentItem: null
  });

  useEffect(() => {
    dispatch(getallParentCategory(""))
  }, [])

  const createCategory = () => {
    setIsLoading(true)
    if (!category) {
      setIsLoading(false)
      return toast.error("Please fill in the field");
    }
    dispatch(CreateCategoryFunc(category, navigate));
  };

  return (
    <>
      <div className="flex justify-center place-items-center h-[90vh]">
        <div className="w-[650px]">
          <h2 className="text-[50px] text-center mb-3 font-semibold">
            Create Category
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
                if(value !== null){
                  setCategory({
                    ...category,
                    ParentItem: value.id
                  })
                  setSelectedParentCategory(value)
                }
                else{
                  setCategory({
                    ...category,
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
              Category Name.
            </label>
            <input
              type="text"
              value={category.CategoryName}
              onChange={(e) => setCategory({
                ...category,
                CategoryName: e.target.value
              })}
              placeholder="Enter Parent Category Name"
              className="w-full border-[1px] border-[#8080803b] rounded-sm px-2 py-1 my-1 text-[17px] outline-none bg-[#8080803a]"
            />
          </div>
          <Button
            disabled={isLoading}
            onClick={createCategory}
            className="w-full px-3 py-2 bg-[#6E6EEF] text-[white] my-3 rounded-sm"
          >
            {isLoading && <Spinner as="span" animation="grow" />}
            {isLoading ? "Loading" : "Save"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default CategoreyComponent;