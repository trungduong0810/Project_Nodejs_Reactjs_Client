/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import qrMoMo from "../../Assets/image/qrMoMo.jpg";
import qrZaloPay from "../../Assets/image/qrZaloPay.jpg";
import qrVnPay from "../../Assets/image/qrVnPay.jpg";
import { toast } from "react-toastify";
import ButtonGlobal from "../../components/button/ButtonGlobal";
import { useSelector } from "react-redux";
import {
  formatMoney,
  formatMoneyCart,
} from "../../components/functicons/formatMoney";
import axios from "axios";
import ModalShowDiscount from "../../components/Modal/ModalShowDiscount";
import { urlApi } from "../../Api/urlApi";
const Order = ({ methodPayment, valueTotalOrderPrice }) => {
  let totalOrderPrice;
  const [openModal, setOpenModal] = useState(false);
  const [dataDiscount, setDataDisCount] = useState();
  const [value, setValue] = useState();
  const [codeDiscount, setCodeDiscount] = useState(0);
  const dataOrder = useSelector((state) => state.infoOrderProduct.value);
  const cartBuyNow = useSelector((state) => state.cartBuyNow.value);

  useEffect(() => {
    if (!value) {
      setCodeDiscount(0);
    }
  }, [value]);

  const fetchDataDiscount = async () => {
    const res = await axios.get(`${urlApi}/api/discount`);
    setDataDisCount(res.data.discounts);
  };

  useEffect(() => {
    fetchDataDiscount();
  }, []);

  const handleCodeDiscount = () => {
    if (dataDiscount) {
      const validDiscount = dataDiscount.find(
        (item) =>
          value === item.DiscountCode &&
          totalOrderPrice > item.TotalOrderPriceLarger
      );
      if (validDiscount) {
        setCodeDiscount(validDiscount.DiscountPercent);
      } else {
        setCodeDiscount(0);
        toast.error("Mã giảm giá không hợp lệ", {
          pauseOnHover: false,
        });
      }
    }
  };

  if (codeDiscount && dataOrder) {
    totalOrderPrice = Math.floor(
      formatMoneyCart(dataOrder.ProductPrice) * dataOrder.ProductQuantity -
        formatMoneyCart(dataOrder.ProductPrice) *
          dataOrder.ProductQuantity *
          (codeDiscount / 100)
    );
  }
  if (!codeDiscount && dataOrder) {
    totalOrderPrice =
      formatMoneyCart(dataOrder.ProductPrice) * dataOrder.ProductQuantity;
  }
  if (codeDiscount && cartBuyNow.length !== 0 && !dataOrder) {
    totalOrderPrice = Math.floor(
      cartBuyNow.ProductTotalPrice -
        cartBuyNow.ProductTotalPrice * (codeDiscount / 100)
    );
  }
  if (!codeDiscount && cartBuyNow.length !== 0 && !dataOrder) {
    totalOrderPrice = cartBuyNow.ProductTotalPrice;
  }

  useEffect(() => {
    valueTotalOrderPrice(totalOrderPrice);
  }, [totalOrderPrice, valueTotalOrderPrice]);

  return (
    <div>
      <div className="py-5 mb-10 px-4 hover:bg-slate-300 cursor-pointer transition-all border rounded-md ">
        {cartBuyNow && cartBuyNow.length !== 0 && !dataOrder && (
          <div className="laptop:flex items-center gap-12">
            <img
              src={cartBuyNow.ProductImage}
              alt=""
              className="w-[150px] h-[150px] rounded-sm mx-auto"
            />
            <div className="text-gray-600 text-[16px] font-medium w-full laptop:flex">
              <div className="mt-2 w-full leading-8">
                <h2 className="text-[20px] font-bold">
                  {cartBuyNow.ProductName}
                </h2>
                <p>Màu sắc: {cartBuyNow.ProductColor}</p>
                <p>Size: {cartBuyNow.ProductSize}</p>
                <p>Số lượng: {cartBuyNow.ProductQuantity}</p>
              </div>
              <div className="laptop:flex items-center justify-between mt-3 w-[45%] text-[20px] font-bold">
                <span> {formatMoney(cartBuyNow.ProductTotalPrice)} đ</span>
              </div>
            </div>
          </div>
        )}

        {dataOrder && cartBuyNow.length === 0 && (
          <div className="laptop:flex items-center gap-12">
            <img
              src={dataOrder.ProductImage}
              alt=""
              className="w-[150px] h-[150px] rounded-sm mx-auto"
            />
            <div className="text-gray-600 text-[16px] font-medium w-full laptop:flex">
              <div className="mt-2 w-full leading-8">
                <h2 className="text-[20px] font-bold">
                  {dataOrder.ProductName}
                </h2>
                <p>Màu sắc: {dataOrder.ProductColor}</p>
                <p>Size: {dataOrder.ProductSize}</p>
                <p>Số lượng: {dataOrder.ProductQuantity}</p>
              </div>
              <div className="laptop:flex items-center justify-between mt-3 w-[45%] text-[20px] font-bold">
                <span>
                  {formatMoney(
                    formatMoneyCart(dataOrder.ProductPrice) *
                      dataOrder.ProductQuantity
                  )}
                  đ
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={`py-7 border-y-2`}>
        <div className="flex justify-between items-center gap-5">
          <TextField
            label="Nhập mã giảm giá"
            variant="outlined"
            className="w-[60%] h-[50px]"
            color="success"
            onChange={(e) => setValue(e.target.value)}
          />
          <div className="flex justify-center gap-2 laptop:w-[40%]">
            <ButtonGlobal
              onClick={() => {
                setOpenModal(true);
              }}
              color="info"
              style={{
                fontSize: "1rem",
                height: "55px",
                color: "white",
                textTransform: "none",
              }}
              className=" h-[50px]"
            >
              Xem mã
            </ButtonGlobal>
            <ButtonGlobal
              onClick={handleCodeDiscount}
              color="success"
              style={{
                fontSize: "1rem",
                height: "55px",
                color: "white",
                textTransform: "none",
              }}
              className=" h-[50px]"
            >
              Sử dụng
            </ButtonGlobal>
          </div>
        </div>
        <div
          className={` transform ${
            methodPayment
              ? "scale-100 opacity-100 transition-transform duration-500 ease-in-out"
              : "scale-0 opacity-0 transition-transform duration-500 ease-in-out"
          }`}
        >
          {methodPayment === "PaymentMoMo" && (
            <div
              className={`mt-3 flex flex-col items-center justify-center rounded-md`}
            >
              <h3 className="my-2 text-[#ba076D] text-[18px] font-medium">
                Quét mã để thanh toán
              </h3>
              <img src={qrMoMo} alt="" className="w-[200px] h-[200px]" />
            </div>
          )}
          {methodPayment === "PaymentZaloPay" && (
            <div
              className={`mt-3 flex flex-col items-center justify-center rounded-md`}
            >
              <h3 className="my-2 text-blue-600 text-[18px] font-medium">
                Quét mã để thanh toán
              </h3>
              <img src={qrZaloPay} alt="" className="w-[200px] h-[200px]" />
            </div>
          )}
          {methodPayment === "VNPayQr" && (
            <div
              className={`mt-3 flex flex-col items-center justify-center rounded-md`}
            >
              <h3 className="my-2 text-green-600 text-[18px] font-medium">
                Quét mã để thanh toán
              </h3>
              <img src={qrVnPay} alt="" className="w-[200px] h-[200px]" />
            </div>
          )}
        </div>
      </div>

      <div className="py-5 border-b-2 text-[16px] font-medium text-gray-600">
        <div className="flex justify-between items-center mb-2">
          <p>Tạm tính</p>
          <p>{formatMoney(totalOrderPrice)} đ</p>
        </div>
        <div className="flex justify-between items-center">
          <p>Phí vận chuyển</p>
          <p>------</p>
        </div>
      </div>

      <div className="flex items-center justify-between text-[16px] font-medium text-gray-600 mt-5">
        <p>Tổng cộng</p>
        <div className="flex items-center gap-3 font-bold">
          <p>VND</p>
          <strong className="text-[22px] ">
            {formatMoney(totalOrderPrice)} đ
          </strong>
        </div>
      </div>
      <ModalShowDiscount
        setOpenModal={setOpenModal}
        openModal={openModal}
      ></ModalShowDiscount>
    </div>
  );
};

export default Order;
