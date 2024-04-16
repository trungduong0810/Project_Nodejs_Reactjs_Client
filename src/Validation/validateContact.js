import * as yup from "yup";
export const validateContact = yup.object({
  name: yup.string().required("Vui lòng nhập họ và tên"),
  phone: yup.string().required("Vui lòng nhập số điện thoại"),
  email: yup.string().required("Vui lòng nhập email"),
  title: yup.string().required("Vui lòng nhập tiêu đề"),
  content: yup.string().required("Vui lòng nhập nội dung"),
});
