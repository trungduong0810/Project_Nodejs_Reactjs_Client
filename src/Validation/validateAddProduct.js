import * as yup from "yup";
export const validateAddProduct = yup.object({
  productName: yup.string().required("Vui lòng nhập tên sản phẩm"),
  productDesc: yup.string().required("Vui lòng nhập mô tả sản phẩm"),
  productCategory: yup.object().required("Vui lòng chọn danh mục sản phẩm"),
  productPrice: yup.number().typeError("Vui lòng nhập giá sản phẩm"),
  productDiscount: yup
    .number()
    .typeError("Giảm giá cho sản phẩm có thể là 0%")
    .max(100, "Giảm tối đa 75%"),
  productQuantity: yup.number().typeError("Vui lòng nhập số lượng sản phẩm"),
});
