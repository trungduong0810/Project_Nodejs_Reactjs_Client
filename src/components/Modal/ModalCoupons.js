import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import ModalGlobal from "./ModalGlobal";
import Coupons from "../../Layouts/DisCount/Coupons";

const ModalCoupons = () => {
  const [openModal, setOpenModal] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (initialLoad) {
      const timeout = setTimeout(() => {
        setOpenModal(true);
        setInitialLoad(false);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [initialLoad]);

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
            bodyClass="w-[80%] bg-white rounded-lg"
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

export default ModalCoupons;
