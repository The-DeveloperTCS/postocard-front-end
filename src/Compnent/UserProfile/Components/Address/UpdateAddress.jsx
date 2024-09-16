import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getuseraddress,
  updateuseraddress,
} from "../../../../Redux/Action/UserAction";
import Loading from "../../../../Layout/Loading/Loading";

const UpdateAddress = ({ isEdit, id = 1 }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);
  const user = useSelector((state) => state.user.user);
  const userAddress = useSelector((state) => state.user.userAddress);
  const [filtertheaddress, setFiltertheaddres] = useState([]);

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

  const UpdateAddress = async () => {
    await dispatch(updateuseraddress(address, id));
    dispatch(getuseraddress());
  };

  useEffect(() => {
    dispatch(getuseraddress());
  }, []);

  useEffect(() => {
    const filterAddress = userAddress?.filter((item) => item.id === id);
    setFiltertheaddres(filterAddress);
  }, [id]);
  useEffect(() => {
    if (filtertheaddress.length > 0) {
      const addressDetail = filtertheaddress[0]; // Access the first (and only) item in the filtered array
      setAddress(addressDetail)
    }
  }, [filtertheaddress]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="">
            <div className="my-2">
              <label
                htmlFor=""
                className="block my-1 px-1 text-[15px] font-bold"
              >
                FullName
              </label>
              <input
                type="text"
                required
                value={address.full_name}
                onChange={(e) => setAddress({ ...address, full_name: e.target.value })}
                className="w-full outline-none py-2 px-2 text-[16px] border-[1px] border-[#80808046]"
              />
            </div>
            <div className="my-3 ">
              <label
                htmlFor=""
                className="block my-1 px-1 text-[18px] font-bold"
              >
                Address Name
              </label>
              <input
                type="text"
                required
                value={address.address_name}
                onChange={(e) => setAddress({ ...address, address_name: e.target.value })}
                className="w-full outline-none py-2 px-2 text-[16px] border-[1px] border-[#80808046]"
              />
            </div>

            <div className="my-2">
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

            <div className="my-2">
              <label
                htmlFor=""
                className="block my-1 px-1 text-[15px] font-bold"
              >
                Street Address
              </label>
              <input
                type="text"
                required
                value={address.street_address}
                onChange={(e) => setAddress({ ...address, street_address: e.target.value })}
                className="w-full outline-none py-2 px-2 text-[16px] border-[1px] border-[#80808046]"
              />
            </div>



            <div className="my-2">
              <label
                htmlFor=""
                className="block my-1 px-1 text-[15px] font-bold"
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
            <div className="my-2">
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


            <div className="my-2">
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
            <div className="my-2">
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
            <div className="my-2">
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
          <button
            className="w-full bg-[#F49E3F] py-2 px-2 my-3  rounded-sm text-white"
            onClick={UpdateAddress}
          >
            Update Address
          </button>
        </>
      )}
    </>
  );
};

export default UpdateAddress;
