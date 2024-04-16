import axios from "axios";
import { urlApi } from "./urlApi";

export const getData = async (accessToken, setUser) => {
  try {
    const token = accessToken;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(`${urlApi}/home`, {
      headers,
    });
    setUser(response.data.user);
  } catch (error) {
    console.log(error);
  }
};

export const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${urlApi}/api/users/${userId}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
