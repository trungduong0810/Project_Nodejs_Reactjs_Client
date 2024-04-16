import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
const ColorProduct = ({ color, bgColor, onSelectedColor }) => {
  const handleColorSelect = () => {
    onSelectedColor(color);
  };
  return (
    <div>
      <div
        style={{
          backgroundColor: bgColor,
        }}
        className={`relative color__group w-[30px] h-[30px] rounded-lg shadow-slate-300 shadow overflow-hidden `}
      >
        <input
          type="radio"
          name="colorProduct"
          id={color}
          hidden
          onChange={handleColorSelect}
        />
        <div className="checked__color-product absolute  top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-gray-600 text-xl font-semibold opacity-0">
          <FontAwesomeIcon icon={faCheck} />
        </div>
        <label
          htmlFor={color}
          className=" absolute color__label block inset-0 cursor-pointer "
        ></label>
      </div>
    </div>
  );
};

export default ColorProduct;
