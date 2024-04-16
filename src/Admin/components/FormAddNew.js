import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../../components/input/Input";
import ButtonGlobal from "../../components/button/ButtonGlobal";
import { toast } from "react-toastify";
import UploadImage from "../Upload/UploadImage";
import UploadQuill from "../Upload/UploadQuill";
import { ValidateNews } from "../../Validation/validateNews";
import axios from "axios";
import Swal from "sweetalert2";
import { urlApi } from "../../Api/urlApi";

const FormAddNews = () => {
  // todo: ========= data up api =============
  const [imageNews, setImageNews] = useState("");
  const [valueDetailNews, setValueDetailNews] = useState("");
  const [handleEmptyImgUpload, setHandleEmptyImgUpload] = useState(false);
  const [handleEmptyValueContent, setHandleEmptyValueContent] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(ValidateNews),
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

  // todo: =============== submit form add news =====================
  const handleAddProduct = (value) => {
    if (!isValid) return;
    addNews(value.titleNews, imageNews, valueDetailNews);
  };

  // todo: =============== add news api =====================
  const addNews = (NewsTitle, NewsImage, NewsContent) => {
    axios
      .post(`${urlApi}/api/news`, {
        NewsTitle: NewsTitle,
        NewsImage: NewsImage,
        NewsContent: NewsContent,
      })
      .then(function (response) {
        if (response.data.status === "Success") {
          Swal.fire({
            title: "Thành công",
            text: "Thêm tin tức thành công",
            icon: "success",
          });
          setHandleEmptyImgUpload(true);
          setHandleEmptyValueContent(true);
        } else {
          Swal.fire({
            title: "Thất bại",
            text: "Chủ đề bài viết đã tồn tại",
            icon: "error",
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //todo: ================= reset ========================

  useEffect(() => {
    reset({
      titleNews: "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleEmptyImgUpload]);

  return (
    <form
      action=""
      onSubmit={handleSubmit(handleAddProduct)}
      className="w-full"
    >
      <div className="w-[90%] mx-auto">
        <Input
          className="w-[90%]"
          label="Chủ đề tin tức..."
          type="text"
          color={errors.titleNews ? "error" : "success"}
          control={control}
          name="titleNews"
        ></Input>

        <UploadImage
          title="Hình ảnh tin tức"
          setImageValue={setImageNews}
          click={handleEmptyImgUpload}
        ></UploadImage>
        <div className="quill w-[90%]">
          <UploadQuill
            setEmptyValue={handleEmptyValueContent}
            setContentValueProduct={setValueDetailNews}
          ></UploadQuill>
        </div>
        <div className="w-[90%] flex justify-center">
          <ButtonGlobal
            type="submit"
            style={{ fontSize: "20px", height: "50px", width: "450px" }}
            color="success"
          >
            Thêm tin tức
          </ButtonGlobal>
        </div>
      </div>
    </form>
  );
};

export default FormAddNews;
