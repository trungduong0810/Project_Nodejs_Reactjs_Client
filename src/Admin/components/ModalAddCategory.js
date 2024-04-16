import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import ModalGlobal from "../../components/Modal/ModalGlobal";
import Input from "../../components/input/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ButtonGlobal from "../../components/button/ButtonGlobal";
import { validateCreateCategory } from "../../Validation/validateCreateCategory";
import { toast } from "react-toastify";
import axios from "axios";
import Swal from "sweetalert2";
import { urlApi } from "../../Api/urlApi";
const ModalAddCategory = ({ titleButton, eventPost }) => {
  const [openModal, setOpenModal] = useState(false);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(validateCreateCategory),
    mode: "onChange",
  });

  const PostCreateCategory = (categoryName) => {
    axios
      .post(`${urlApi}/api/category`, {
        categoryName: categoryName,
      })
      .then(function (response) {
        if (response.data.status === "Success") {
          Swal.fire({
            title: "Thành công",
            text: "Thêm danh mục thành công",
            icon: "success",
          });
          eventPost(true);
          setOpenModal(false);
          reset({ categoryName: "" });
        } else {
          Swal.fire({
            title: "Thất bại",
            text: "Danh mục đã tồn tại",
            icon: "error",
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleCreateCategory = (value) => {
    if (!isValid) return;
    PostCreateCategory(value.categoryName);
  };
  useEffect(() => {
    const errorKeys = Object.keys(errors);
    if (errorKeys.length > 0) {
      const firstErrorKey = errorKeys[0];
      document.getElementsByName(firstErrorKey)[0].focus();
      toast.error(errors[firstErrorKey].message, {
        pauseOnHover: false,
        zIndex: 999,
      });
    }
  }, [errors]);
  return (
    <>
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
          bodyClass="w-[600px] bg-white p-7 p-b rounded-lg"
          styleBody={{
            transition: "all 0.25s linear",
          }}
        >
          <div className="text-black text-center bg-white">
            <h2 className="text-2xl font-bold  mb-4 text-teal-600">Danh mục</h2>
            <form action="" onSubmit={handleSubmit(handleCreateCategory)}>
              <Input
                className="w-[450px]"
                label="Danh mục mới"
                type="text"
                color={errors.categoryName ? "error" : "success"}
                control={control}
                name="categoryName"
              ></Input>
              <ButtonGlobal
                type="submit"
                className="w-full mt-7"
                style={{ fontSize: "16px", height: "40px", width: "450px" }}
                color="success"
              >
                Tạo Danh mục
              </ButtonGlobal>
            </form>
          </div>
        </ModalGlobal>
      </CSSTransition>

      <button
        onClick={() => setOpenModal(true)}
        className=" uppercase w-[250px] h-[50px] bg-green-700 text-white font-semibold rounded-lg text-[18px]"
      >
        {titleButton}
      </button>
    </>
  );
};

export default ModalAddCategory;
