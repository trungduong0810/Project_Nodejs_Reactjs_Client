/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import ProductGlobal from "./ProductGlobal";
import { fetchProduct } from "../../components/functicons/gettAllDataProduct";
import { formatMoney } from "../../components/functicons/formatMoney";
import { useSelector } from "react-redux";
const AllProduct = () => {
  const [dataProduct, setDataProduct] = useState();
  const filterProduct = useSelector((state) => state.filterTypeProduct.value);
  const searchValue = useSelector((state) => state.searchProduct.value);
  useEffect(() => {
    fetchProduct(setDataProduct);
  }, []);

  if (!dataProduct) return;
  const dataFilterProduct = dataProduct.filter((item) => {
    if (filterProduct === "allProduct") {
      return dataProduct;
    } else if (filterProduct === "<100") {
      return item.ProductPrice < 100000;
    } else if (filterProduct === ">=100 <=200") {
      return item.ProductPrice > 100000 && item.ProductPrice <= 200000;
    } else if (filterProduct === ">200 <=300") {
      return item.ProductPrice > 200000 && item.ProductPrice <= 300000;
    } else if (filterProduct === ">300 <=500") {
      return item.ProductPrice > 300000 && item.ProductPrice <= 500000;
    } else if (filterProduct === ">500 <=1000") {
      return item.ProductPrice > 500000 && item.ProductPrice <= 1000000;
    } else if (filterProduct === ">1000") {
      return item.ProductPrice > 1000000;
    } else {
      return item.ProductCategory === filterProduct;
    }
  });

  const dataSearchProduct = dataProduct.filter((item) => {
    if (searchValue) {
      return item.ProductName.toLowerCase().includes(searchValue.toLowerCase());
    }
  });

  return (
    <div className="w-full">
      <div className="flex justify-between w-full">
        <h2 className="uppercase text-xl font-[500] mb-5">Tất cả sản phẩm</h2>
      </div>

      <div className="flex justify-center gap-7 flex-wrap">
        {!filterProduct &&
          !searchValue &&
          dataProduct.map((item, index) => (
            <ProductGlobal
              key={index}
              productName={item.ProductName}
              productDiscount={item.ProductDiscount}
              productImage={item.ProductImage}
              productPriceOld={formatMoney(item.ProductPrice)}
              productPriceNew={formatMoney(item.ProductPriceNew)}
              width={250}
              height={300}
              productSlug={item.ProductSlug}
            />
          ))}

        {filterProduct &&
          !searchValue &&
          dataFilterProduct.map((item, index) => (
            <ProductGlobal
              key={index}
              productName={item.ProductName}
              productDiscount={item.ProductDiscount}
              productImage={item.ProductImage}
              productPriceOld={formatMoney(item.ProductPrice)}
              productPriceNew={formatMoney(item.ProductPriceNew)}
              width={250}
              height={300}
              productSlug={item.ProductSlug}
            />
          ))}

        {(filterProduct || !filterProduct) &&
          searchValue &&
          dataSearchProduct.map((item, index) => (
            <ProductGlobal
              key={index}
              productName={item.ProductName}
              productDiscount={item.ProductDiscount}
              productImage={item.ProductImage}
              productPriceOld={formatMoney(item.ProductPrice)}
              productPriceNew={formatMoney(item.ProductPriceNew)}
              width={250}
              height={300}
              productSlug={item.ProductSlug}
            />
          ))}
      </div>
    </div>
  );
};

export default AllProduct;
