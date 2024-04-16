import React from "react";
import Logo from "../../Assets/image/logo.webp";
import {
  faEnvelopesBulk,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
const Footer = () => {
  return (
    <div className="w-full bg-bgFooter">
      <div className="screen__container flex justify-around text-white laptop:p-12 laptop:flex laptop:flex-row desktop:flex desktop:flex-row mobile:flex mobile:flex-col mobile:gap-7 mobile:p-3">
        <div className="laptop:text-[16px] mobile:text-[14px] font-medium">
          <img src={Logo} alt="" className="mobile:mx-auto laptop:mx-0" />
          <div className=" flex items-center gap-5 mt-7">
            <div className="w-[50px] h-[50px] rounded-full bg-white flex items-center justify-center">
              <FontAwesomeIcon
                icon={faLocationDot}
                className="laptop:text-2xl desktop:text-2xl mobile:text-[18px] text-green-500"
              />
            </div>
            <span className="w-[300px]">
              Số 12 Nguyễn Văn Bảo, Phường 4, Quận Gò Vấp, Thành phố Hồ Chí Minh
            </span>
          </div>
          <div className=" flex items-center gap-5 mt-4">
            <div className="w-[50px] h-[50px] rounded-full bg-white flex items-center justify-center">
              <FontAwesomeIcon
                icon={faPhone}
                className="text-2xl text-green-500"
              />
            </div>
            <span className="w-[300px]">0933024811</span>
          </div>
          <div className=" flex items-center gap-5 mt-4">
            <div className="w-[50px] h-[50px] rounded-full bg-white flex items-center justify-center">
              <FontAwesomeIcon
                icon={faEnvelopesBulk}
                className="text-2xl text-green-500"
              />
            </div>
            <span className="w-[300px]">trungduong0810@gmail.com</span>
          </div>
        </div>

        <div className="laptop:text-left mobile:text-center">
          <h1 className="mb-3 uppercase">Về chúng tôi</h1>
          <div className="laptop:w-[50%] mobile:w-[100%] h-[2px] bg-white "></div>
          <div className="flex flex-col p2 laptop:mt-7 mobile:mt-3">
            <span className="py-2">
              <NavLink to="/">Trang chủ</NavLink>
            </span>
            <span className="py-2">
              <NavLink to="/introduce">Giới thiệu</NavLink>
            </span>
            <span className="py-2">
              <NavLink to="/product">Sản phẩm</NavLink>
            </span>
            <span className="py-2">
              <NavLink to="/news">Tin tức</NavLink>
            </span>
            <span className="py-2">
              <NavLink to="/contact">Liên hệ</NavLink>
            </span>
          </div>
        </div>
        <div>
          <div className="laptop:text-left mobile:text-center">
            <h1 className="mb-3 uppercase">Dịch vụ khách hàng</h1>
            <div className="laptop:w-[50%] mobile:w-[100%] h-[2px] bg-white"></div>
            <div className="flex flex-col p2 laptop:mt-7 mobile:mt-3">
              <span className="py-2">
                <NavLink to="/policyWarranty">Chính sách bảo hành</NavLink>
              </span>
              <span className="py-2">
                <NavLink to="/policyChangeProduct">Chính sách đổi trả</NavLink>
              </span>
              <span className="py-2">
                <NavLink to="/policySecurityInfo">Bảo mật thông tin </NavLink>
              </span>
            </div>
          </div>
        </div>
        <div>
          <div className="laptop:text-left mobile:text-center">
            <h1 className="mb-3 uppercase">Phương thức thanh toán</h1>
            <div className="laptop:w-[50%] mobile:w-[100%] h-[2px] bg-white"></div>
            <div className="flex flex-col gap-5 laptop:mt-7 mobile:mt-5">
              <div className="flex items-center gap-3">
                <img
                  src="https://bepchinhhang.com/Data/images/chinh-sach/thanh-toan.png"
                  alt=""
                  className="w-[30px] h-[30px] bg-white"
                />
                <p>Thanh toán khi nhận hàng</p>
              </div>
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
              <div className="flex items-center gap-3">
                <img
                  src="https://static.mservice.io/img/logo-momo.png"
                  alt=""
                  className="w-[30px] h-[30px]"
                />
                <p>Thanh toán qua ví MoMo</p>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src="https://cardtot.com/wp-content/uploads/2020/01/zalopay.png"
                  alt=""
                  className="w-[30px] h-[30px]"
                />
                <p>Thanh toán qua zalo pay</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[1px] bg-gray-600"></div>
      <p className="text-center py-4 text-white font-semibold">
        <span>&copy; </span>
        <span>
          Bản quyền thuộc về <span className="text-teal-600">Trung Duong</span>
        </span>
      </p>
    </div>
  );
};

export default Footer;
