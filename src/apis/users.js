import axios from "./index.js";

export async function createUser(users, token) {
  try {
    const response = await axios.post("/admin", users, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error while creating", error);
    throw error;
  }
}
export async function getUsers(token) {
  try {
    const response = await axios.get("/getAdmins", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error while creating", error);
    throw error;
  }
}
export async function getUserById(id, token) {
  try {
    const response = await axios.get(`/getAdminById/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error while creating", error);
    throw error;
  }
}
export async function updateUser(id, data, token) {
  try {
    const response = await axios.put(`/updateAdminById/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error while creating", error);
    throw error;
  }
}
