import axios from "./index";

export async function loginUser(users) {
  try {
    const response = await axios.post("/login", users);
    return response.data;
  } catch (error) {
    console.log("Error while creating", error);
    throw error;
  }
}
