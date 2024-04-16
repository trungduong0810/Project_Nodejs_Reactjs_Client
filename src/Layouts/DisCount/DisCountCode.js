import React from "react";
import ButtonGlobal from "../../components/button/ButtonGlobal";

const DisCountCode = ({
  img,
  percent,
  miniOrderPrice,
  dateStart,
  codeDiscount,
}) => {
  return (
    <div className="z-30">
      <div className="laptop:w-auto mobile:w-[70vw] bg-red-800 rounded-lg flex items-center justify-center gap-5 px-3 py-[12px] ">
        <div>
          <img src={img} alt="" className="w-[70px] h-[70px] rounded-full" />
        </div>
        <div className="text-white text-[16px]">
          <h2 className="font-bold mb-1">Giảm {percent}%</h2>
          <p className="mb-1">Đơn hàng tối thiểu {miniOrderPrice} vnđ</p>
          <p className="mb-2 text-[14px]">Kể từ ngày: {dateStart}</p>
          <div className="bg-white text-center text-red-500 font-semibold py-1 rounded-lg">
            {codeDiscount}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisCountCode;
