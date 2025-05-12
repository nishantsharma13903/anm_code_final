import React, { useState } from "react";
import Accessories from "./ShowAccessories";
import Sidebar from "./Sidebar";
// import Dashboard from "./Dashboard";
import "./Style/sidebar.css"; // Ensure CSS is imported
import ShowAccessories from "./ShowAccessories";

const AccessoriesPage2 = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="d-flex flex-column vh-100">
      {/* Mobile Top Navbar */}
      <nav className="navbar navbar-light bg-white border-bottom px-3 d-md-none">
        <button className="btn btn-outline-secondary" onClick={toggleSidebar}>
          <i className="fas fa-bars"></i>
        </button>
        <span className="navbar-brand mb-0 h1">Dashboard</span>
      </nav>

      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <div
          className={`sidebar-container bg-white border-end ${
            isSidebarOpen ? "mobile-sidebar-open" : ""
          }`}
        >
          <Sidebar onClose={() => setIsSidebarOpen(false)} />
        </div>

        {/* Overlay */}
        {isSidebarOpen && (
          <div
            className="mobile-overlay"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <div className="flex-grow-1 bg-light p-3">
          <ShowAccessories />
        </div>
      </div>
    </div>
  );
};

export default AccessoriesPage2;
