import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../../components/input/Input";
import { toast } from "react-toastify";
import axios from "axios";
import Swal from "sweetalert2";
import { validateAddDiscount } from "../../Validation/validateAddDiscount";
import TitleAdmin from "./TitleAdmin";
import ButtonGlobal from "../../components/button/ButtonGlobal";
import { urlApi } from "../../Api/urlApi";

const FormAddDiscount = () => {
  const [render, setRender] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(validateAddDiscount),
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
  const handleAddDiscount = (value) => {
    if (!isValid) return;
    addDiscount(value.percent, value.totalOrderPriceLarger, value.discountCode);
  };

  // todo: =============== add discount api =====================
  const addDiscount = (
    DiscountPercent,
    TotalOrderPriceLarger,
    DiscountCode
  ) => {
    axios
      .post(`${urlApi}/api/discount`, {
        DiscountPercent: DiscountPercent,
        TotalOrderPriceLarger: TotalOrderPriceLarger,
        DiscountCode: DiscountCode,
      })
      .then(function (response) {
        if (response.data.status === "Success") {
          Swal.fire({
            title: "Thành công",
            text: "Thêm phiếu giảm giá thành công",
            icon: "success",
          });
          setRender(true);
        } else {
          Swal.fire({
            title: "Thất bại",
            text: "Phần trăm giảm giá hoặc mã giảm giá đã tồn tại",
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
      percent: "",
      totalOrderPriceLarger: "",
      discountCode: "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [render]);

  return (
    <div className="w-full">
      <div className="flex gap-10 w-[99%]">
        <TitleAdmin title="Phiếu giảm giá"></TitleAdmin>
        <ButtonGlobal
          color="success"
          to="/admin/manage/discount"
          style={{
            height: "50px",
            fontSize: "16px",
            lineHeight: "50px",
            width: "200px",
          }}
        >
          Quản lý giảm giá
        </ButtonGlobal>
      </div>
      <form
        action=""
        onSubmit={handleSubmit(handleAddDiscount)}
        className="w-full relative"
      >
        <div className="w-[50%] mx-auto">
          <Input
            className="w-full"
            label="Phầm trăm giảm giá"
            type="number"
            color={errors.titleNews ? "error" : "success"}
            control={control}
            name="percent"
            InputProps={{ inputProps: { min: "1", max: "99", step: "1" } }}
          ></Input>
          <Input
            className="w-full"
            label="Tổng giá trị đơn hàng lớn hơn --- vnđ"
            type="number"
            color={errors.titleNews ? "error" : "success"}
            control={control}
            name="totalOrderPriceLarger"
          ></Input>
          <Input
            className="w-full"
            label="Mã giảm giá"
            type="text"
            color={errors.titleNews ? "error" : "success"}
            control={control}
            name="discountCode"
          ></Input>

          <button
            type="submit"
            className="uppercase w-full flex justify-center bg-green-700 py-2 text-[20px] font-semibold  text-white rounded-md"
          >
            Thêm mã giảm giá
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormAddDiscount;
