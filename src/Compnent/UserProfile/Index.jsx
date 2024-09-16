import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import UserDashboard from "./Components/UserDashboard/UserDashboard";
import UserOrders from "./Components/Orders/UserOrders";
import UserAddres from "./Components/Address/UserAddres";
import AccountDetail from "./Components/AccountDetail/AccountDetail";
import "./Index.css";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import ProfileAuth from "../../Hooks/ProfileAuth";

const Index = () => {
  const [active, setActive] = useState(1);

  return (
    <ProfileAuth>
      <div
        className="w-full relative parent  flex justify-start place-items-start gap-2 my-3  "
        style={{ marginTop: "90px", padding:"0px  20px 0px 2px" }}
      >
        <div className="arrow absolute top-[-10px] left-1">
          {active !== 1 && (
            <FaArrowLeft
              className="text-[23px] my-2 cursor-pointer"
              onClick={() => setActive(1)}
            />
          )}
        </div>
        {/* ---- sidebar  */}
        <div className=" w-[350px] sidebar_profile" style={{height: "calc(100vh - 75px)"}}>
          <Sidebar active={active} setActive={setActive} />
        </div>
        {/* ---- content  */}
        <div className="w-full height-100vh user_profile_content user-profile-style" >
          {active === 1 && (
            <UserDashboard active={active} setActive={setActive} />
          )}
          {active === 2 && <UserOrders />}
          {active === 3 && <UserAddres />}
          {active === 4 && <AccountDetail />}
        </div>
      </div>
    </ProfileAuth>
  );
};

export default Index;
