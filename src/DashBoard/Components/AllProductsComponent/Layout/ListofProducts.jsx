import React, { useEffect, useState } from "react";
import "../Styles/admin_ListofProducts.css";
import { FaRegEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getallproductforAdmin } from "../../../../Redux/Action/ProductAction";
import Loading from "../../../../Layout/Loading/Loading";
import { Link } from "react-router-dom";

const ListofProducts = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.category.isLoading);
  const isLoadingp = useSelector((state) => state.product.isLoading);
  const allProduct = useSelector((state) => state.product.allproductforAdmin);
  const [productName, setProductName] = useState("");


  useEffect(() => {
    dispatch(getallproductforAdmin(productName))
  }, [])

  return (
    <>
      {isLoading || isLoadingp ? (
        <Loading />
      ) : (
        <div className="admin_ListofProducts">
            <FilterHeader
              productName={productName}
              setProductName={setProductName}
              getallproductforAdmin={getallproductforAdmin}
            />
            <div className="list_product_admin">
            {/* <SweetAlert
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
            </SweetAlert> */}
            <div
              className={`product_list_header grid grid-cols-7 font-bold py-3 border-b-2 border-b-[gray]`}
            >
              <h2>Sr. No</h2>
              <h2>Image</h2>
              <h2>Price</h2>
              <h2>Artist</h2>
              <h2>Sub Category</h2>
              <h2>Status</h2>
              <h2>Action</h2>
            </div>
              {allProduct &&
                allProduct?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="product_list_main grid grid-cols-7 py-3 border-b-2 justify-center items-center"
                    >
                      <Link to={`/admin/products/view/${item.id}`}>
                        <h2 className="flex justify-start place-items-center gap-1 ">
                          <img
                            src={item?.File1}
                            alt=""
                            className="w-[50px] h-[50px] border-[1px] border-[gray] rounded-full"
                          />
                          {item?.ProductName}
                        </h2>
                      </Link>
                      <p>{item?.Price}$</p>
                      <p>{item?.artist?.name}</p>
                      <p>
                        {item?.IsActive === 1 ? (
                          <p className="text-[green]">Active</p>
                        ) : (
                          <p className="text-[red]">InActive</p>
                        )}
                      </p>
                      <p>{item?.sub_category_details?.SubCategoryName}</p>
                      <p className="flex justify-start place-items-center gap-3 relative">
                        <FaRegEdit
                          className="text-[green] cursor-pointer text-[20px]"
                        // onClick={() => editproduct(item.id)}
                        />
                        {/* <LuMoreVertical
                    className="text-[23px] cursor-pointer"
                    onClick={() => showproductmodal(index)}
                  /> */}
                        {/* {productStatus[index] && (
                    <div
                      className="absolute top-[30px] w-[100px] h-[35px] left-[-50px] py-1 px-1 rounded-sm bg-white z-10 border-[1px] border-[black]"
                      onClick={() => showproductmodal(index)}
                    >
                      <p className="cursor-pointer">Update Status</p>
                    </div>
                  )} */}
                      </p>
                    </div>
                  );
                })}
            </div>
        </div>)
      }
    </>
  );
};

export default ListofProducts;

// ========================= haeder
const FilterHeader = ({ productName, setProductName, getallproductforAdmin }) => {
  return (
    <div className="filter_header flex justify-between place-items-center">
      {/* ------------- name  */}
      <div className="filter_inputs flex justify-between place-items-center gap-2">
        <input
          type="text"
          placeholder="Search..."
          value={productName}
          onChange={(e) =>
            setProductName(e.target.value)
          }
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              getallproductforAdmin(productName)
            }
          }}
        />
      </div>
    </div>
  );
};