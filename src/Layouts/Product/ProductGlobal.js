import React from "react";
import { useNavigate } from "react-router-dom";

const ProductGlobal = ({
  width,
  height,
  productName,
  productImage,
  productDiscount,
  productPriceNew,
  productPriceOld,
  productSlug,
}) => {
  const navigate = useNavigate();
  return (
    <div>
      <div
        onClick={() => navigate(`/productDetails/${productSlug}`)}
        className={`w-[${width}px] relative group cursor-pointer`}
      >
        <div
          className={`overplay h-[${height}px] absolute rounded-lg bg-black opacity-0  group-hover:opacity-30 inset-0 transition-all`}
        ></div>
        <img
          src={productImage}
          alt=""
          className={`h-[${height}px] w-[${width}px] rounded-lg`}
        />
        <p className="text-center text-[20px] mt-4 font-medium text-gray-600">
          {productName}
        </p>
        <div className="flex justify-center items-center gap-10 text-lg mt-2">
          <p className="price__new font-medium">
            {productPriceNew}
            <span class="currency">₫</span>
          </p>
          <s
            className={`price__old text-gray-300 ${
              productDiscount === 0 ? "hidden" : ""
            }`}
          >
            {productPriceOld}
            <span class="currency">₫</span>
          </s>
        </div>

        {productDiscount === 0 ? (
          <div className="discount flex items-center justify-center w-[70px] h-[30px] bg-black text-[14px] font-semibold text-white absolute top-4 left-0">
            New
          </div>
        ) : (
          <div className="discount flex items-center justify-center w-[70px] h-[30px] bg-discount text-[14px] font-semibold text-white absolute top-4 left-0">
            {" "}
            Sale -{productDiscount}%
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGlobal;
