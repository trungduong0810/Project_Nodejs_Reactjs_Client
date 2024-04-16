import React, { useEffect, useState } from "react";
import { fetchAllNews } from "../../Api/apiNews";
import { dateFormat } from "../../Admin/components/formatDate";
import { useNavigate } from "react-router-dom";
const NewsItem = () => {
  const navigate = useNavigate();
  const [dataNews, setDataNews] = useState();
  useEffect(() => {
    fetchAllNews(setDataNews);
  }, []);

  if (!dataNews) return;
  return (
    <div>
      <div className="screen__container">
        <div className="flex justify-center flex-wrap gap-x-12 gap-y-10">
          {dataNews.map((item, index) => (
            <div
              onClick={() => navigate(`/newsDetails/${item.NewsId}`)}
              key={index}
              className="w-[370px] relative cursor-pointer hover:bg-gray-200 p-4 rounded-md transition-all"
            >
              <img src={item.NewsImage} alt="" className="rounded-md w-full h-[350px]" />
              <div className="inline-block py-2 text-[14px] font-semibold text-gray-400">
                {dateFormat(item.createdAt).substring(
                  0,
                  dateFormat(item.createdAt).indexOf(" ")
                )}
              </div>
              <p className="text-[20px] font-[600]">{item.NewsTitle}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
