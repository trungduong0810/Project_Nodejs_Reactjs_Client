import React, { useEffect, useState } from "react";
import ProductGlobal from "./ProductGlobal";
import { formatMoney } from "../../components/functicons/formatMoney";
import { fetchProduct } from "../../components/functicons/gettAllDataProduct";

const ProductOutstanding = () => {
  const [dataProduct, setDataProduct] = useState();
  useEffect(() => {
    fetchProduct(setDataProduct);
  }, []);

  if (!dataProduct) return;
  const discountedProducts = dataProduct.filter(
    (item) => item.ProductDiscount > 10
  );
  return (
    <div className="bg-gray-100 py-8">
      <div className="screen__container">
        <h1 className="text-center text-4xl font-bold">Sản phẩm nổi bật</h1>
        <div className="flex justify-center gap-12 flex-wrap mt-12 ">
          {discountedProducts.map((item, index) => (
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductOutstanding;
