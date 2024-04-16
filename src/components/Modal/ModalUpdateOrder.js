import React, { useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import ModalGlobal from "./ModalGlobal";
import SelectUpdateOrder from "../select/selectUpdateOrder";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { validateUpdateOrderStatus } from "../../Validation/validateUpdateOrderStatus";
import ButtonGlobal from "../button/ButtonGlobal";
import { toast } from "react-toastify";
import axios from "axios";
import Swal from "sweetalert2";
import { urlApi } from "../../Api/urlApi";

const ModalUpdateOrder = ({ openModal, setOpenModal, orderId, setUpdate }) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(validateUpdateOrderStatus),
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

  const handleUpdateStatus = (value) => {
    if (!isValid) return;
    // console.log(value.updateOrderStatus.value);
    updateOrderStatus(orderId, value.updateOrderStatus.value);
  };

  const updateOrderStatus = async (orderId, status) => {
    const res = await axios.put(`${urlApi}/api/orders/${orderId}`, {
      status,
    });
    if (res.status === 200) {
      Swal.fire({
        title: "Thành công",
        text: "Trạng thái đơn hàng đã được cập nhật",
        icon: "success",
      });
      setOpenModal(false);
      setUpdate(true);
    } else {
      Swal.fire({
        icon: "error",
        title: "Thất bại",
        text: "Trạng thái đơn hàng đang gặp lỗi!",
      });
    }
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
            bodyClass="w-[30%] bg-white p-7 p-b rounded-lg infoUser"
            styleBody={{
              transition: "all 0.25s linear",
            }}
          >
            <div className="text-black text-center bg-white">
              <h2 className="text-2xl font-bold  mb-4 text-teal-600">
                Trạng thái đơn hàng
              </h2>
              <form
                action=""
                onSubmit={handleSubmit(handleUpdateStatus)}
                className="flex flex-col gap-5 mt-5"
              >
                <SelectUpdateOrder
                  control={control}
                  name="updateOrderStatus"
                  placeholder="Trạng thái đơn hàng"
                ></SelectUpdateOrder>
                <ButtonGlobal
                  type="submit"
                  style={{ fontSize: "18px", height: "40px", width: "100%" }}
                  color="success"
                >
                  Cập nhật
                </ButtonGlobal>
              </form>
            </div>
          </ModalGlobal>
        </CSSTransition>
      </div>
    </div>
  );
};

export default ModalUpdateOrder;
