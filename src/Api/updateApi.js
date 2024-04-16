import axios from "axios";
import Swal from "sweetalert2";

export const updateApi = async (url, newData, setUpdate) => {
  try {
    const response = await axios.put(`${url}`, newData);
    const statusData = await response.data.status;
    if (statusData === "Success") {
      Swal.fire({
        title: "Thành công",
        text: "Cập nhật dữ liệu thành công.",
        icon: "success",
      });
      setUpdate(true);
    } else {
      return;
    }
  } catch (error) {
    console.log(error);
  }
};

