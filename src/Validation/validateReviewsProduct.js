import * as yup from "yup";
export const validateReviewsProduct = yup.object({
  reviewsProduct: yup.string().required("Vui lòng nhập ý kiến"),
});
