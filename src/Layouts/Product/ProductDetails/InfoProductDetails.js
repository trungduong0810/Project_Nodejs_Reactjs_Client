import React from "react";

const InfoProductDetails = ({ productContent }) => {
  return (
    <div className="laptop:mt-[150px] mobile:mt-[50px] info-product-details laptop:w-[70%] mx-auto overflow-wrap-break-word">
      <div dangerouslySetInnerHTML={{ __html: productContent }}></div>
    </div>
  );
};

export default InfoProductDetails;
