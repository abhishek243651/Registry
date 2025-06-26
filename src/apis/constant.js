import axios from ".";

export async function getRoles() {
  try {
    const response = await axios.get("/roles", {});
    return response.data;
  } catch (error) {
    console.log("Error while creating", error);
    throw error;
  }
}
export async function getRegistries() {
  try {
    const response = await axios.get("/getAllRegistry", {});
    return response.data;
  } catch (error) {
    console.log("Error while creating", error);
    throw error;
  }
}
