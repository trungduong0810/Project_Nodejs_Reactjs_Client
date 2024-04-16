import * as yup from "yup";
export const ValidateNews = yup.object({
  titleNews: yup.string().required("Vui lòng nhâp chủ để tin tức"),
});
