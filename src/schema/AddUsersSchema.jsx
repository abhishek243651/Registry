import * as Yup from "yup";
import { STATES } from "../utils/constants";
const VALID_LEVELS = ["center", "state"];
export const getValidationSchema = (user) =>
  Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password_hash: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    role_id: Yup.number().required("Role is required"),
    level: Yup.string()
      .required("Level is required")
      .oneOf(["centre", "state"], "Invalid role"),
    state: Yup.string()
      .nullable()
      .test("state-required", "State is required", function (value) {
        const { role_id, level } = this.parent;
        const isSuperAdmin = role_id === 1;
        const isAdminAtCenter = role_id === 2 && level === "centre";
        if (isSuperAdmin || isAdminAtCenter) return true;
        return Boolean(value);
      }),

    registry:
      user?.role !== "super_admin"
        ? Yup.string().required("Registry is required")
        : Yup.string().nullable(),

    is_active: Yup.boolean().required("Status is required"),
  });
