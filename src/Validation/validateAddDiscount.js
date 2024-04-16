import * as yup from "yup";
export const validateAddDiscount = yup.object({
  percent: yup.number().typeError("Vui lòng nhập phần trăm giảm giá"),

  totalOrderPriceLarger: yup.number().typeError("Vui lòng giá trị đơn hàng"),
  discountCode: yup.string().min(6, "Mã phải có ít nhất 6 kí tự").required("Vui lòng nhập mã giảm giá"),
});
