import axios from "axios";
import Swal from "sweetalert2";

export const deleteApi = async (url, setRemove) => {
  try {
    Swal.fire({
      title: "Bạn muốn xóa dữ liệu?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axios.delete(`${url}`);
        const statusData = await response.data.status;
        if (statusData === "Success") {
          Swal.fire({
            title: "Thành công",
            text: "Xóa dữ liệu thành công",
            icon: "success",
          });
          setRemove(true);
        } else {
          Swal.fire({
            icon: "error",
            title: "Lỗi rồi !!",
          });
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
};
