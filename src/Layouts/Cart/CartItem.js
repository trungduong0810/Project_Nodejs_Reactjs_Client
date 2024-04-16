import React, { useState } from "react";
import QuantityProduct from "../Product/ProductDetails/QuantityProduct";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast } from "react-toastify";
import { formatMoney } from "../../components/functicons/formatMoney";
import { urlApi } from "../../Api/urlApi";

const CartItem = ({
  size,
  color,
  quantity,
  img,
  price,
  name,
  cartId,
  userId,
  productId,
  removeFromCart,
}) => {
  const [selectedQuantity, setSelectedQuantity] = useState(quantity);
  const handleQuantityChange = (quantity) => {
    setSelectedQuantity(quantity);
  };

  const deleteApiCart = async (userId, productId, cartId) => {
    const res = await axios.delete(
      `${urlApi}/api/carts/${userId}`,
      {
        data: {
          productId: productId,
          cartId: cartId,
        },
      }
    );
    if (res && res.data.status === "Success") {
      toast.success("Xóa sản phẩm thành công", {
        pauseOnHover: false,
      });
      removeFromCart(cartId);
    } else {
      toast.error("Xóa sản phẩm không thành công", {
        pauseOnHover: false,
      });
    }
  };

  const handleDeleteCartItem = () => {
    deleteApiCart(userId, productId, cartId);
  };

  return (
    <div>
      <div className="py-5 px-4 pr-6 hover:bg-slate-300 cursor-pointer transition-all border-b-2 relative">
        <div className="flex items-center gap-5">
          <img src={img} alt="" className="w-[100px] h-[100px] rounded-sm" />
          <div className="text-gray-600 text-[14px] font-medium w-full">
            <h2 className="text-[15px] font-bold">{name}</h2>
            <div className="flex items-center justify-between mt-2 w-full">
              <p>Màu sắc: {color}</p>
              <p>Size: {size}</p>
            </div>
            <div className="flex items-center justify-between mt-3 text-[16px]">
              <QuantityProduct
                classNameIcon="text-[12px] w-[15px] h-[15px] border text-center p-[2px] rounded-sm  "
                classNameWrapper="flex items-center gap-3"
                classNameLabel="text-[14px]"
                onQuantityChange={handleQuantityChange}
                quantityCart={quantity}
              ></QuantityProduct>
              <span>{formatMoney(price * quantity)} đ</span>
            </div>
          </div>
        </div>
        <div>
          <FontAwesomeIcon
            onClick={handleDeleteCartItem}
            icon={faXmark}
            className="text-[16px] cursor-pointer absolute top-6 right-3"
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
