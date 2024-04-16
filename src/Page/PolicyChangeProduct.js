import React from "react";
import Header from "../Layouts/Header/Header";
import Footer from "../Layouts/Footer/Footer";
import ScrollTopButton from "../Layouts/ScrollTopButton/ScrollTopButton";
import { motion } from "framer-motion";
const PolicyChangeProduct = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <Header></Header>
      <div className="mt-[50px] w-[70vw] mx-auto py-12">
        <h1 className="text-center text-[2rem] font-bold">
          Chính sách đổi trả sản phẩm
        </h1>
        <div className="mt-4">
          <h2 className="text-[1.3rem] font-semibold">1. Thời Gian Đổi Trả</h2>
          <p className="policy">
            SeaFashion cam kết cho phép đổi trả sản phẩm trong vòng 30 ngày kể
            từ ngày mua hàng. Điều này cho phép khách hàng có đủ thời gian để
            kiểm tra và đảm bảo sản phẩm đáp ứng được nhu cầu của họ.
          </p>
        </div>
        <div className="mt-4">
          <h2 className="text-[1.3rem] font-semibold">2. Điều Kiện Đổi Trả</h2>
          <p className="policy">
            Sản phẩm cần phải ở trong tình trạng mới, không sử dụng và không bị
            hỏng hóc. Khách hàng cần giữ nguyên hộp và các phụ kiện đi kèm (nếu
            có) khi đổi trả sản phẩm.
          </p>
        </div>
        <div className="mt-4">
          <h2 className="text-[1.3rem] font-semibold">3. Yêu Cầu Đổi Trả </h2>
          <p className="policy">
            Khách hàng cần xuất trình hóa đơn mua hàng hoặc chứng từ chứng minh
            việc mua hàng để đủ điều kiện đổi trả. Hóa đơn phải được giữ nguyên
            và không được sửa đổi.
          </p>
        </div>

        <div className="mt-4">
          <h2 className="text-[1.3rem] font-semibold">4. Loại Trừ Đổi Trả </h2>
          <p className="policy">
            Chúng tôi không chấp nhận đổi trả cho các sản phẩm đã qua sử dụng,
            bị hỏng hóc do sử dụng không đúng cách hoặc đã qua thời hạn 30 ngày
            kể từ ngày mua hàng.
          </p>
        </div>
        <div className="mt-4">
          <h2 className="text-[1.3rem] font-semibold">5. Quy Trình Đổi Trả </h2>
          <p className="policy">
            Khách hàng cần liên hệ với bộ phận Chăm sóc Khách hàng của chúng tôi
            để bắt đầu quy trình đổi trả. Chúng tôi sẽ hỗ trợ khách hàng qua
            email, điện thoại hoặc trực tiếp tại cửa hàng để xác định vấn đề và
            cung cấp hướng dẫn cụ thể về việc gửi trả hàng hoặc đưa sản phẩm đến
            cửa hàng của chúng tôi.
          </p>
        </div>
        <div className="mt-4">
          <h2 className="text-[1.3rem] font-semibold">
            6. Thay Thế hoặc Hoàn Trả Tiền
          </h2>
          <p className="policy">
            Khách hàng có thể chọn giữa việc đổi trả sản phẩm hoặc hoàn trả
            tiền. Trong trường hợp sản phẩm không có sẵn hoặc không đủ size hoặc
            màu sắc mong muốn, chúng tôi sẽ hoàn trả tiền cho khách hàng.
          </p>
        </div>
        <p className="mt-4">
          Chúng tôi cam kết cung cấp một quy trình đổi trả dễ dàng và minh bạch
          để đảm bảo sự hài lòng và tin tưởng của khách hàng khi mua sắm tại
          SeaFashion.
        </p>
      </div>
      <Footer></Footer>
      <ScrollTopButton></ScrollTopButton>
    </motion.div>
  );
};

export default PolicyChangeProduct;
