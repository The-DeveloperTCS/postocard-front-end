import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getallParentCategory,
} from "../../../Redux/Action/CategoryAction";
import Loading from "../../../Layout/Loading/Loading";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";

const ListOfParentCategory = ({ }) => {
  const dispatch = useDispatch();
  const allParentCategory = useSelector((state) => state.category.allParentCategory)
  const [categoryName, setCategoryName] = useState("");
  console.log(allParentCategory, 'allParentCategory')
  useEffect(() => {
    getParentCategories()
  }, [])

  const getParentCategories = () => {
    dispatch(getallParentCategory(categoryName));
  }

  const isLoading = useSelector((state) => state.category.isLoading);
  const isLoadingp = useSelector((state) => state.product.isLoading);

  return (
    <>
      {isLoading || isLoadingp ? (
        <Loading />
      ) : (
        <div className="admin_ListofProducts">
          <FilterHeader
            categoryName={categoryName}
            setCategoryName={setCategoryName}
            getParentCategories={getParentCategories}
          />
          {/* ============== list of category  */}
          <div className="list_product_admin">
            <div
              className={`product_list_header grid grid-cols-3 font-bold py-3 border-b-2 border-b-[gray]`}
            >
              <h2>ID</h2>
              <h2>Category Name</h2>
              <h2>Action</h2>
            </div>
            {/* ---------- category  */}
            <div className="list_main_box">
              {allParentCategory &&
                allParentCategory?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={`product_list_main grid grid-cols-3 py-3 border-b-2`}
                    >
                      <p>{item.id}</p>
                      <h2>
                        {item.name}
                      </h2>

                      <h2
                      // onClick={() => {
                      //   setCid(item.id);
                      //   updateactive(item.id);
                      // }}
                      >
                        <p className="flex justify-start place-items-center gap-3 relative">
                          <FaRegEdit
                            className="text-[green] cursor-pointer text-[20px]"
                          // onClick={() => editproduct(item.id)}
                          />
                          <AiOutlineDelete className="text-[23px] cursor-pointer text-[red]" />
                        </p>
                      </h2>
                      {/* <p className="flex justify-start place-items-center gap-3 relative">
                        <FaRegEdit
                          className="text-[green] cursor-pointer text-[20px]"
                        // onClick={() => editproduct(item.id)}
                        /> */}

                      {/* </p> */}
                    </div>
                  );
                })}
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default ListOfParentCategory;


// ========================= haeder
const FilterHeader = ({ categoryName, setCategoryName, getParentCategories }) => {
  return (
    <div className="filter_header flex justify-between place-items-center">
      {/* ------------- name  */}
      <div className="filter_inputs flex justify-between place-items-center gap-2">
        <input type="text" placeholder="Name" value={categoryName} onChange={(e) => setCategoryName(e.target.value)}
        // onKeyUp={()=> getParentCategories()}
        // onKeyDown={event => {
        //   if (event.key === 'Enter') {
        //     getParentCategories()
        //   }
        // }}
        />
      </div>
    </div>
  );
};
