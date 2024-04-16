import React, { useEffect, useState } from "react";
import HeaderProduct from "../Header/HeaderProduct";
import ProductGlobal from "./ProductGlobal";
import { formatMoney } from "../../components/functicons/formatMoney";
import { fetchProduct } from "../../components/functicons/gettAllDataProduct";

const ProductPantsMen = () => {
  const [dataProduct, setDataProduct] = useState();
  useEffect(() => {
    fetchProduct(setDataProduct);
  }, []);
  if (!dataProduct) return;
  const ProductPantsMen = dataProduct.filter((item) => {
    return (
      item.ProductCategory.includes("Quần") &&
      item.ProductCategory.includes("nam") &&
      item.ProductDiscount < 10
    );
  });
  return (
    <div>
      <div className="screen__container py-12">
        <HeaderProduct ProductTypeName="Quần - Nam"></HeaderProduct>

        <div className="flex justify-center gap-12 flex-wrap">
          {ProductPantsMen.map((item, index) => (
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
    </div>
  );
};

export default ProductPantsMen;
