import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Button, Spinner } from "react-bootstrap";
import {
  ParentCategoryUpdateFunc,
  getSpecificParentCategory
} from "../../../Redux/Action/CategoryAction";

const EditParentCategoryComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = useParams();
  const parentCategorySpecific = useSelector((state) => state.category.parentCategorySpecific)
  const [ParentCategoryName, setParentCategoryName] = useState();
  const [isLoading, setIsLoading]= useState(false);
  useEffect(() => {
    getDetails()
  }, [])

  const getDetails = () => {
    dispatch(getSpecificParentCategory(params.id))
  }

  useEffect(() => {
    setParentCategoryName({
      ...ParentCategoryName,
      CategoryName: parentCategorySpecific?.name,
      id: parentCategorySpecific?.id
    })
  }, [parentCategorySpecific])

  const updateParentCategoryHandler = () => {
    setIsLoading(true)

    if (!ParentCategoryName.CategoryName) {
      setIsLoading(false)
      return toast.error("Please fill in the field");
    }
    const parentCategoryData = {
      CategoryName: ParentCategoryName.CategoryName,
    };
    dispatch(ParentCategoryUpdateFunc(parentCategoryData, ParentCategoryName.id, navigate));
  };


  return (
    <>
      <div className="flex justify-center place-items-center h-[90vh]">
        <div className="w-[650px]">
          <h2 className="text-[50px] text-center mb-3 font-semibold">
            Edit Parent Category
          </h2>
          <div className="w-full mb-2">
            <label htmlFor="name" className="w-full text-[19px] font-bold px-1">
              Parent Category Name.
            </label>
            <input
              type="text"
              value={ParentCategoryName?.CategoryName}
              onChange={(e) => setParentCategoryName({ ...ParentCategoryName, CategoryName: e.target.value })}
              placeholder="Enter Parent Category Name"
              className="w-full border-[1px] border-[#8080803b] rounded-sm px-2 py-1 my-1 text-[17px] outline-none bg-[#8080803a]"
            />
          </div>
          <Button
            disabled={isLoading}
            onClick={updateParentCategoryHandler}
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
