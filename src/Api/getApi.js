import axios from "axios";
export const getApi = async (accessToken, url) => {
  try {
    const token = accessToken;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(url, {
      headers,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
