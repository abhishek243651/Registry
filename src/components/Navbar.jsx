import React from "react";
import { Dropdown } from "react-bootstrap";
import { FaCogs, FaSignOutAlt, FaUser, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import { PiUserSwitchLight } from "react-icons/pi";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  async function handleLogout() {
    await logout();
  }

  const routeTitleMap = {
    "/dashboard/users": "Users",
    "/dashboard/create-user": "Add Users",
    "/users/edit": "Edit User",
    "/dashboard": "Dashboard",
  };

  const title = routeTitleMap[pathname] || "Dashboard";
  return (
    <nav className="navbar navbar-light bg-white border-bottom px-3 d-flex justify-content-between align-items-center">
      <h4 className="m-0 fw-semibold text-dark">{title}</h4>
      <div className="ms-auto">
        <Dropdown align="end">
          <Dropdown.Toggle
            variant="light"
            id="dropdown-nav"
            className="d-flex align-items-center gap-2 border-0 bg-transparent shadow-none"
          >
            <div
              className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center"
              style={{
                width: "36px",
                height: "36px",
                fontWeight: "bold",
                fontSize: "1rem",
              }}
            >
              {user?.email?.charAt(0).toUpperCase() || "A"}
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Header className="d-flex align-items-center gap-2 px-3 py-2 text-muted fw-semibold">
              <PiUserSwitchLight size={18} />
              <span
                className="text-truncate"
                style={{
                  maxWidth: "140px",
                  display: "inline-block",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
                title={user?.email}
              >
                {user?.email?.length > 24
                  ? user.email.slice(0, 21) + "..."
                  : user.email}
              </span>
            </Dropdown.Header>

            <Dropdown.Divider />

            <Dropdown.Item onClick={handleLogout}>
              <FaSignOutAlt className="me-2 text-danger" />
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </nav>
  );
};

export default Navbar;
