import React, { useEffect, useState } from "react";
import ProductGlobal from "./ProductGlobal";
import HeaderProduct from "../Header/HeaderProduct";
import { fetchProduct } from "../../components/functicons/gettAllDataProduct";
import { formatMoney } from "../../components/functicons/formatMoney";

const ProductShirtMen = () => {
  const [dataProduct, setDataProduct] = useState();
  useEffect(() => {
    fetchProduct(setDataProduct);
  }, []);
  if (!dataProduct) return;
  const productShirtMen = dataProduct.filter((item) => {
    return (
      item.ProductCategory.includes("Áo") &&
      item.ProductCategory.includes("nam") &&
      item.ProductDiscount <= 10
    );
  });

  return (
    <div className="screen__container py-12">
      <HeaderProduct ProductTypeName="Áo - Nam"></HeaderProduct>

      <div className="flex justify-center gap-12 flex-wrap">
        {productShirtMen.length > 0 && productShirtMen.map((item, index) => (
          <ProductGlobal
            key={index}
            productSlug={item.ProductSlug}
            productName={item.ProductName}
            productDiscount={item.ProductDiscount}
            productImage={item.ProductImage}
            productPriceOld={formatMoney(item.ProductPrice)}
            productPriceNew={formatMoney(item.ProductPriceNew)}
            width={300}
            height={350}
          ></ProductGlobal>
        ))}
      </div>
    </div>
  );
};

export default ProductShirtMen;
