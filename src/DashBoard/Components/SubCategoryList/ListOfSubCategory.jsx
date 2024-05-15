import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getallParentCategory,
  ParentCategoryDeleteFunc
} from "../../../Redux/Action/CategoryAction";
import Loading from "../../../Layout/Loading/Loading";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";

const ListOfSubCategory = ({ }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.category.isLoading);
  const isLoadingp = useSelector((state) => state.product.isLoading);
  const allParentCategory = useSelector((state) => state.category.allParentCategory)
  const [categoryName, setCategoryName] = useState("");
  const [selectedItem, setSelectedItem] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    getParentCategories()
  }, [])

  const getParentCategories = () => {
    dispatch(getallParentCategory(categoryName));
  }


  const onDelete = (item) => {
    setShowConfirm(true)
    setSelectedItem(item)
  }

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

            <SweetAlert
              showCancel
              show={showConfirm}
              confirmBtnText="Yes"
              cancelBtnText="No"
              cancelBtnBsStyle="default"
              title="Are you sure?"
              confirmBtnCssClass="sweet-alert-confirm-button"
              cancelBtnCssClass="sweet-alert-cancle-button"
              warning
              confirmBtnBsStyle="danger"
              focusCancelBtn
              onConfirm={() => {
                setShowConfirm(!showConfirm);
                dispatch(ParentCategoryDeleteFunc(selectedItem))

              }}
              onCancel={() => {
                setShowConfirm(!showConfirm);
              }}
            >
              You want to delete <b> parent category
              </b>
            </SweetAlert>
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

                      <h2>
                        <p className="flex justify-start place-items-center gap-3 relative">
                          <Link to={`/admin/parent-category/${item.id}`} >
                            <FaRegEdit
                              className="text-[green] cursor-pointer text-[20px]"
                            />
                          </Link>
                          <AiOutlineDelete className="text-[23px] cursor-pointer text-[red]" onClick={() => onDelete(item)} />
                        </p>
                      </h2>
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

export default ListOfSubCategory;


// ========================= haeder
const FilterHeader = ({ categoryName, setCategoryName, getParentCategories }) => {
  return (
    <div className="filter_header flex justify-between place-items-center">
      {/* ------------- name  */}
      <div className="filter_inputs flex justify-between place-items-center gap-2">
        <input
          type="text"
          placeholder="Search..."
          value={categoryName}
          onChange={(e) =>
            setCategoryName(e.target.value)
          }
          onKeyPress={(e) => {
            console.log(e.key)
            if (e.key === 'Enter') {
              getParentCategories(categoryName)
            }
          }}
        />
      </div>
    </div>
  );
};
