import React from "react";
import Header from "../Layouts/Header/Header";
import Footer from "../Layouts/Footer/Footer";
import ScrollTopButton from "../Layouts/ScrollTopButton/ScrollTopButton";
import { motion } from "framer-motion";
const PolicyWarranty = () => {
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
          Chính sách bảo hành
        </h1>
        <div className="mt-4">
          <h2 className="text-[1.3rem] font-semibold">1. Thời Gian Bảo Hành</h2>
          <p className="policy">
            SeaFashion cam kết cung cấp dịch vụ bảo hành trong vòng 12 tháng kể
            từ ngày mua hàng. Đây là một cam kết đối với chất lượng sản phẩm của
            chúng tôi. Đối với một số sản phẩm đặc biệt, chúng tôi có thể cung
            cấp thời gian bảo hành mở rộng hoặc điều chỉnh tùy thuộc vào yêu cầu
            cụ thể của khách hàng.
          </p>
        </div>
        <div className="mt-4">
          <h2 className="text-[1.3rem] font-semibold">2. Phạm Vi Bảo Hành</h2>
          <p className="policy">
            Chúng tôi bảo hành tất cả các sản phẩm mới mua từ SeaFashion, bao
            gồm lỗi sản xuất và hỏng hóc không phát sinh từ việc sử dụng bình
            thường. Điều này bao gồm mọi phần của sản phẩm từ chất liệu cho đến
            cấu trúc và chức năng.
          </p>
        </div>
        <div className="mt-4">
          <h2 className="text-[1.3rem] font-semibold">3. Yêu Cầu Bảo Hành </h2>
          <p className="policy">
            Khách hàng cần xuất trình hóa đơn mua hàng hoặc chứng từ chứng minh
            việc mua hàng để đủ điều kiện bảo hành. Hóa đơn phải được giữ nguyên
            và không được sửa đổi. Ngoài ra, khách hàng cần cung cấp thông tin
            chi tiết về sự cố hoặc lỗi kỹ thuật cụ thể để chúng tôi có thể xác
            định và xử lý vấn đề một cách hiệu quả.
          </p>
        </div>

        <div className="mt-4">
          <h2 className="text-[1.3rem] font-semibold">4. Loại Trừ Bảo Hành </h2>
          <p className="policy">
            Chúng tôi không bảo hành cho các trường hợp hỏng hóc do sử dụng
            không đúng cách, sự cố từ lực lượng bên ngoài như va đập, rơi rớt
            hoặc sự hỏng hóc do sự cố hỏng hóc không liên quan đến sản phẩm.
            Ngoài ra, các sản phẩm đã qua sử dụng hoặc mua từ các nguồn không
            chính hãng cũng không được bảo hành.
          </p>
        </div>
        <div className="mt-4">
          <h2 className="text-[1.3rem] font-semibold">
            5. Quy Trình Bảo Hành{" "}
          </h2>
          <p className="policy">
            Khách hàng cần liên hệ với bộ phận Chăm sóc Khách hàng của chúng tôi
            để bắt đầu quy trình bảo hành. Chúng tôi sẽ hỗ trợ khách hàng qua
            email, điện thoại hoặc trực tiếp tại cửa hàng để xác định vấn đề và
            cung cấp hướng dẫn cụ thể về việc gửi trả hàng hoặc đưa sản phẩm đến
            trung tâm bảo hành của chúng tôi.
          </p>
        </div>
        <div className="mt-4">
          <h2 className="text-[1.3rem] font-semibold">
            6. Thay Thế hoặc Sửa Chữa
          </h2>
          <p className="policy">
            Trong trường hợp sản phẩm không thể sửa chữa, chúng tôi sẽ cung cấp
            sản phẩm mới hoặc hoàn trả tiền cho khách hàng tùy thuộc vào yêu cầu
            của họ và tình trạng cụ thể của sản phẩm. Chúng tôi cam kết đảm bảo
            sự hài lòng của khách hàng và giải quyết mọi vấn đề một cách nhanh
            chóng và công bằng.
          </p>
        </div>
        <p className="mt-4">
          Chúng tôi hi vọng rằng chính sách bảo hành này sẽ mang lại sự an tâm
          và tin tưởng cho khách hàng khi mua sắm tại SeaFashion và thể hiện cam
          kết của chúng tôi đối với chất lượng sản phẩm và dịch vụ.
        </p>
      </div>
      <Footer></Footer>
      <ScrollTopButton></ScrollTopButton>
    </motion.div>
  );
};

export default PolicyWarranty;
