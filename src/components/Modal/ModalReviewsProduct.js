import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import ModalGlobal from "./ModalGlobal";
import RatingStar from "./Rating";
import UploadImageReviewsProduct from "../../Admin/Upload/uploadImageReviewsProduct";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validateReviewsProduct } from "../../Validation/validateReviewsProduct";
import { toast } from "react-toastify";
import SelectForm from "../select/SelectForm";
import ButtonGlobal from "../button/ButtonGlobal";
import TextareaForm from "../input/Textarea";

const ModalReviewsProduct = ({ openModal, setOpenModal, data }) => {
  const [imageReviews, setImageReviews] = useState("");
  const [handleEmptyImgUpload, setHandleEmptyImgUpload] = useState(false);

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

  const handleSubmitReviews = (value) => {
    if (!isValid) return;
  };

  return (
    <div>
      <div>
        <CSSTransition
          in={openModal}
          timeout={250}
          unmountOnExit
          classNames="zoom"
        >
          <ModalGlobal
            visible={openModal}
            onclose={() => setOpenModal(false)}
            containerClass="flex items-center justify-center"
            bodyClass="w-[40%] bg-white p-7 p-b rounded-lg infoUser"
            styleBody={{
              transition: "all 0.25s linear",
            }}
          >
            <div className="text-black bg-white">
              <h2 className="text-[25px] font-bold  mb-4 text-teal-600 text-center">
                Đánh giá sản phẩm
              </h2>

              <div>
                <div className="py-3 mt-5 my-5 px-5 pr-6 hover:bg-slate-300 cursor-pointer transition-all border-y-2 relative">
                  <div className="flex  gap-7">
                    <img
                      src={data.ProductImage}
                      alt=""
                      className="w-[100px] h-[80px] rounded-sm"
                    />
                    <div className="text-gray-600 text-[14px] font-medium w-full leading-6">
                      <h2 className="text-[15px] font-bold">
                        {data.ProductName}
                      </h2>
                      <p>
                        Phân loại: {data.ProductColor}, {data.ProductSize}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="star flex justify-center">
                  <RatingStar></RatingStar>
                </div>
                <div className="mt-5">
                  <UploadImageReviewsProduct
                    setUrl={setImageReviews}
                    click={handleEmptyImgUpload}
                  ></UploadImageReviewsProduct>
                </div>
                <form action="" onSubmit={handleSubmit(handleSubmitReviews)} className="mt-5">
                  <TextareaForm
                    className="w-full"
                    type="text"
                    color={errors.productDesc ? "danger" : "success"}
                    control={control}
                    name="reviewsProduct"
                    minRows={4}
                    placeholder="Hãy chia sẽ những điều bạn thích về sản phẩm này nhé"
                    style={{
                      border: "1px solid #C4C4C4",
                      backgroundColor: "none",
                      outline: "none",
                    }}
                  ></TextareaForm>

                  <ButtonGlobal
                    type="submit"
                    style={{ fontSize: "20px", height: "40px", width: "100%", lineHeight:"40px" }}
                    color="success"
                  >
                    Đánh giá
                  </ButtonGlobal>
                </form>
              </div>
            </div>
          </ModalGlobal>
        </CSSTransition>
      </div>
    </div>
  );
};

export default ModalReviewsProduct;
