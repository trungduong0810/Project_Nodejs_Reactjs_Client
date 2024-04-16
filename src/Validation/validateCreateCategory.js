import * as yup from "yup";
export const validateCreateCategory = yup.object({
  categoryName: yup.string().required("Vui lòng nhập tên danh mục mới."),
});
