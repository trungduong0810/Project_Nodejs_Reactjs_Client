/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { dataSelectStar } from "../../../Data/selectStar";
import Star from "../../Star/Star";
import axios from "axios";
import { dateFormat } from "../../../Admin/components/formatDate";
import { getUserById } from "../../../Api/getDataUser";
import { useSelector } from "react-redux";
import { urlApi } from "../../../Api/urlApi";

const ReviewProduct = ({ productName }) => {
  const [dataReviews, setDataReview] = useState();
  const avatarUser = useSelector((state) => state.changeAvatarUser.value);
  const [render, setRender] = useState(true);
  const [star, setStar] = useState(NaN);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${urlApi}/api/reviews/${productName}`);
      const reviews = res.data.reviews;
      const updatedReviews = await Promise.all(
        reviews.map(async (review) => {
          const userRes = await getUserById(review.UserId);
          const userData = userRes.data.user;
          return {
            ...review,
            userImage: userData.userImage,
            userName: userData.username,
          };
        })
      );
      setDataReview(updatedReviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [productName, render]);

  useEffect(() => {
    setRender(!render);
  }, [avatarUser]);

  const handleChange = (event) => {
    console.log(Number(event.target.value));
    setStar(Number(event.target.value));
  };

  // eslint-disable-next-line array-callback-return
  const dataReviewsFilterStar = dataReviews?.filter((item) => {
    if (!isNaN(star)) {
      return item.Star === star;
    } else {
      return true;
    }
  });
  console.log(dataReviews);

  return (
    <div className="review__product m-12 w-[90%] mx-auto">
      <h1 className="text-center text-3xl font-bold ">Đánh giá sản phẩm</h1>
      <div>
        {dataReviews?.length === 0 ? (
          <h1 className="text-gray-700 font-bold text-[20px] text-center mt-5">
            Chưa có bài đánh giá nào cho sản phẩm này
          </h1>
        ) : (
          <div className="bg-[#fef0ed] flex justify-between py-7 my-8">
            <div className="flex flex-col justify-center gap-3 w-[25%] text-center text-[22px] font-bold text-red-600">
              <span className="">
                <span className="text-[35px]">4.9</span> trên 5
              </span>
              <div className="w-full flex items-center justify-center mx-auto">
                <Star value={5}></Star>
              </div>
            </div>
            <div className="w-[75%] select_reviews flex items-center justify-center flex-wrap gap-4 ">
              {dataSelectStar &&
                dataSelectStar.map((item, index) => (
                  <div className="select_group" key={index}>
                    <input
                      type="radio"
                      name="size"
                      id={item.id}
                      hidden
                      value={item.value}
                      onChange={handleChange}
                    />
                    <label
                      htmlFor={item.id}
                      className="select_label w-[100px] inline-block text-center py-1 px-2 leading-[30px] border-green-600 border text-[20px] font-medium cursor-pointer rounded-md"
                    >
                      <span> {item.label}</span>
                    </label>
                  </div>
                ))}
            </div>
          </div>
        )}

        {dataReviewsFilterStar &&
          dataReviewsFilterStar.map((item, index) => (
            <div className="py-2" key={index}>
              <div className=" border-b-2 ">
                <div className="flex justify-start gap-3">
                  <div className="w-[60px] h-[60px] rounded-full bg-black overflow-hidden border-2">
                    <img
                      src={item.userImage}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-gray-700 font-semibold">
                    <h2 className="text-[18px] pb-1">{item.userName}</h2>
                    <Star value={item.Star}></Star>
                    <p className="pt-1">{item.FeedBack}</p>
                    <p className="pt-1">{dateFormat(item.createdAt)}</p>
                  </div>
                </div>

                <div className="pt-3 pb-5 ml-[72px]">
                  <p className="leading-7">{item.ReviewContent}</p>

                  <div className="flex items-center gap-3 mt-3">
                    {item.ReviewImages.map((item, index) => (
                      <img
                        key={index}
                        src={item}
                        alt=""
                        className="w-[100px] h-[100px] rounded-md"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ReviewProduct;
