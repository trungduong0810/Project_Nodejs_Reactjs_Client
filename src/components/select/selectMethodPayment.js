import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { selectMethodPay } from "../../Redux/selectMethodPay";
const SelectMethodPayment = () => {
  const dispatch = useDispatch();
  const handleChange = (event) => {
    dispatch(selectMethodPay(event.target.value));
  };

  return (
    <div className="mt-7">
      <div className="w-full border border-teal-400 rounded-lg py-3 px-4">
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            onChange={handleChange}
          >
            <div className="flex flex-col gap-3 ml-5">
              <FormControlLabel
                value="PaymentOnDelivery"
                control={<Radio color="success" />}
                label={
                  <div className="flex items-center gap-3">
                    <img
                      src="https://bepchinhhang.com/Data/images/chinh-sach/thanh-toan.png"
                      alt=""
                      className="w-[30px] h-[30px]"
                    />
                    <p>Thanh toán khi nhận hàng</p>
                  </div>
                }
              />
              <FormControlLabel
                value="VNPayQr"
                control={<Radio color="success" />}
                label={
                  <div className="flex items-center gap-3">
                    <img
                      src="https://jeju.com.vn/wp-content/uploads/2020/05/vnpay-qr-23-06-2020-2.jpg"
                      alt=""
                      className="w-[30px] h-[30px]"
                    />
                    <div className="flex items-center gap-3">
                      <p>Thanh toán quét mã</p>
                      <img
                        src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-VNPAY-QR-768x143.png"
                        alt=""
                        className="w-[100px]"
                      />
                    </div>
                  </div>
                }
              />

              <FormControlLabel
                value="PaymentMoMo"
                control={<Radio color="success" />}
                label={
                  <div className="flex items-center gap-3">
                    <img
                      src="https://static.mservice.io/img/logo-momo.png"
                      alt=""
                      className="w-[30px] h-[30px]"
                    />
                    <p>Thanh toán qua ví MoMo</p>
                  </div>
                }
              />

              <FormControlLabel
                value="PaymentZaloPay"
                control={<Radio color="success" />}
                label={
                  <div className="flex items-center">
                    <img
                      src="https://cardtot.com/wp-content/uploads/2020/01/zalopay.png"
                      alt=""
                      className="w-[30px] h-[30px]"
                    />
                    <p>Thanh toán qua zalo pay</p>
                  </div>
                }
              />
            </div>
          </RadioGroup>
        </FormControl>
      </div>
    </div>
  );
};

export default SelectMethodPayment;
