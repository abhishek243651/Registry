import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { getValidationSchema } from "../schema/AddUsersSchema";
import { useNavigate } from "react-router-dom";
import axios from "../apis";
import toast from "react-hot-toast";
import { STATES } from "../utils/constants";
import { createUser } from "../apis/users";
import { useAuth } from "../hooks/useAuth";
import { getRegistries, getRoles } from "../apis/constant";
import { confirmAlert, errorAlert, successAlert } from "../utils/swal";

const AddUsers = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [roles, setRoles] = useState([]);
  const [registries, setRegistries] = useState([]);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password_hash: "",
      first_name: "",
      last_name: "",
      role_id: "",
      is_active: true,
      department: "",
      level: user?.role === "super_admin" ? "centre" : "",
      state: "",
      registry: "",
    },

    // validationSchema,
    validationSchema: getValidationSchema(user),
    // onSubmit: async (values, { resetForm, setSubmitting }) => {
    //   try {
    //     console.log("VALUES", values);
    //     const response = await createUser(values, token);
    //     console.log("RESPONSE", response);
    //     if (response.success === true) {
    //       resetForm();
    //       navigate("/dashboard/users");
    //     }
    //   } catch (error) {
    //     console.log(error);
    // const backendMessage =
    //   error?.response?.data?.message ||
    //   error.message ||
    //   "resource creation failed!";

    // toast.error(backendMessage);
    //   }
    // },

    // onSubmit: async (values, { resetForm, setSubmitting }) => {
    //   try {
    //     const result = await Swal.fire({
    //       title: "Are you sure?",
    //       text: "Do you really want to create this user?",
    //       icon: "warning",
    //       showCancelButton: true,
    //       confirmButtonColor: "#198754", // Bootstrap success color
    //       cancelButtonColor: "#d33",
    //       confirmButtonText: "Yes, create",
    //     });

    //     if (result.isConfirmed) {
    //       console.log("VALUES", values);
    //       const response = await createUser(values, token);
    //       console.log("RESPONSE", response);

    //       if (response.success === true) {
    //         Swal.fire("Success", "User created successfully", "success");
    //         resetForm();
    //         navigate("/dashboard/users");
    //       }
    //     }
    //   } catch (error) {
    //     console.log(error);
    //     const backendMessage =
    //       error?.response?.data?.message ||
    //       error.message ||
    //       "resource creation failed!";

    //     toast.error(backendMessage);
    //     Swal.fire("Error", backendMessage, "error");
    //   } finally {
    //     setSubmitting(false);
    //   }
    // },

    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const result = await confirmAlert({
          title: "Create user?",
          text: "Are you sure you want to create this user?",
          confirmButtonText: "Yes, create",
        });

        if (result.isConfirmed) {
          const response = await createUser(values, token);
          if (response.success) {
            await successAlert("User Created", "user created successfully.");
            resetForm();
            navigate("/dashboard/users");
          }
        }
      } catch (error) {
        console.log(error);
        const backendMessage =
          error?.response?.data?.message ||
          error.message ||
          "resource creation failed!";
        errorAlert("Failed", backendMessage);
      } finally {
        setSubmitting(false);
      }
    },
  });
  console.log("Formik errors →", formik.errors);
  console.log("Formik values →", formik.values);
  console.log("Formik isValid →", formik.isValid);
  console.log("Formik isSubmitting →", formik.isSubmitting);

  const fetchRoles = async () => {
    try {
      const response = await getRoles();
      setRoles(response?.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchRegistries = async () => {
    try {
      const response = await getRegistries();
      console.log("RESG", response);
      setRegistries(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRoles();
    fetchRegistries();
  }, []);

  useEffect(() => {
    if (user?.role === "super_admin") {
      formik.setFieldValue("level", "centre");
    }

    const shouldHideState =
      user?.role === "super_admin" ||
      (user?.role === "admin" && user?.level === "centre");

    if (shouldHideState) {
      formik.setFieldValue("state", "");
    }
  }, [user?.role, user?.level]);

  return (
    <div className="p-4">
      <form onSubmit={formik.handleSubmit}>
        <div className="row">
          <div className="mb-3 col-12 col-md-4">
            <label className="form-label fw-semibold">
              Username <span className="text-danger"> *</span> :
            </label>
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Enter username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username && (
              <div className="text-danger">{formik.errors.username}</div>
            )}
          </div>
          <div className="mb-3 col-12 col-md-4">
            <label className="form-label fw-semibold">
              Email <span className="text-danger"> *</span> :
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-danger">{formik.errors.email}</div>
            )}
          </div>
          <div className="mb-3 col-12 col-md-4">
            <label className="form-label fw-semibold">
              Password <span className="text-danger"> *</span> :
            </label>
            <input
              type="password"
              name="password_hash"
              className="form-control"
              placeholder="Enter password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password_hash}
            />
            {formik.touched.password_hash && formik.errors.password_hash && (
              <div className="text-danger">{formik.errors.password_hash}</div>
            )}
          </div>
          <div className="mb-3 col-12 col-md-4">
            <label className="form-label fw-semibold">
              First Name <span className="text-danger"> *</span> :
            </label>
            <input
              type="text"
              name="first_name"
              className="form-control"
              placeholder="Enter first name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.first_name}
            />
            {formik.touched.first_name && formik.errors.first_name && (
              <div className="text-danger">{formik.errors.first_name}</div>
            )}
          </div>

          <div className="mb-3 col-12 col-md-4">
            <label className="form-label fw-semibold">
              Last Name <span className="text-danger"> *</span> :
            </label>
            <input
              type="text"
              name="last_name"
              className="form-control"
              placeholder="Enter last name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.last_name}
            />
            {formik.touched.last_name && formik.errors.last_name && (
              <div className="text-danger">{formik.errors.last_name}</div>
            )}
          </div>

          <div className="mb-3 col-12 col-md-4">
            <label className="form-label fw-semibold">
              Role <span className="text-danger"> *</span> :
            </label>
            <select
              name="role_id"
              className="form-select"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.role_id}
            >
              <option value={""}>Select Role</option>
              {roles.length > 0 &&
                roles.map((item) => (
                  <option key={item?.role_id} value={item?.role_id}>
                    {item?.role}
                  </option>
                ))}
            </select>
            {formik.touched.role_id && formik.errors.role_id && (
              <div className="text-danger">{formik.errors.role_id}</div>
            )}
          </div>

          <div className="mb-3 col-12 col-md-4">
            <label className="form-label fw-semibold">
              level <span className="text-danger"> *</span> :
            </label>
            <select
              name="level"
              className="form-select"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.level}
              disabled={user?.role === "super_admin"}
            >
              <option value="">Select Level</option>

              {user?.role === "super_admin" ? (
                <option value="centre">center</option>
              ) : (
                <>
                  <option value="centre">center</option>
                  <option value="state">state</option>
                </>
              )}
            </select>

            {formik.touched.level && formik.errors.level && (
              <div className="text-danger">{formik.errors.level}</div>
            )}
          </div>

          {/* <div className="mb-3 col-12 col-md-4">
            <label className="form-label fw-semibold">
              Select State <span className="text-danger"> *</span> :
            </label>
            <select
              name="state"
              className="form-select"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.state}
            >
              <option value={""}>Select State</option>
              {STATES.map((state, i) => (
                <option key={state.value + i} value={state.value}>
                  {state.label}
                </option>
              ))}
            </select>
            {formik.touched.state && formik.errors.state && (
              <div className="text-danger">{formik.errors.state}</div>
            )}
          </div> */}

          {/* {!(
            user?.role === "super_admin" ||
            (user?.role === "admin" && user?.level === "centre")
          ) && (
            <div className="mb-3 col-12 col-md-4">
              <label className="form-label fw-semibold">
                Select State <span className="text-danger"> *</span> :
              </label>
              <select
                name="state"
                className="form-select"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.state}
              >
                <option value={""}>Select State</option>
                {STATES.map((state, i) => (
                  <option key={state.value + i} value={state.value}>
                    {state.label}
                  </option>
                ))}
              </select>
              {formik.touched.state && formik.errors.state && (
                <div className="text-danger">{formik.errors.state}</div>
              )}
            </div>
          )} */}

          {!(
            user?.role === "super_admin" ||
            (user?.role === "admin" && user?.level === "centre")
          ) || formik.values.level === "state" ? (
            <div className="mb-3 col-12 col-md-4">
              <label className="form-label fw-semibold">
                Select State <span className="text-danger"> *</span> :
              </label>
              <select
                name="state"
                className="form-select"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.state}
              >
                <option value={""}>Select State</option>
                {STATES.map((state, i) => (
                  <option key={state.value + i} value={state.value}>
                    {state.label}
                  </option>
                ))}
              </select>
              {formik.touched.state && formik.errors.state && (
                <div className="text-danger">{formik.errors.state}</div>
              )}
            </div>
          ) : null}

          {user?.role !== "super_admin" && (
            <div className="mb-3 col-12 col-md-4">
              <label className="form-label fw-semibold">
                Select Registry <span className="text-danger"> *</span> :
              </label>
              <select
                name="registry"
                className="form-select"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.registry}
              >
                <option value={""}>Select Registry</option>
                {registries.map((item, i) => (
                  <option key={item?.registry_id} value={item?.registry_id}>
                    {item?.registry_name}
                  </option>
                ))}
              </select>
              {formik.touched.registry && formik.errors.registry && (
                <div className="text-danger">{formik.errors.registry}</div>
              )}
            </div>
          )}

          {/* <div className="mb-3 col-12 col-md-4">
            <label className="form-label fw-semibold">
              Department <span className="text-danger"> *</span> :
            </label>
            <input
              type="text"
              name="department"
              className="form-control"
              placeholder="Enter department"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.department}
            />
            {formik.touched.department && formik.errors.department && (
              <div className="text-danger">{formik.errors.department}</div>
            )}
          </div> */}

          {/* <div className="mb-3 col-12 col-md-4">
            <label className="form-label fw-semibold">Active</label>
            <div className="form-check">
              <input
                type="checkbox"
                name="is_active"
                id="is_active"
                className="form-check-input"
                checked={formik.values.is_active}
                onChange={() =>
                  formik.setFieldValue("is_active", !formik.values.is_active)
                }
              />
              <label htmlFor="is_active" className="form-check-label ms-2">
                {formik.values.is_active ? "Active" : "Inactive"}
              </label>
            </div>
            {formik.touched.is_active && formik.errors.is_active && (
              <div className="text-danger">{formik.errors.is_active}</div>
            )}
          </div> */}
        </div>

        <div className="d-flex justify-content-between mt-4">
          <button
            type="button"
            className="btn btn-outline-success"
            onClick={() => navigate(-1)}
          >
            &lt; Back
          </button>

          <button
            type="submit"
            className="btn btn-success"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUsers;
