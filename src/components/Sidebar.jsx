import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import logo from "../assets/images/agristacklogo.png";
import { RxDashboard } from "react-icons/rx";

const Sidebar = ({ items }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div
      className={`bg-white text-dark p-3 d-flex flex-column border border-success`}
      style={{
        width: collapsed ? "70px" : "250px",
        minHeight: "100vh",
        transition: "width 0.3s",
      }}
    >
      <div
        className="d-flex align-items-center justify-content-center mb-3 "
        style={{
          height: "50px",
          borderBottom: "2px solid #28a745",
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{
            width: collapsed ? "30px" : "150px",
            height: "80px",
            transition: "width 0.3s",
            objectFit: "contain",
          }}
        />
      </div>
      <div className="d-flex justify-content-between align-items-center mb-2">
        {!collapsed && (
          <h5 className="d-flex align-items-center gap-2 mb-0 me-2">
            <RxDashboard />
            Dashboard
          </h5>
        )}
        <button
          className="btn btn-sm btn-outline-success"
          onClick={() => setCollapsed(!collapsed)}
        >
          <FaBars />
        </button>
      </div>

      <ul className="list-unstyled">
        {items.map((item, index) => (
          <li key={index} className="mb-2">
            <Link
              to={item.path}
              className={`text-decoration-none d-flex align-items-center w-100 rounded ${
                location.pathname === item.path
                  ? "text-white bg-success fw-bold"
                  : "text-dark"
              }`}
              style={{
                padding: collapsed ? "8px" : "8px 12px",
                justifyContent: collapsed ? "center" : "flex-start",
              }}
            >
              <span className={collapsed ? "" : "me-3"}>{item.icon}</span>
              {!collapsed && <span className="text-nowrap">{item.label}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
