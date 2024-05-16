import React, { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  ParentCategoryCreateFunc,
} from "../../../Redux/Action/CategoryAction";
import { useNavigate } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";

const ParentCategoreyComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading]= useState(false);
  const [ParentCategoryName, setParentCategoryName] = useState("");

  const createParentCategory = () => {
    setIsLoading(true)
    if (!ParentCategoryName) {
      setIsLoading(false)
      return toast.error("Please fill in the field");
    }
    const parentCategoryData = {
      CategoryName: ParentCategoryName,

    };
    dispatch(ParentCategoryCreateFunc(parentCategoryData, navigate));
    // setIsLoading(false)

  };

  return (
    <>
      <div className="flex justify-center place-items-center h-[90vh]">
        <div className="w-[650px]">
          <h2 className="text-[50px] text-center mb-3 font-semibold">
            Create Parent Category
          </h2>
          <div className="w-full mb-2">
            <label htmlFor="name" className="w-full text-[19px] font-bold px-1">
              Parent Category Name.
            </label>
            <input
              type="text"
              value={ParentCategoryName}
              onChange={(e) => setParentCategoryName(e.target.value)}
              placeholder="Enter Parent Category Name"
              className="w-full border-[1px] border-[#8080803b] rounded-sm px-2 py-1 my-1 text-[17px] outline-none bg-[#8080803a]"
            />
          </div>
          <Button
            disabled={isLoading}
            onClick={createParentCategory}
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

export default ParentCategoreyComponent;