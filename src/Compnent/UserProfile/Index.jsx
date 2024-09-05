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
        style={{ marginTop: "90px", padding:"0px 20px" }}
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
        <div className="h-[300px] w-[350px] sidebar_profile">
          <Sidebar active={active} setActive={setActive} />
        </div>
        {/* ---- content  */}
        <div className="w-full user_profile_content " style={{border:"1px solid #30404D", padding:"10px" ,borderRadius:"10px", background:"#A7EAFF"}}>
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
