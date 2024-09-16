import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateAddress,
  deleteAddress,
  getuseraddress,
} from "../../../../Redux/Action/UserAction";
import { LuFolderSymlink } from "react-icons/lu";
import { MdKeyboardBackspace } from "react-icons/md";
import UpdateAddress from "./UpdateAddress";
import { RxCross1 } from "react-icons/rx";
import Loading from "../../../../Layout/Loading/Loading";
import { MdDeleteOutline } from "react-icons/md";
import "../../Sidebar/style/stylishSidebar.css";

const UserAddres = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  // --- state

  const [activeaddress, setActiveAddress] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [showmoadl, setShowMoadl] = useState(false);

  // ==============================
  const [address, setAddress] = useState({
    full_name: "",
    address_name: "",
    phone: "",

    street_address: "",
    town: "",

    city: "",
    postal_code: "",
    state: "",
    country: "",
    user_id: user?.id,
  });
  // ---
  const [id, setId] = useState(null);

  const createuseraddress = async () => {
    await dispatch(CreateAddress(address));
    dispatch(getuseraddress());
    setShowMoadl(false);
  };
  const loading = useSelector((state) => state.user.loading);
  const userAddress = useSelector((state) => state.user.userAddress);
  useEffect(() => {
    dispatch(getuseraddress());
  }, []);
  return (
    <div className="UserAddres">
      <h2 className="text-[35px] font-medium ">
        Address <br />
        Billing address
      </h2>
      {/* <h2 className="text-[20px] font-medium">Billing address</h2> */}

      {/* ----- address  */}
      {activeaddress === 1 && (
        <>
          <p onClick={() => setActiveAddress(0)} className="my-1">
            <MdKeyboardBackspace className="text-[25px]  cursor-pointer" />
          </p>
          <h2
            className="text-[16px] text-[#0FAFE9] font-medium mb-2 cursor-pointer"
            onClick={() => setIsEdit(!isEdit)}
          >
            {!isEdit ? "Edit" : "ReadOnly"}
          </h2>
          <UpdateAddress isEdit={isEdit} id={id} />
        </>
      )}
      {/* ====================  */}
      {activeaddress === 0 &&
        (loading ? (
          <Loading />
        ) : (
          <div className="">
            {/* ------------------  */}
            <div className="">
              {/* --- head  */}
              <div
                className="bg-[#FCC79F] mt-2 w-full flex justify-between place-items-center px-2 py-3 rounded-sm"
                style={{ padding: "15px 10px", borderRadius: "10px" }}
              >
                <p className="text-white text-[20px] font-bold">
                  Name of Address
                </p>
                <p className="text-white text-[20px] font-bold">Action</p>
              </div>
              {/* ---- body  */}
              <div>
                {userAddress?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={`flex justify-between place-items-center  mb-1 py-3 px-2 border-[1px] border-[#80808085] ${index % 2 !== 0 ? "bg-[#FCE4CA]" : "bg-[white]"
                        }`}
                    >
                      <p className="text-[20px]">{item?.address_name}</p>
                      <p className="flex justify-center place-items-center gap-2">
                        <LuFolderSymlink
                          className="text-[23px] cursor-pointer"
                          onClick={() => {
                            setActiveAddress(1);
                            setId(item.id);
                          }}
                        />
                        <MdDeleteOutline
                          className="text-[25px] cursor-pointer text-[red]"
                          onClick={() => {
                            dispatch(deleteAddress(item.id));
                            dispatch(getuseraddress());
                          }}
                        />
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      <button
        className=" bg-[#FCC79F] py-2 px-2 my-3 rounded-sm text-whit"
        onClick={() => setShowMoadl(true)}
        style={{
          padding: "15px 10px",
          color: "#30404D",
          fontFamily: "Poppins",
          fontWeight: "500",
          borderRadius: "10px",
        }}
      >
        Create New Address
      </button>

      {/* ==================== create new address  */}
      {showmoadl && (
        <div >
          <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 " style={{zIndex:"99999"}}>
            <div
              className="max-h-full relative w-full max-w-3xl overflow-y-auto sm:rounded-2xl bg-white"
              style={{ padding: "0px 20px" }}
            >
              <div className="w-full">
                <RxCross1
                  className="absolute top-3 right-3 text-[23px] cursor-pointer "
                  onClick={() => setShowMoadl(false)}
                />

                <div className="m-1 my-20 max-w-[700px] mx-auto">
                  <div className="">
                    <div className="flex flex-wrap -mx-2">
                      <div className="w-full sm:w-1/2 px-2 my-2 label-input-styling">
                        <label
                          htmlFor=""
                          className="block my-1 px-1 text-[16px] font-bold"
                          style={{
                            color: "#30404D",
                          }}
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          value={address.full_name}
                          onChange={(e) => setAddress({ ...address, full_name: e.target.value })}
                          className="w-full outline-none py-2 px-2 text-[16px] border-[1px] border-[#80808046]"
                        />
                      </div>
                      <div className="w-full sm:w-1/2 px-2 my-2 label-input-styling">
                        <label
                          htmlFor=""
                          className="block my-1 px-1 text-[15px] font-bold"
                        >
                          Address Name:
                        </label>
                        <input
                          type="text"
                          required
                          value={address.address_name}
                          onChange={(e) => setAddress({ ...address, address_name: e.target.value })}
                          className="w-full outline-none py-2 px-2 text-[16px] border-[1px] border-[#80808046]"
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-2">
                      <div className="w-full sm:w-1/2 px-2 my-2 label-input-styling">
                        <label
                          htmlFor=""
                          className="block my-1 px-1 text-[15px] font-bold"
                        >
                          Phone:
                        </label>
                        <input
                          type="number"
                          required
                          value={address.phone}
                          onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                          className="w-full outline-none py-2 px-2 text-[16px] border-[1px] border-[#80808046]"
                        />
                      </div>

                      <div className="w-full sm:w-1/2 px-2 my-2 label-input-styling">
                        <label
                          htmlFor=""
                          className="block my-1 px-1 text-[18px] font-bold"
                        >
                          Street Name
                        </label>
                        <input
                          type="text"
                          required
                          value={address.street_address}
                          onChange={(e) => setAddress({ ...address, street_address: e.target.value })}
                          className="w-full outline-none py-2 px-2 text-[16px] border-[1px] border-[#80808046]"
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-2">

                      <div className="w-full sm:w-1/2 px-2 my-2 label-input-styling">
                        <label
                          htmlFor=""
                          className="block my-1 px-1 text-[18px] font-bold"
                        >
                          Town
                        </label>
                        <input
                          type="text"
                          required
                          value={address.town}
                          onChange={(e) => setAddress({ ...address, town: e.target.value })}
                          className="w-full outline-none py-2 px-2 text-[16px] border-[1px] border-[#80808046]"
                        />
                      </div>
                      <div className="w-full sm:w-1/2 px-2 my-2 label-input-styling">
                        <label
                          htmlFor=""
                          className="block my-1 px-1 text-[15px] font-bold"
                        >
                          City
                        </label>
                        <input
                          type="text"
                          required
                          value={address.city}
                          onChange={(e) => setAddress({ ...address, city: e.target.value })}
                          className="w-full outline-none py-2 px-2 text-[16px] border-[1px] border-[#80808046]"
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-2">
                      <div className="w-full sm:w-1/2 px-2 my-2 label-input-styling">
                        <label
                          htmlFor=""
                          className="block my-1 px-1 text-[15px] font-bold"
                        >
                          Postal Code
                        </label>
                        <input
                          type="number"
                          required
                          value={address.postal_code}
                          onChange={(e) => setAddress({ ...address, postal_code: e.target.value })}
                          className="w-full outline-none py-2 px-2 text-[16px] border-[1px] border-[#80808046]"
                        />
                      </div>
                      <div className="w-full sm:w-1/2 px-2 my-2 label-input-styling">
                        <label
                          htmlFor=""
                          className="block my-1 px-1 text-[15px] font-bold"
                        >
                          State
                        </label>
                        <input
                          type="text"
                          required
                          value={address.state}
                          onChange={(e) => setAddress({ ...address, state: e.target.value })}
                          className="w-full outline-none py-2 px-2 text-[16px] border-[1px] border-[#80808046]"
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-2">
                      <div className="w-full sm:w-1/2 px-2 my-2 label-input-styling">
                        <label
                          htmlFor=""
                          className="block my-1 px-1 text-[15px] font-bold"
                        >
                          Country
                        </label>
                        <input
                          type="text"
                          required
                          value={address.country}
                          onChange={(e) => setAddress({ ...address, country: e.target.value })}
                          className="w-full outline-none py-2 px-2 text-[16px] border-[1px] border-[#80808046]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4" style={{ marginTop: "30px" }}>
                    <button
                      className="p-3 bg-[#30404D] rounded-md text-white w-full text-[18px]"
                      style={{
                        fontFamily: "Poppins",
                        textTransform: "uppercase",
                      }}
                      onClick={() => createuseraddress()}
                    >
                      Street Address
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    // ============================
  );
};

export default UserAddres;
