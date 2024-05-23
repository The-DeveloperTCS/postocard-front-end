import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getallCategory,
  categoryDeleteFunc
} from "../../../Redux/Action/CategoryAction";
import Loading from "../../../Layout/Loading/Loading";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";

const ListOfCategory = ({ }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.category.isLoading);
  const isLoadingp = useSelector((state) => state.product.isLoading);
  const allcategory = useSelector((state) => state.category.allcategory)
  const [categoryName, setCategoryName] = useState("");
  const [selectedItem, setSelectedItem] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    getCategories()
  }, [])

  const getCategories = () => {
    dispatch(getallCategory(categoryName));
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
            getCategories={getCategories}
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
                dispatch(categoryDeleteFunc(selectedItem.id))

              }}
              onCancel={() => {
                setShowConfirm(!showConfirm);
              }}
            >
              You want to delete <b> category
              </b>
            </SweetAlert>
            <div
              className={`product_list_header grid grid-cols-4 font-bold py-3 border-b-2 border-b-[gray]`}
            >
              <h2>Sr. No</h2>
              <h2>Parent Category</h2>
              <h2>Category Name</h2>
              <h2>Action</h2>
            </div>
            {/* ---------- category  */}
            <div className="list_main_box">
              {allcategory &&
                allcategory?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={`product_list_main grid grid-cols-4 py-3 border-b-2`}
                    >
                      <p>{index + 1}</p>
                      <h2>
                        {item.parent_category?.name}
                      </h2>
                      <h2>
                        {item.CategoryName}
                      </h2>
                      <h2>
                        <p className="flex justify-start place-items-center gap-3 relative">
                          <Link to={`/admin/category/${item.id}`} >
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

export default ListOfCategory;


// ========================= haeder
const FilterHeader = ({ categoryName, setCategoryName, getCategories }) => {
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
            if (e.key === 'Enter') {
              getCategories(categoryName)
            }
          }}
        />
      </div>
    </div>
  );
};