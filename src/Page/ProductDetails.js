import React, { useEffect, useState } from "react";
import Header from "../Layouts/Header/Header";
import SlideImageProduct from "../Layouts/Product/ProductDetails/slideImageProduct";
import InfoProduct from "../Layouts/Product/ProductDetails/InfoProduct";
import InfoProductDetails from "../Layouts/Product/ProductDetails/InfoProductDetails";
import Footer from "../Layouts/Footer/Footer";
import ReviewProduct from "../Layouts/Product/ProductDetails/reviewProduct";
import SimilarProducts from "../Layouts/Product/SimilarProducts";
import { useParams } from "react-router-dom";
import axios from "axios";
import { formatMoney } from "../components/functicons/formatMoney";
import iconShipt from "../Assets/image/iconFreeShip.png";
import iconChangeProduct from "../Assets/image/iconChangeProduct.png";
import iconPayment from "../Assets/image/iconPayment.png";
import iconCall from "../Assets/image/iconCall.jpg";
import { motion } from "framer-motion";
import { urlApi } from "../Api/urlApi";

const ProductDetails = () => {
  const [dataProduct, setDataProduct] = useState();
  const [productId, setProductId] = useState();
  const [slides, setSlides] = useState([]);
  const [productSize, setProductSize] = useState();
  const [productColors, setProductColors] = useState();
  const [productContent, setProductContent] = useState();
  const { slug } = useParams();
  const fetchProductBySlug = async () => {
    const res = await axios(`${urlApi}/api/products/${slug}`);
    if (res.data.data) {
      setDataProduct(res.data.data);
      setProductId(res.data.data.ProductId);
    }
  };
  const fetchProductDetails = async () => {
    if (productId) {
      const res = await axios(`${urlApi}/api/product/details/${productId}`);
      if (res.data.data) {
        setProductContent(res.data.data.ContentProduct);
        setSlides(res.data.data.ProductImages);
      }
    }
  };

  const fetchProductSize = async () => {
    if (productId) {
      const res = await axios(`${urlApi}/api/product/size/${productId}`);
      if (res.data.data) {
        const sizeArray = Object.keys(res.data.data)
          .filter((key) => key.startsWith("size_"))
          .map((key) => res.data.data[key])
          .filter((size) => size !== "0" && size !== "");
        setProductSize(sizeArray);
      }
    }
  };

  const fetchProductColor = async () => {
    if (productId) {
      const res = await axios(`${urlApi}/api/product/color/${productId}`);
      if (res.data.data) {
        const colorArray = Object.entries(res.data.data)
          .filter(
            ([key, value]) =>
              key !== "ProductId" &&
              key !== "colorId" &&
              key !== "createdAt" &&
              key !== "updatedAt" &&
              value !== "0" &&
              value !== ""
          )
          .map(([key, value]) => value);
        setProductColors(colorArray);
      }
    }
  };

  useEffect(() => {
    fetchProductBySlug();
    window.scrollTo({
      top: 0,
      // behavior: "smooth",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  useEffect(() => {
    fetchProductDetails();
    fetchProductSize();
    fetchProductColor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);
  if (!dataProduct) return;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <Header></Header>
      <div className="screen__container ">
        <div className="mt-[100px] laptop:flex laptop:justify-between">
          <SlideImageProduct slides={slides}></SlideImageProduct>
          <InfoProduct
            productName={dataProduct.ProductName}
            productPrice={formatMoney(dataProduct.ProductPriceNew)}
            productSize={productSize}
            productColor={productColors}
            productId={dataProduct.ProductId}
            productImage={dataProduct.ProductImage}
            productDesc={dataProduct.ProductDesc}
            productContent={productContent}
          ></InfoProduct>
          <div className="laptop:w-[20%] laptop:pt-0 mobile:w-full mobile:pt-[300px] font-medium text-gray-700">
            <div className="flex items-center gap-4  border-b-2 py-4">
              <img src={iconShipt} alt="" className="w-[50px]" />
              <div>
                <p className="uppercase font-bold">Giao hàng</p>
                <p className="text-[14px] text-gray-500">
                  Miễn phí trên toàn quốc
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4  border-b-2 py-4">
              <img src={iconChangeProduct} alt="" className="w-[50px]" />
              <div>
                <p className="uppercase font-bold">Đổi trả miển phí</p>
                <p className="text-[14px] text-gray-500">
                  Đổi trả miễn phí 7 ngày
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4  border-b-2 py-4">
              <img src={iconPayment} alt="" className="w-[50px]" />
              <div>
                <p className="uppercase font-bold">Thanh toán</p>
                <p className="text-[14px] text-gray-500">
                  Thanh toán khi nhận hàng
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4  border-b-2 py-4">
              <img src={iconCall} alt="" className="w-[50px]" />
              <div>
                <p className="uppercase font-bold">Hỗ trợ mua nhanh</p>
                <p className="text-[20px] text-red-500 font-bold py-1">
                  0933024811
                </p>
                <p className="text-[14px] text-gray-500">
                  Từ 8:30 - 21:30 mỗi ngày
                </p>
              </div>
            </div>
          </div>
        </div>
        <InfoProductDetails
          productContent={productContent}
        ></InfoProductDetails>
        <ReviewProduct productName={dataProduct?.ProductName}></ReviewProduct>
      </div>
      <SimilarProducts productId={productId}></SimilarProducts>
      <Footer></Footer>
    </motion.div>
  );
};

export default ProductDetails;
