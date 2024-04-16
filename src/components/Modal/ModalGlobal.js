import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
const createPortalElement = () => {
  const element = document.createElement("div");
  element.id = "portal__wrapper";
  return element;
};
const portalWrapper = createPortalElement();
const ModalGlobal = ({
  visible = false,
  containerClass = "",
  bodyClass = "",
  styleContainer = {},
  styleBody = {},
  onclose = () => {},
  children,
}) => {
  useEffect(() => {
    document.body.appendChild(portalWrapper);
  }, []);

  const renderContent = (
    <div>
      <div
        className={`fixed inset-0 z-[99] ${containerClass}`}
        style={styleContainer}
      >
        <div
          onClick={onclose}
          className="overlay absolute inset-0 bg-black bg-opacity-70 z-10"
        ></div>
        <div
          className={`absolute content z-[99] ${bodyClass}`}
          style={styleBody}
        >
          <div
            onClick={onclose}
            className="close cursor-pointer absolute flex items-center justify-center z-[999] top-[-15px] right-[-15px] bg-gray-200 h-8 w-8 rounded-full"
          >
            <FontAwesomeIcon icon={faXmark} className="text-red-700 " />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
  return createPortal(renderContent, portalWrapper);
};

ModalGlobal.propTypes = {
  visible: PropTypes.bool,
  containerClass: PropTypes.string,
  bodyClass: PropTypes.string,
  styleContainer: PropTypes.object,
  styleBody: PropTypes.object,
  onclose: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default ModalGlobal;
