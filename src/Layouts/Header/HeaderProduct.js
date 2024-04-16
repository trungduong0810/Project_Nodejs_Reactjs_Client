import React from "react";

const HeaderProduct = ({ ProductTypeName }) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <img
            src="https://bizweb.dktcdn.net/100/372/651/themes/802187/assets/star.png?1706031018423"
            alt=""
            className="w-[60px] h-[60px]"
          />
          <h1 className="text-2xl font-bold uppercase">{ProductTypeName}</h1>
        </div>
      </div>
      <div className="line w-full h-[2px] bg-slate-300 rounded-full mt-3 mb-10"></div>
    </div>
  );
};

export default HeaderProduct;
