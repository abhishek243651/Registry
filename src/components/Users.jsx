import React, { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import { columnName, arrayIndex } from "../utils/constants";
import { CiTrash } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "../apis";
import { useAuth } from "../hooks/useAuth";
import { getUsers } from "../apis/users";

function Users() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [searchtxt, setSearchtxt] = useState("");
  const [userData, setUserData] = useState([]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await getUsers(token);
      setUserData(res?.data || []);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, [token]);

  const filteredData = userData.filter((user) =>
    user?.firstName?.toLowerCase()?.includes(searchtxt?.toLowerCase())
  );

  const handleChange = (e) => {
    setSearchtxt(e.target.value);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;
    try {
      const res = await fetch(`https://dummyjson.com/users/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        const updatedUser = userData.filter((user) => user.id !== id);
        setUserData(updatedUser);
      } else {
        console.error("Failed to delete user from server");
      }
    } catch (error) {
      console.log("Someting went wrong", error);
    }
  };

  return (
    <div className="px-2 py-2">
      <div className="d-flex flex-wrap gap-2 justify-content-end align-items-center">
        {/* <div>
          <Dropdown />
        </div>
        <div>
          <Dropdown />
        </div>
        <div>
          <Dropdown />
        </div> */}
        {/* <div>
          <div>
            <IoSearchOutline />
          </div>
          <div>
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              style={{ minWidth: "200px" }}
              onChange={(e) => handleChange(e)}
              value={searchtxt}
            />
          </div>
        </div> */}
        <div>
          <button
            type="button"
            className="btn btn-outline-success"
            style={{ minWidth: "200px" }}
            onClick={() => navigate("/dashboard/create-user")}
          >
            <IoIosAddCircleOutline /> Add User
          </button>
        </div>
      </div>
      <div className="mt-3">
        <div className="table-responsive">
          {loading ? (
            // ✅ Bootstrap Spinner
            <div className="d-flex justify-content-center align-items-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <table className="table w-100 text-center align-middle table-bordered table-striped table-hover">
              <thead>
                <tr>
                  {columnName.map((item, index) => (
                    <th
                      key={index}
                      scope="col"
                      style={{ width: `${100 / columnName.length}%` }}
                    >
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {userData?.map((item, index) => (
                  <tr key={item?.user_details_id}>
                    <td>{index + 1}</td>
                    <td>
                      {item.first_name} {item.last_name}
                    </td>
                    <td>{item.role}</td>
                    <td>{item.is_active ? "Active" : "Inactive"}</td>
                    <td>
                      <span
                        className="me-2 text-danger"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDelete(item.id)}
                      >
                        <CiTrash />
                      </span>
                      <span
                        className="text-primary"
                        style={{ cursor: "pointer" }}
                      >
                        <FaRegEdit />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Users;
