import React from "react";
import Header from "../Layouts/Header/Header";
import Footer from "../Layouts/Footer/Footer";
import ScrollTopButton from "../Layouts/ScrollTopButton/ScrollTopButton";
import { motion } from "framer-motion";
const PolicySecurityInfo = () => {
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
          Bảo mật thông tin khách hàng
        </h1>
        <div className="mt-4">
          <h2 className="text-[1.3rem] font-semibold">
            1. Mục Đích và Phạm Vi Thu Thập Thông Tin
          </h2>
          <p className="policy">
            SeaFashion cam kết bảo vệ thông tin cá nhân của khách hàng và chỉ
            thu thập thông tin cần thiết để cung cấp dịch vụ và sản phẩm cho
            khách hàng. Thông tin này có thể bao gồm tên, địa chỉ email, địa chỉ
            giao hàng và thông tin thanh toán.
          </p>
        </div>
        <div className="mt-4">
          <h2 className="text-[1.3rem] font-semibold">2. Bảo Mật Dữ Liệu</h2>
          <p className="policy">
            Chúng tôi sử dụng các biện pháp bảo mật công nghệ hiện đại để bảo vệ
            thông tin cá nhân của khách hàng khỏi mất mát, lạc hướng, truy cập
            trái phép, sử dụng, tiết lộ hoặc sửa đổi không được phép. Các thông
            tin cá nhân của khách hàng được lưu trữ trên máy chủ bảo mật và được
            mã hóa để đảm bảo tính bảo mật.
          </p>
        </div>
        <div className="mt-4">
          <h2 className="text-[1.3rem] font-semibold">3. Sử Dụng Thông Tin </h2>
          <p className="policy">
            SeaFashion chỉ sử dụng thông tin cá nhân của khách hàng để cung cấp
            sản phẩm và dịch vụ, xử lý đơn hàng, giao hàng và liên lạc với khách
            hàng về các vấn đề liên quan đến đơn hàng hoặc tài khoản của họ.
            Chúng tôi không bán, cho thuê hoặc chia sẻ thông tin cá nhân của
            khách hàng với bên thứ ba không được ủy quyền.
          </p>
        </div>

        <div className="mt-4">
          <h2 className="text-[1.3rem] font-semibold">
            4. Quyền Lợi của Khách Hàng
          </h2>
          <p className="policy">
            Khách hàng có quyền truy cập, sửa đổi hoặc xóa thông tin cá nhân của
            mình khỏi hệ thống của chúng tôi bất kỳ lúc nào. Khách hàng cũng có
            quyền yêu cầu hủy đăng ký nhận thông tin quảng cáo từ chúng tôi.
          </p>
        </div>
        <div className="mt-4">
          <h2 className="text-[1.3rem] font-semibold">5. Bảo Mật Giao Dịch</h2>
          <p className="policy">
            Chúng tôi sử dụng các phương thức thanh toán an toàn và đáng tin cậy
            để bảo vệ thông tin thanh toán của khách hàng. Tất cả các giao dịch
            thanh toán được mã hóa và xử lý thông qua các cổng thanh toán an
            toàn.
          </p>
        </div>
        <div className="mt-4">
          <h2 className="text-[1.3rem] font-semibold">
            6. Cập Nhật Chính Sách
          </h2>
          <p className="policy">
            Chúng tôi có thể điều chỉnh và cập nhật Chính sách Bảo Mật Thông Tin
            này theo thời gian mà không cần thông báo trước. Bất kỳ thay đổi nào
            sẽ được cập nhật trên trang web của chúng tôi để khách hàng có thể
            theo dõi.
          </p>
        </div>
        <p className="mt-4">
          Chúng tôi cam kết bảo vệ thông tin cá nhân của khách hàng và tuân thủ
          các quy định bảo mật để đảm bảo một trải nghiệm mua sắm an toàn và
          đáng tin cậy trên SeaFashion.
        </p>
      </div>
      <Footer></Footer>
      <ScrollTopButton></ScrollTopButton>
    </motion.div>
  );
};

export default PolicySecurityInfo;
