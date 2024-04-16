import React from "react";

const SizeProduct = ({ sizeNumber, onSizeSelect }) => {
  const handleSizeSelect = () => {
    onSizeSelect(sizeNumber);
  };
  return (
    <div>
      <div className="size__group ">
        <input
          type="radio"
          name="size"
          id={sizeNumber}
          hidden
          onChange={handleSizeSelect}
        />
        <label
          htmlFor={sizeNumber}
          className="w-[35px] h-[35px] size__label block text-center leading-[30px] border-green-600 border text-sm font-medium rounded-lg cursor-pointer"
        >
          <span> {sizeNumber}</span>
        </label>
      </div>
    </div>
  );
};

export default SizeProduct;
