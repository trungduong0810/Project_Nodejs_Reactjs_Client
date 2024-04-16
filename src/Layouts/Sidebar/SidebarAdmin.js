import {
  faBookOpen,
  faCalendarDays,
  faCartShopping,
  faComment,
  faKaaba,
  faList,
  faNewspaper,
  faTicket,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink } from "react-router-dom";
const listLink = [
  {
    id: 1,
    path: "/admin/dashboard",
    title: "Bảng điều khiển",
    icon: <FontAwesomeIcon icon={faKaaba} />,
  },
  {
    id: 2,
    path: "/admin/category",
    title: "Danh mục sản phẩm",
    icon: <FontAwesomeIcon icon={faList} />,
  },
  {
    id: 3,
    path: "/admin/manage/product",
    title: "Quản lý sản phẩm",
    icon: <FontAwesomeIcon icon={faBookOpen} />,
  },
  {
    id: 4,
    path: "/admin/manage/order",
    title: "Quản lý đơn hàng",
    icon: <FontAwesomeIcon icon={faCartShopping} />,
  },
  {
    id: 5,
    path: "/admin/manage/user",
    title: "Quản lý người dùng",
    icon: <FontAwesomeIcon icon={faUsers} />,
  },

  {
    id: 6,
    path: "/admin/manage/discount",
    title: "Phiếu giảm giá",
    icon: <FontAwesomeIcon icon={faTicket} />,
  },
  {
    id: 7,
    path: "/admin/manage/news",
    title: "Quản lý tin tức",
    icon: <FontAwesomeIcon icon={faNewspaper} />,
  },
  {
    id: 8,
    path: "/admin/manage/message",
    title: "Tin nhắn",
    icon: <FontAwesomeIcon icon={faComment} />,
  },
];
const SidebarAdmin = () => {
  const className =
    "p-[18px] flex items-center text-gray-700 text-xl font-semibold";
  return (
    <div>
      <div className="flex flex-col h-[80vh] bg-gray-100 rounded-lg overflow-hidden w-[20vw] ml-5 mr-10">
        {listLink.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) =>
              isActive
                ? `${className} bg-green-200`
                : "p-[18px]  text-gray-400 text-xl font-semibold"
            }
          >
            <div className="flex items-center gap-5">
              {item.icon}
              {item.title}
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SidebarAdmin;
