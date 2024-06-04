import React from "react";
import ArtistComponent from "../Components/CreateArtist/ArtistComponent";
import Sidebar from "../Layout/Sidebar";
import Navebar from "../Layout/Navebar";

const CreateArtist = () => {
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
          <ArtistComponent />
        </div>
      </div>
    </div>
  );
};

export default CreateArtist;
