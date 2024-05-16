import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  ParentCategoryCreateFunc,
} from "../../../Redux/Action/CategoryAction";
import { useNavigate } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import { Typeahead } from 'react-bootstrap-typeahead';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead.bs5.css';

const ParentCategoreyComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allParentCategory = useSelector((state) => state.category.allParentCategory)
  const [isLoading, setIsLoading] = useState(false);
  const [ParentCategoryName, setParentCategoryName] = useState("");
  const [parentCategories , setParentCategories]= useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {

    const mappingParentCategory = allParentCategory.map((pc) => {
      return {
        label: pc.name,
        labelKey: pc.name,
        id: pc.id
      }
    })
    setParentCategories(mappingParentCategory)
  }, [allParentCategory])
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
console.log(parentCategories, 'parentCategories')
  return (
    <>
      <div className="flex justify-center place-items-center h-[90vh]">
        <div className="w-[650px]">
          <h2 className="text-[50px] text-center mb-3 font-semibold">
            Create Parent Category
          </h2>
          <div className="w-full mb-2">
            <label htmlFor="name" className="w-full text-[19px] font-bold px-1">
              Category Name.
            </label>

            <Typeahead
              id="basic-typeahead-multiple"
              labelKey="name"
              onChange={setSelected}
              options={allParentCategory}
              placeholder="Choose parent category..."
              className="w-full border-[1px] border-[#8080803b] rounded-sm px-2 py-1 my-1 text-[17px] outline-none bg-[#8080803a]"
              selected={selected}

            />

          </div>
          <div className="w-full mb-2">
            <label htmlFor="name" className="w-full text-[19px] font-bold px-1">
              Category Name.
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