import * as yup from "yup";
export const validatePayment = yup.object({
  name: yup.string().required("Vui lòng nhập họ và tên"),
  email: yup
    .string()
    .email("Vui lòng nhập đúng địa chỉ email")
    .required("Vui lòng nhập email"),
  numberPhone: yup.string().required("Vui lòng nhập số điện thoại"),
  address: yup.string().required("Vui lòng nhập địa chỉ"),
});
