import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { validateReviewsProduct } from "../../Validation/validateReviewsProduct";
import { toast } from "react-toastify";
import RatingStar from "../../components/Modal/Rating";
import TextareaForm from "../../components/input/Textarea";
import ButtonGlobal from "../../components/button/ButtonGlobal";
import { useSelector } from "react-redux";
import UploadImageReviewsProduct from "../../Admin/Upload/uploadImageReviewsProduct";
import SelectReviewProduct from "../../components/select/SelectReviewProduct";
import Swal from "sweetalert2";
import axios from "axios";
import { urlApi } from "../../Api/urlApi";

const ProductReviews = () => {
  const data = useSelector((state) => state.reviewProduct.value);
  const userId = useSelector((state) => state.userId.value);
  const valueSelectReview = useSelector((state) => state.selectReview.value);
  const [imageReviews, setImageReviews] = useState("");
  const [handleEmptyImgUpload, setHandleEmptyImgUpload] = useState(false);
  const [star, setStar] = useState();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(validateReviewsProduct),
    mode: "onChange",
  });
  useEffect(() => {
    const errorKeys = Object.keys(errors);
    if (errorKeys.length > 0) {
      const firstErrorKey = errorKeys[0];
      document.getElementsByName(firstErrorKey)[0].focus();
      toast.error(errors[firstErrorKey].message, {
        pauseOnHover: false,
      });
    }
  }, [errors]);

  const addReviews = (
    UserId,
    ProductName,
    Star,
    FeedBack,
    ReviewImages,
    ReviewContent
  ) => {
    axios
      .post(`${urlApi}/api/reviews`, {
        UserId: UserId,
        ProductName: ProductName,
        Star: Star,
        FeedBack: FeedBack,
        ReviewImages: ReviewImages,
        ReviewContent: ReviewContent,
      })
      .then(function (response) {
        if (response.data.status === "Success") {
          Swal.fire({
            html: `
              <div class="inform_order">
              <h1 class="title">Bạn đã đánh giá sản phẩm</h1>
                <div>
                  <p>Bạn có thể xem lại bài viết tại</p>
                  <div class="orderMy">Trang chi tiết sản phẩm</div>
                </div>
                <p><span class="logo">Sea fashion</span> chân thành cảm ơn những lời đóng góp của bạn!</p>
                <div class="btn_group">
                  <button class="btn btn_buy"><a href="/product">Tiếp tục mua hàng</a></button>  
                </div>
              </div>
            `,
            icon: "success",
            showConfirmButton: false,
            allowOutsideClick: false,
          });
        } else {
          Swal.fire({
            title: "Thất bại",
            text: "Thất bại rồi, vui lòng thử lại!",
            icon: "error",
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSubmitReviews = (value) => {
    if (!isValid) return;
    addReviews(
      userId,
      data.ProductName,
      star,
      valueSelectReview,
      imageReviews,
      value.reviewsProduct
    );
  };

  return (
    <div>
      <div className="text-black bg-white">
        <h2 className="text-[30px] font-bold  mb-4 text-teal-600 text-center">
          Đánh giá sản phẩm
        </h2>

        <div className="laptop:flex w-full justify-between">
          <div className="laptop:w-[45%]">
            <div className="laptop:flex py-3 mt-5 my-5 px-5 pr-6 hover:bg-slate-300 cursor-pointer transition-all border-b-2 gap-7">
              <img
                src={data.ProductImage}
                alt=""
                className="w-[150px] h-[100px] rounded-sm mx-auto"
              />
              <div className="text-gray-600 text-[16px] font-medium w-full leading-6">
                <h2 className="text-[18x] font-bold">{data.ProductName}</h2>
                <p>
                  Phân loại: {data.ProductColor}, {data.ProductSize}
                </p>
              </div>
            </div>
            <div className="star flex justify-center">
              <RatingStar setStar={setStar}></RatingStar>
            </div>
            <div>
              <SelectReviewProduct></SelectReviewProduct>
            </div>
          </div>

          <form
            action=""
            onSubmit={handleSubmit(handleSubmitReviews)}
            className="mt-5 laptop:w-[45%] laptop:py-0"
          >
            <div className="mb-5">
              <UploadImageReviewsProduct
                setUrl={setImageReviews}
                click={handleEmptyImgUpload}
              ></UploadImageReviewsProduct>
            </div>

            <TextareaForm
              className="w-full"
              type="text"
              color={errors.productDesc ? "danger" : "success"}
              control={control}
              name="reviewsProduct"
              minRows={5}
              placeholder="Hãy chia sẽ những điều bạn thích về sản phẩm này nhé"
              style={{
                border: "1px solid #C4C4C4",
                backgroundColor: "none",
                outline: "none",
              }}
            ></TextareaForm>

            <ButtonGlobal
              type="submit"
              style={{
                fontSize: "20px",
                height: "40px",
                width: "100%",
                lineHeight: "40px",
              }}
              color="success"
            >
              Đánh giá
            </ButtonGlobal>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductReviews;
