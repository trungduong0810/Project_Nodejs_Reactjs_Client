import * as yup from "yup";
export const validateSignUp = yup.object({
  username: yup.string().required("Vui lòng nhập tên"),
  email: yup
    .string()
    .email("Vui lòng nhập đúng định dạng email")
    .required("Vui lòng nhập email"),
  password: yup
    .string()
    .min(8, "Mật khẩu có ít nhất 8 kí tự")
    .required("Vui lòng nhập mật khẩu"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Mật khẩu chưa đúng")
    .required("Vui lòng xác nhận lại mật khẩu"),
});
