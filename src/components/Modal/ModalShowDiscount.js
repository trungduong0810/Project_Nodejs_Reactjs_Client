import React from "react";
import { CSSTransition } from "react-transition-group";
import ModalGlobal from "./ModalGlobal";
import ButtonGlobal from "../button/ButtonGlobal";
import Coupons from "../../Layouts/DisCount/Coupons";
const ModalShowDiscount = ({ openModal, setOpenModal }) => {
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
            bodyClass="w-[90%] bg-white p-7 p-b rounded-lg infoUser"
            styleBody={{
              transition: "all 0.25s linear",
            }}
          >
            <Coupons></Coupons>
          </ModalGlobal>
        </CSSTransition>
      </div>
    </div>
  );
};

export default ModalShowDiscount;
