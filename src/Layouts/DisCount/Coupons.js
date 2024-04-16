import React, { useEffect, useState } from "react";
import discount from "../../Assets/image/discount.jpg";
import DisCountLogo from "./DisCountLogo";
import DisCountCode from "./DisCountCode";
import axios from "axios";
import { formatMoney } from "../../components/functicons/formatMoney";
import { dateFormat } from "../../Admin/components/formatDate";
import { urlApi } from "../../Api/urlApi";

const Coupons = () => {
  const [dataDiscount, setDataDiscount] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${urlApi}/api/discount`);
      setDataDiscount(res.data.discounts);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="laptop:p-7 mobile:py-5 mobile:px-2">
      <DisCountLogo></DisCountLogo>

      <div className="flex justify-center items-center gap-3 w-full flex-wrap">
        <div className="laptop:w-[35%] mobile:w-[100%] z-[999]  text-[25px] text-center font-bold text-orange-400">
          <img src={discount} alt="" className="w-full h-[200px] rounded-lg" />
          <h1 className="mobile:text-[16px] laptop:text-[25px]">Nhập mã xịn giảm giá cực sốc</h1>
        </div>
        <div className="flex items-center justify-center gap-5 flex-wrap w-[60%] ">
          {dataDiscount &&
            dataDiscount.map((item, index) => (
              <DisCountCode
                key={index}
                img={
                  item.DiscountPercent === 10
                    ? "https://i.pinimg.com/564x/66/de/aa/66deaa4d5fb4d04ffd73a2f75e2ada1b.jpg"
                    : item.DiscountPercent === 15
                    ? "https://i.pinimg.com/564x/01/e4/00/01e400ee80077e6804f8d5478b60f807.jpg"
                    : item.DiscountPercent === 20
                    ? "https://i.pinimg.com/564x/59/5d/8d/595d8d96ff596aa01e07c3b2a4fa7644.jpg"
                    : item.DiscountPercent === 25
                    ? "https://i.pinimg.com/564x/c5/68/f9/c568f9c5c6c8616eaab9030d6e3608c5.jpg"
                    : item.DiscountPercent === 50
                    ? "https://i.pinimg.com/564x/68/7c/78/687c789fbbad0dcc75c4ec36e91f08c1.jpg"
                    : item.DiscountPercent > 50
                    ? "https://i.pinimg.com/564x/66/22/62/66226264aa748e34f24da3726964dda4.jpg"
                    : "https://i.pinimg.com/564x/76/89/fa/7689fa1353d27162470b6e205d4bc849.jpg"
                }
                percent={item.DiscountPercent}
                miniOrderPrice={formatMoney(item.TotalOrderPriceLarger)}
                dateStart={dateFormat(item.createdAt).substring(
                  0,
                  dateFormat(item.createdAt).indexOf(" ")
                )}
                codeDiscount={item.DiscountCode}
              ></DisCountCode>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Coupons;
