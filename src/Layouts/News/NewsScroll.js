import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { useNavigate } from "react-router-dom";
import { fetchAllNews } from "../../Api/apiNews";
import { dateFormat } from "../../Admin/components/formatDate";
const News = () => {
  const navigate = useNavigate();
  const [dataNews, setDataNews] = useState();
  useEffect(() => {
    fetchAllNews(setDataNews);
  }, []);
  if (!dataNews) return;
  return (
    <div className="my-12 screen__container z-0">
      <h1 className="text-center text-3xl uppercase font-bold mb-7 ">
        tin tức
      </h1>
      <Swiper
        style={{ zIndex: 0 }}
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={0}
        slidesPerView={4}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          360: {
            slidesPerView: 1,
          },
          1024: {
            slidesPerView: 4,
          },
          1280: {
            slidesPerView: 4,
          },
        }}
        onSwiper={(swiper) => {
          return swiper;
        }}
        onSlideChange={() => console.log("slide change")}
      >
        {dataNews.map((item, index) => (
          <SwiperSlide style={{ zIndex: 1 }}>
            <div
              onClick={() => navigate(`/newsDetails/${item.NewsId}`)}
              key={index}
              className="w-[90%] relative cursor-pointer hover:bg-gray-200 p-4 rounded-md transition-all"
            >
              <img
                src={item.NewsImage}
                alt=""
                className="rounded-md w-full h-[300px]"
              />
              <div className="inline-block py-2 text-[14px] font-semibold text-gray-400">
                {dateFormat(item.createdAt).substring(
                  0,
                  dateFormat(item.createdAt).indexOf(" ")
                )}
              </div>
              <p className="text-[20px] font-[600]">{item.NewsTitle}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default News;
