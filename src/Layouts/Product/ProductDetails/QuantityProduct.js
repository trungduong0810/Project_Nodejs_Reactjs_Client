import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
const QuantityProduct = ({
  classNameWrapper,
  classNameLabel,
  classNameDe,
  classNameIn,
  classNameQuantity,
  classNameIcon,
  onQuantityChange,
  quantityCart
}) => {
  const [quantity, setQuantity] = useState(quantityCart || 0);
  const handleDecrement = () => {
    if (quantity <= 0) {
      return quantity;
    }
    const newQuantity = quantity - 1;
    setQuantity(newQuantity);
    onQuantityChange(newQuantity);
  };
  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(newQuantity);
  };
  return (
    // <div className="flex items-center gap-[23%] py-[15px] border-b-2 border-gray-200">
    //   <span className="text-xl font-medium text-gray-500 ">Số lượng:</span>
    //   <div className="flex items-center gap-3"></div>

    <div className={`${classNameWrapper}`}>
      <span className={`${classNameLabel}`}>Số lượng:</span>
      <div className="flex items-center gap-3">
        <div
          onClick={handleDecrement}
          className={`${classNameDe} cursor-pointer`}
        >
          <FontAwesomeIcon icon={faMinus} className={classNameIcon} />
        </div>
        <div className={`${classNameQuantity} cursor-pointer`}>{quantity}</div>
        <div
          onClick={handleIncrement}
          className={`${classNameIn} cursor-pointer`}
        >
          <FontAwesomeIcon icon={faPlus} className={classNameIcon} />
        </div>
      </div>
    </div>
  );
};

export default QuantityProduct;
