import axios from "axios";
import { urlApiChat } from "./urlApi";
export const fetchDataChat = async (setDataChat, userId, setRender) => {
  try {
    const res = await axios.get(
      `${urlApiChat}/api/chatBox?senderId=${userId}&receiverId=2`
    );
    setDataChat(res.data);
    setRender(true);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
