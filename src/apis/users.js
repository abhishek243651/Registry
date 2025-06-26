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
