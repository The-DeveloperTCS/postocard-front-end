import React from "react";
import '../Style/CommonStyle.css'
import Sidebar from "../Layout/Sidebar";
import Navebar from "../Layout/Navebar";
import EditArtistComponent from "../Components/CreateArtist/EditArtistComponent";

const EditPacage = () => {
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
          <EditArtistComponent />
        </div>
      </div>
    </div>
  );
};

export default EditPacage;
