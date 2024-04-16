import React from "react";
import Header from "../Layouts/Header/Header";

import Footer from "../Layouts/Footer/Footer";
import ProductReviews from "../Layouts/Product/ProductReviews";

const ReviewProduct = () => {
  return (
    <div>
      <Header></Header>
      <div className="mt-[110px] h-[100vh] screen__container">
        <ProductReviews></ProductReviews>
      </div>
      <div className="laptop:pt-0 mobile:pt-[220px]">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default ReviewProduct;
