import axios from "axios";
import { urlApi } from "../../Api/urlApi";

export const fetchProduct = async (setDataProduct) => {
  const res = await axios.get(`${urlApi}/api/products`);
  setDataProduct(res.data.data);
};
