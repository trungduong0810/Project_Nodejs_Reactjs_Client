/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from "react";
import Logo from "../Layouts/Logo/Logo";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ButtonGlobal from "../components/button/ButtonGlobal";
import Input from "../components/input/Input";
import { validatePayment } from "../Validation/validetePayment";
import SelectMethodPayment from "../components/select/selectMethodPayment";
import Order from "../Layouts/Order/Order";
import { useSelector } from "react-redux";
import TextareaForm from "../components/input/Textarea";
import Swal from "sweetalert2";
import axios from "axios";
import ModalCoupons from "../components/Modal/ModalCoupons";
import { urlApi } from "../Api/urlApi";

const PayMent = () => {
  const methodPayment = useSelector((state) => state.selectMethodPay.value);
  const dataOrder = useSelector((state) => state.infoOrderProduct.value);
  const cartBuyNow = useSelector((state) => state.cartBuyNow.value);
  const userId = useSelector((state) => state.userId.value);
  const [valuePayment, setValuePayment] = useState("");
  const [totalOrderPrice, setTotalOrderPrice] = useState(0);
  console.log(dataOrder);
  useEffect(() => {
    if (methodPayment !== "PaymentOnDelivery") {
      setValuePayment("Đã thanh toán");
    } else {
      setValuePayment("Thanh toán khi nhận hàng");
    }
  }, [methodPayment]);

  const {
    handleSubmit,
    control,
    // reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(validatePayment),
    mode: "onChange",
  });

  const handleTotalOrderPriceChange = (newTotalOrderPrice) => {
    setTotalOrderPrice(newTotalOrderPrice);
  };

  const handleSubmitSignIn = (value) => {
    if (!isValid) return;
    if (!methodPayment) {
      toast.error("Vui lòng chọn phương thức thanh toán", {
        pauseOnHover: false,
      });
    } else {
      if (dataOrder && userId && cartBuyNow.length === 0) {
        addOrders(
          userId,
          dataOrder.ProductImage,
          dataOrder.ProductName,
          dataOrder.ProductSize,
          dataOrder.ProductColor,
          dataOrder.ProductQuantity,
          totalOrderPrice,
          value.email,
          value.name,
          value.numberPhone,
          value.address,
          valuePayment,
          1
        );
      }
      if (cartBuyNow.length !== 0 && userId) {
        addOrders(
          userId,
          cartBuyNow.ProductImage,
          cartBuyNow.ProductName,
          cartBuyNow.ProductSize,
          cartBuyNow.ProductColor,
          cartBuyNow.ProductQuantity,
          totalOrderPrice,
          value.email,
          value.name,
          value.numberPhone,
          value.address,
          valuePayment,
          1
        );
      }
    }
  };

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

  const addOrders = (
    userId,
    productImage,
    productName,
    productSize,
    productColor,
    productQuantity,
    orderPrice,
    email,
    name,
    numberPhone,
    address,
    payment,
    status
  ) => {
    axios
      .post(`${urlApi}/api/orders`, {
        userId: userId,
        productImage: productImage,
        productName: productName,
        productSize: productSize,
        productColor: productColor,
        productQuantity: productQuantity,
        orderPrice: orderPrice,
        email: email,
        name: name,
        numberPhone: numberPhone,
        address: address,
        payment: payment,
        status: status,
      })
      .then(function (response) {
        if (response.data.status === "Success") {
          Swal.fire({
            html: `
              <div class="inform_order">
              <h1 class="title">Đặt hàng thành công</h1>
                <p>
                  Bạn có thể theo dõi đơn hàng tại
                  <span class="orderMy">đơn hàng của tôi</span>
                </p>
                <p><span class="logo">Sea fashion</span> rất hân hạnh khi được phụ vụ bạn!</p>
                <div class="btn_group">
                  <button class="btn btn_buy"><a href="/product">Tiếp tục mua hàng</a></button>
                  <button class="btn btn_details"><a href="/cart">Chi tiết đơn hàng</a></button>
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
            text: "Tên sản phẩm đã tồn tại",
            icon: "error",
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    window.addEventListener("popstate", (e) => {
      window.location.reload();
    });
  }, []);

  return (
    <div className="screen__container pb-20">
      <Logo></Logo>
      <form
        onSubmit={handleSubmit(handleSubmitSignIn)}
        className="laptop:flex laptop:flex-row laptop:justify-between laptop:gap-12 mt-12 mobile:flex mobile:flex-col mobile:gap-4"
      >
        <div className="laptop:w-[50%]">
          <div className="flex items-center gap-3 bg-gray-200 shadow-lg rounded-md p-4">
            <FontAwesomeIcon
              icon={faCircleInfo}
              className="text-[25px] text-gray-600"
            />
            <p className="text-[18px] text-gray-600 font-medium">
              Thông tin của bạn tuyệt đối bảo mật
            </p>
          </div>
          <div>
            <h2 className="my-5 text-lg font-medium text-gray-600">
              Thông tin giao hàng
            </h2>
            <Input
              className="w-full"
              label="Họ và tên"
              type="text"
              color={errors.name ? "error" : "success"}
              control={control}
              name="name"
            ></Input>

            <Input
              className="w-full"
              label="Email"
              type="email"
              color={errors.email ? "error" : "success"}
              control={control}
              name="email"
            ></Input>
            <Input
              className="w-full"
              label="Số điện thoại"
              type="text"
              color={errors.numberPhone ? "error" : "success"}
              control={control}
              name="numberPhone"
            ></Input>

            <TextareaForm
              className="w-full h"
              type="text"
              color={errors.address ? "danger" : "success"}
              control={control}
              name="address"
              minRows={3}
              placeholder="Địa chỉ"
              style={{
                border: "1px solid #C4C4C4",
                backgroundColor: "none",
                outline: "none",
              }}
            ></TextareaForm>
          </div>
          <div>
            <h2 className="my-5 text-lg font-medium text-gray-600">
              Phương thức thanh toán
            </h2>
            <SelectMethodPayment></SelectMethodPayment>
          </div>
        </div>

        <div className="laptop:w-[50%]">
          <Order
            methodPayment={methodPayment}
            valueTotalOrderPrice={handleTotalOrderPriceChange}
          ></Order>
          <ButtonGlobal
            type="submit"
            style={{ fontSize: "20px", height: "50px", width: "100%" }}
            color="success"
            className="text-center mt-12"
          >
            {methodPayment && methodPayment !== "PaymentOnDelivery"
              ? "Thanh toán"
              : "Đặt hàng"}
          </ButtonGlobal>
        </div>
      </form>
    </div>
  );
};

export default PayMent;
