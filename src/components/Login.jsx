import { useFormik } from "formik";
import logo from "../assets/images/agristacklogo.png";
import { loginSchema } from "../schema/LoginSchema";
import axios from "../apis";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { loginUser } from "../apis/auth";
const Login = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const response = await loginUser(values);
        console.log("RESPONSE", response.data.level);
        if (response?.status === true) {
          toast.success(response?.message);
          const responseData = {
            email: response?.data?.email,
            role: response?.data?.role,
            username: response?.data?.username,
            level: response?.data?.level,
          };
          login(response?.data?.access_token, responseData);
          setTimeout(() => {
            navigate("/dashboard/users");
          }, 700);
        }
      } catch (error) {
        console.log("Error while login", error);
        const backendMessage =
          error?.response?.data?.message || error.message || "Login failed";

        toast.error(backendMessage);
      } finally {
        setSubmitting(false);
      }
    },
  });
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div
        className="card shadow-lg p-4"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-center">
            <img
              src={logo}
              alt="Logo"
              style={{
                maxWidth: "200px",
                transition: "width 0.3s",
                objectFit: "contain",
              }}
            />
          </div>
          <h3 className="card-title text-center text-success ">Login</h3>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label fw-semibold">
                Username
              </label>
              <input
                name="username"
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter your username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                required
              />
              {formik.touched.username && formik.errors.username && (
                <div className="text-danger">{formik.errors.username}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-semibold">
                Password
              </label>
              <input
                name="password"
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-danger">{formik.errors.password}</div>
              )}
            </div>
            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-success"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? "Submitting..." : "Login"}
              </button>
            </div>
          </form>
          {/* <p
            className="mt-3 text-center text-muted"
            style={{ fontSize: "0.9rem" }}
          >
            Don't have an account? <a href="/register">Register</a>
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
