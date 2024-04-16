import React, { useEffect, useState } from "react";
import ProductGlobal from "./ProductGlobal";
import { fetchProduct } from "../../components/functicons/gettAllDataProduct";
import { formatMoney } from "../../components/functicons/formatMoney";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
const SimilarProducts = ({ productId }) => {
  const { slug } = useParams();
  const [dataProduct, setDataProduct] = useState();
  useEffect(() => {
    fetchProduct(setDataProduct);
  }, []);
  if (!dataProduct) return;
  const firstPartOfSlug = slug.split("-")[0];
  const productSimilar = dataProduct.filter((item) => {
    return (
      item.ProductSlug.includes(firstPartOfSlug) && item.ProductId !== productId
    );
  });
  return (
    <div className="screen__container pb-12">
      <h1 className="text-center text-4xl font-bold mb-12 text-gray-700">
        Bạn có thể thích
      </h1>
      <Swiper
        style={{ zIndex: 0, paddingBottom: "100px" }}
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={0}
        slidesPerView={4}
        navigation
        pagination={{ clickable: true }}
        onSwiper={(swiper) => {
          return swiper;
        }}
        onSlideChange={() => console.log("slide change")}
      >
        {productSimilar.length > 0 &&
          productSimilar.map((item, index) => (
            <SwiperSlide style={{ zIndex: 1 }}>
              <ProductGlobal
                key={index}
                productId={item.ProductId}
                productSlug={item.ProductSlug}
                productName={item.ProductName}
                productDiscount={item.ProductDiscount}
                productImage={item.ProductImage}
                productPriceOld={formatMoney(item.ProductPrice)}
                productPriceNew={formatMoney(item.ProductPriceNew)}
                width={300}
                height={350}
              ></ProductGlobal>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default SimilarProducts;
