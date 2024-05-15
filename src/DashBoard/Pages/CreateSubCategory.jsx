import React from "react";
import SubCategoryComponent from "../Components/CreateSubCategory/SubCategoryComponent";
import Sidebar from "../Layout/Sidebar";
import Navebar from "../Layout/Navebar";

const CreatePackage = () => {
  return (
    <div className="dashboard_common">
      {/* ==================== sidebard dashboard  */}
      <div className="dashboard_sidebar">
        <Sidebar />
      </div>
      {/* ======================= navebar and content  */}
      <div className="navebar_content_dashbaord">
        {/* ============== naviabr  */}
        <Navebar />
        {/* =================== content  */}
        <div className="content_dashboard">
          <SubCategoryComponent />
        </div>
      </div>
    </div>
  );
};

export default CreatePackage;
