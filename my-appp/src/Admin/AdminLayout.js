import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="container-fluid">
      {/* Toggle Button for Small Screens */}
      <div className="d-md-none p-2 bg-light">
        <button
          className="btn btn-warning"
          onClick={() => setShowSidebar(true)}
        >
          <i className="fas fa-bars"></i> Menu
        </button>
      </div>

      <div className="row">
        {/* Sidebar for md and up */}
        <div className="col-md-3 d-none d-md-block">
          <Sidebar />
        </div>

        {/* Offcanvas Sidebar for small screens */}
        <div className="offcanvas offcanvas-start show d-md-none" tabIndex="-1" style={{ visibility: showSidebar ? "visible" : "hidden" }}>
          <div className="offcanvas-header">
            <h5 className="offcanvas-title">Menu</h5>
            <button type="button" className="btn-close" onClick={() => setShowSidebar(false)}></button>
          </div>
          <div className="offcanvas-body">
            <Sidebar />
          </div>
        </div>

        {/* Main Content */}
        <div className="col-md-9 p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
