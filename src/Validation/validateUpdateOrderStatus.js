import * as yup from "yup";
export const validateUpdateOrderStatus = yup.object({
  updateOrderStatus: yup.object().required("Vui lòng chọn trạng thái đơn hàng"),
});
