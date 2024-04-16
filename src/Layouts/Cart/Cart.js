import { faCartShopping, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import iconChooseGood from "../../Assets/image/CircleWavyCheckSmall.png";
import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";
import axios from "axios";
import { urlApi } from "../../Api/urlApi";
const Cart = ({ userId }) => {
  const changeCart = useSelector((state) => state.changeCart.value);
  console.log(changeCart);
  const navigate = useNavigate();
  const [dataCarts, setDataCarts] = useState();
  const [showCart, setShowCart] = useState(false);
  const [render, setRender] = useState(true);
  const handleClickCart = () => {
    setShowCart((cart) => !cart);
  };
  const fetchApiCart = async (userId) => {
    try {
      const res = await axios.get(`${urlApi}/api/carts/${userId}`);
      setDataCarts(res.data.data);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };
  useEffect(() => {
    fetchApiCart(userId);
    // setRender(!render);
  }, [userId, render]);

  const removeFromCart = (cartId) => {
    setDataCarts((prevData) =>
      prevData.filter((item) => item.CartId !== cartId)
    );
  };
  useEffect(() => {
    setRender(!render);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changeCart]);
  if (!dataCarts) return;

  return (
    <>
      <div
        onClick={handleClickCart}
        className="laptop:h-[50px] laptop:w-[50px] mobile:h-[30px] mobile:w-[30px] flex justify-center items-center relative cursor-pointer "
      >
        <div className="laptop:w-[25px] laptop:h-[25px] mobile:w-[15px] mobile:h-[15px] rounded-full bg-red-500 absolute top-0 right-0 flex items-center justify-center text-white font-bold laptop:text-[20px] mobile:text-[14px]">
          {dataCarts?.length}
        </div>
        <FontAwesomeIcon
          icon={faCartShopping}
          className="laptop:text-3xl mobile:text-2xl text-gray-700"
        />
      </div>
      <div className="relative">
        {showCart && (
          <div
            onClick={() => setShowCart(false)}
            className="fixed inset-0 bg-black opacity-70"
          ></div>
        )}
        <div
          className={`laptop:w-[500px] mobile:w-full z-20 bg-slate-50 fixed inset-y-0 right-0 transform ${
            showCart ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-500`}
        >
          <div>
            <div className=" p-4 flex justify-between items-center">
              <h2 className="text-[25px] font-bold">Giỏ hàng</h2>
              <FontAwesomeIcon
                onClick={() => setShowCart(false)}
                icon={faXmark}
                className="text-[25px] cursor-pointer"
              />
            </div>
            <div className="flex items-center gap-5 bg-[#413f3f] w-full p-4 text-white font-medium text-[16px]">
              <img src={iconChooseGood} alt="" />
              <p>Lựu chọn tốt nhất của bạn</p>
            </div>

            <div className="cart__list w-full h-[550px] overflow-scroll pb-16">
              {dataCarts.length > 0 &&
                dataCarts.map((item, index) => (
                  <CartItem
                    key={index}
                    size={item.Size}
                    color={item.Color}
                    quantity={item.Quantity}
                    img={item.ProductImage}
                    name={item.ProductName}
                    price={item.ProductPrice}
                    cartId={item.CartId}
                    userId={item.UserId}
                    productId={item.ProductId}
                    removeFromCart={removeFromCart}
                  ></CartItem>
                ))}
            </div>
            <div
              onClick={() => navigate("/cart")}
              className="flex items-center justify-center w-full absolute bottom-0 bg-white h-[100px] text-center font-medium text-white"
            >
              <div className="w-[90%] bg-black py-3 rounded-md cursor-pointer">
                Chi tiết giỏ hàng
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
