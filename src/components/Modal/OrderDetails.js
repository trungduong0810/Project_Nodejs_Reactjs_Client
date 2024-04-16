import React from "react";
import { CSSTransition } from "react-transition-group";
import ModalGlobal from "./ModalGlobal";

const OrderDetails = ({ openModal, setOpenModal, data }) => {
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
            <div className="text-black text-center bg-white">
              <h2 className="text-2xl font-bold  mb-4 text-teal-600">
                Chi tiết đơn hàng
              </h2>

              <div>
                <div className="w-full text-left text-[16px] font-medium mt-4">
                  <div>
                    <div className="w-full flex items-center py-2 text-gray-400">
                      <label className="w-[40%] block">Mã đơn hàng </label>
                      <span className="text-gray-900 w-[75%]">
                        {data.orderId}
                      </span>
                    </div>
                    <div className="w-full flex items-center py-2 text-gray-400">
                      <label className="w-[40%] block">Khách hàng </label>
                      <span className="text-gray-900 w-[75%]">{data.Name}</span>
                    </div>
                    <div className="w-full flex items-center py-2 text-gray-400">
                      <label className="w-[40%] block">Email </label>
                      <span className="text-gray-900 w-[75%]">
                        {data.Email}
                      </span>
                    </div>
                    <div className="w-full flex items-center py-2 text-gray-400">
                      <label className="w-[40%] block">Số điện thoại</label>
                      <span className="text-gray-900 w-[75%]">
                        {data.Phone}
                      </span>
                    </div>
                    <div className="w-full flex items-center py-2 text-gray-400">
                      <label className="w-[40%] block">Địa chỉ </label>
                      <span className="text-gray-900 w-[75%]">
                        {data.Address}
                      </span>
                    </div>

                    <div className="py-7 my-5 px-5 pr-6 hover:bg-slate-300 cursor-pointer transition-all border-y-2 relative">
                      <div className="flex items-center gap-7">
                        <img
                          src={data.ProductImage}
                          alt=""
                          className="w-[150px] h-[100px] rounded-sm"
                        />
                        <div className="text-gray-600 text-[14px] font-medium w-full">
                          <h2 className="text-[15px] font-bold">
                            {data.ProductName}
                          </h2>
                          <div className="flex items-center justify-between mt-2 w-full">
                            <p>Màu sắc: {data.ProductColor}</p>
                            <p>Size: {data.ProductSize}</p>
                          </div>
                          <div className="flex items-center justify-between mt-3 text-[14px]">
                            <span>Số lượng: {data.ProductQuantity}</span>
                            <span className="font-bold">
                              {data.OrderPrice} đ
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="w-full flex items-center py-2 text-gray-400">
                      <label className="w-[40%] block">
                        Thời gian đặt hàng
                      </label>
                      <span className="text-gray-900 w-[75%]">
                        {data.createdAt}
                      </span>
                    </div>

                    <div className="w-full flex items-center py-3 text-gray-400">
                      <label className="w-[40%] block">Thanh toán</label>
                      <span className="text-gray-900 w-[75%]">
                        {data.Payment}
                      </span>
                    </div>

                    <div className="w-full flex items-center py-3 text-gray-400">
                      <label className="w-[40%] block">
                        Trạng thái đơn hàng{" "}
                      </label>
                      <span className="text-white  w-[75%]">
                        {data.Status === 1 ? (
                          <span className="bg-orange-400 py-2 px-3 rounded-md">
                            Chờ xác nhận
                          </span>
                        ) : data.Status === 2 ? (
                          <span className="bg-red-500 py-2 px-3 rounded-md">
                            Người bán đang chuẩn bị hàng
                          </span>
                        ) : data.Status === 3 ? (
                          <span className="bg-blue-600 py-2 px-3 rounded-md">
                            Đang giao hàng
                          </span>
                        ) : data.Status === 4 ? (
                          <span className="bg-green-600 py-2 px-3 rounded-md">
                            Giao hàng thành công
                          </span>
                        ) : (
                          ""
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ModalGlobal>
        </CSSTransition>
      </div>
    </div>
  );
};

export default OrderDetails;
