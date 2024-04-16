import React, { useEffect, useState } from "react";
import SizeProduct from "./SizeProduct";
import QuantityProduct from "./QuantityProduct";
import ColorProduct from "./ColorProduct";
import ButtonGlobal from "../../../components/button/ButtonGlobal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { getData } from "../../../Api/getDataUser";
import axios from "axios";
import Swal from "sweetalert2";
import { formatMoneyCart } from "../../../components/functicons/formatMoney";
import { CSSTransition } from "react-transition-group";
import ModalGlobal from "../../../components/Modal/ModalGlobal";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { infoOrder } from "../../../Redux/infoOrderProduct";
import { changeCart } from "../../../Redux/updateCart";
import { urlApi } from "../../../Api/urlApi";

const InfoProduct = ({
  productName,
  productPrice,
  productId,
  productSize,
  productColor,
  productImage,
  productDesc,
  productContent,
}) => {
  const dispatch = useDispatch();
  const accessToken = Cookies.get("accessToken");
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [dataCart, setDataCart] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [contentModalSize, setContentModalSize] = useState("");
  const [updateCart, setUpdateCart] = useState(false);

  useEffect(() => {
    getData(accessToken, setUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataCart, updateCart]);
  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };
  const handleColorSelect = (colors) => {
    let color = "";
    if (colors === "black") color = "Đen";
    if (colors === "blue") color = "Xanh dương";
    if (colors === "#F0E68C") color = "Vàng đất";
    if (colors === "gray") color = "Xám";
    if (colors === "orange") color = "Cam";
    if (colors === "#FFFAFA") color = "Trắng";
    if (colors === "red") color = "Đỏ";
    if (colors === "#FFC0CB") color = "Hồng nhạt";
    if (colors === "green") color = "Xanh rêu";
    if (colors === "#DA70D6") color = "Tím";
    setSelectedColor(color);
  };

  const handleQuantityChange = (quantity) => {
    setSelectedQuantity(quantity);
  };

  const postAddCart = (
    userId,
    productId,
    productName,
    productImage,
    productPrice,
    size,
    color,
    quantity
  ) => {
    axios
      .post(`${urlApi}/api/carts`, {
        userId: userId,
        productId: productId,
        productName: productName,
        productImage: productImage,
        productPrice: productPrice,
        size: size,
        color: color,
        quantity: quantity,
      })
      .then(function (response) {
        if (response.data.status === "Success") {
          Swal.fire({
            title: "Thành công",
            text: "Bạn đã thêm sản phẩm vào giỏ hàng",
            icon: "success",
          });
          setDataCart(response.data.data);
          setUpdateCart(true);
        } else {
          Swal.fire({
            title: "Thất bật",
            text: "Thêm sản phẩm vào giỏ hàng thất bại",
            icon: "error",
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleBuyProduct = () => {
    if (selectedSize === null) {
      toast.error("Vui lòng chọn size sản phẩm", {
        pauseOnHover: false,
      });
    } else if (selectedColor === null) {
      toast.error("Vui lòng chọn màu sản phẩm", {
        pauseOnHover: false,
      });
    } else if (selectedQuantity === 0) {
      toast.error("Vui lòng nhập số lượng", {
        pauseOnHover: false,
      });
    } else if (user) {
      navigate("/payment");
      dispatch(
        infoOrder({
          ProductImage: productImage,
          ProductName: productName,
          ProductPrice: productPrice,
          ProductSize: selectedSize,
          ProductColor: selectedColor,
          ProductQuantity: selectedQuantity,
        })
      );
    } else {
      Swal.fire({
        title: "Thất bại",
        text: "Bạn chưa đăng nhập tài khoản",
        icon: "error",
      });
    }
  };

  const handleAddCart = () => {
    if (selectedSize === null) {
      toast.error("Vui lòng chọn size sản phẩm", {
        pauseOnHover: false,
      });
    } else if (selectedColor === null) {
      toast.error("Vui lòng chọn màu sản phẩm", {
        pauseOnHover: false,
      });
    } else if (selectedQuantity === 0) {
      toast.error("Vui lòng nhập số lượng", {
        pauseOnHover: false,
      });
    } else {
      if (user && productId) {
        postAddCart(
          user.id,
          productId,
          productName,
          productImage,
          formatMoneyCart(productPrice),
          selectedSize,
          selectedColor,
          selectedQuantity
        );
        dispatch(changeCart(updateCart));
      } else {
        Swal.fire({
          title: "Thất bại",
          text: "Bạn chưa đăng nhập tài khoản",
          icon: "error",
        });
      }
    }
  };
  useEffect(() => {
    if (productContent) {
      const urlImageSize = JSON.stringify(productContent.match(/'(.*?)'/g));
      setContentModalSize(
        urlImageSize
          .replace(/^\[|\]$/g, "")
          .replace(/'/g, "")
          .replace(/"/g, "")
      );
    }
  }, [productContent]);

  const handleModal = () => {
    setOpenModal(true);
  };

  return (
    <div className="laptop:w-[40%]">
      <div className="w-[100%] h-[500px] p-3">
        <div className="pb-[20px] border-b-2 border-gray-200">
          <h2 className="text-[25px] font-bold text-gray-800">{productName}</h2>
          <p className="mt-4 text-gray-600">{productDesc}</p>
        </div>
        <div className="flex items-center gap-[22%] py-3 border-b-2 border-gray-200 w-full">
          <span className="laptop:text-xl font-medium text-gray-500">
            Giá bán:
          </span>
          <div class="text-[40px] font-bold text-teal-600 text-center">
            {productPrice} ₫
          </div>
        </div>
        <div className="laptop:flex justify-between gap-3 mt-5 pb-[20px] border-b-2 border-gray-200 ">
          <div className="laptop:w-[50%]">
            <div className="flex items-end">
              <span className="text-xl font-medium text-gray-500">Size:</span>
              <div
                onClick={handleModal}
                className="text-[15px] font-medium text-blue-600 ml-3 cursor-pointer"
              >
                <span>Xem hướng dẫn chọn size</span>
              </div>
            </div>
            <div className="flex items-center gap-x-3 gap-y-2 mt-3 flex-wrap">
              {productSize &&
                productSize.map((item, index) => (
                  <SizeProduct
                    key={index}
                    sizeNumber={item}
                    onSizeSelect={handleSizeSelect}
                  ></SizeProduct>
                ))}
            </div>
          </div>
          <div className="laptop:w-[50%]">
            <span className="text-xl font-medium text-gray-500">Màu sắc:</span>
            <div className="flex items-center gap-x-3 gap-y-5 mt-5 flex-wrap">
              {productColor &&
                productColor.map((item, index) => (
                  <ColorProduct
                    key={index}
                    color={item}
                    bgColor={item}
                    onSelectedColor={handleColorSelect}
                  ></ColorProduct>
                ))}
            </div>
          </div>
        </div>
        <QuantityProduct
          classNameWrapper="flex items-center gap-[25%] py-[15px] border-b-2 border-gray-200"
          classNameDe="bg-gray-700 rounded-lg py-[4px] px-[8px] hover:opacity-[0.9]"
          classNameIn="bg-gray-700 rounded-lg py-[4px] px-[8px] hover:opacity-[0.9]"
          classNameIcon="text-xl text-white"
          classNameQuantity="text-[22px] font-semibold w-[20px] text-center"
          classNameLabel="text-xl font-medium text-gray-500"
          onQuantityChange={handleQuantityChange}
        ></QuantityProduct>
        <div className="laptop:flex laptop:flex-row laptop:justify-center laptop:items-center gap-5 mt-5 mobile:flex mobile:flex-col mobile:justify-center">
          <ButtonGlobal
            onClick={handleAddCart}
            style={{
              width: "150px",
              height: "50px",
              backgroundColor: "#FF7F50",
              fontSize: "20px",
              margin: "auto",
              lineHeight: "50px",
            }}
          >
            <FontAwesomeIcon
              icon={faCartShopping}
              className="text-3xl text-white cursor-pointer"
            />
          </ButtonGlobal>

          <ButtonGlobal
            onClick={handleBuyProduct}
            style={{
              width: "100%",
              height: "50px",
              backgroundColor: "#B22222",
              fontSize: "20px",
              lineHeight: "50px",
            }}
            className="mobile:w-[100%]"
          >
            Mua ngay
          </ButtonGlobal>
        </div>
      </div>
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
            bodyClass="laptop:w-[60%] mobile:w-[90%] bg-white p-7 p-b rounded-lg infoUser"
            styleBody={{
              transition: "all 0.25s linear",
            }}
          >
            <div className="text-black text-center bg-white">
              <h2 className="text-2xl font-bold  mb-4 text-teal-600">
                Thông số size chi tiết
              </h2>
              <div>
                <img
                  src={contentModalSize}
                  alt=""
                  loading="lazy"
                  className="w-[90%] mx-auto h-[400px] rounded-lg object-contain"
                />
              </div>
            </div>
          </ModalGlobal>
        </CSSTransition>
      </div>
    </div>
  );
};

export default InfoProduct;
