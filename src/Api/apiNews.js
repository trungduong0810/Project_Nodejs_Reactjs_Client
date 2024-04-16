import axios from "axios";
import { urlApi } from "./urlApi";
export const fetchAllNews = async (setDataNews) => {
  const res = await axios.get(`${urlApi}/api/news`);
  setDataNews(res.data.news);
};
export const fetchNewsById = async (setDataNews, newsId) => {
  const res = await axios.get(`${urlApi}/api/news/${newsId}`);
  setDataNews(res.data.news);
};
