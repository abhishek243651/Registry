// src/utils/swal.js
import Swal from "sweetalert2";

// Success Alert
export const successAlert = (title = "Success", text = "", timer = 2000) => {
  return Swal.fire({
    icon: "success",
    title,
    text,
    timer,
    timerProgressBar: true,
    showConfirmButton: false,
  });
};

// Error Alert
export const errorAlert = (title = "Error", text = "") => {
  return Swal.fire({
    icon: "error",
    title,
    text,
    confirmButtonColor: "#d33",
  });
};

// Warning Alert
export const warningAlert = (title = "Warning", text = "") => {
  return Swal.fire({
    icon: "warning",
    title,
    text,
    confirmButtonColor: "#f0ad4e",
  });
};

// Info Alert
export const infoAlert = (title = "Info", text = "") => {
  return Swal.fire({
    icon: "info",
    title,
    text,
  });
};

// Confirmation Dialog
export const confirmAlert = ({
  title = "Are you sure?",
  text = "You won't be able to revert this!",
  confirmButtonText = "Yes, proceed",
  cancelButtonText = "Cancel",
  confirmButtonColor = "#198754",
  cancelButtonColor = "#d33",
  icon = "warning",
} = {}) => {
  return Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText,
    confirmButtonColor,
    cancelButtonColor,
  });
};

export const toastAlert = (icon = "success", title = "Done") => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    timer: 2000,
    timerProgressBar: true,
    showConfirmButton: false,
  });

  return Toast.fire({ icon, title });
};
