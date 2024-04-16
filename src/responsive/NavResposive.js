import React from "react";
import { NavLink } from "react-router-dom";
const listLink = [
  {
    id: 1,
    path: "/",
    title: "TRANG CHỦ",
  },
  {
    id: 2,
    path: "/introduce",
    title: "GIỚI THIỆU",
  },
  {
    id: 3,
    path: "/product",
    title: "SẢN PHẨM",
  },
  {
    id: 4,
    path: "/news",
    title: "TIN TỨC",
  },
  {
    id: 5,
    path: "/contact",
    title: "LIÊN HỆ",
  },
  {
    id: 6,
    path: "/SignUp",
    title: "ĐĂNG KÝ",
  },
  {
    id: 7,
    path: "/SignIn",
    title: "ĐĂNG NHẬP",
  },
];

const NavResponsive = () => {
  return (
    <div className="flex flex-col gap-5 mt-5 font-semibold uppercase text-[17px] w-[90%] mx-auto text-center">
      {listLink.map((item) => (
        <NavLink
          key={item.id}
          to={item.path}
          className={({ isActive }) =>
            isActive
              ? "text-white font-bold"
              : "text-gray-400 hover:text-gray-600 transition-all"
          }
        >
          {item.title}
        </NavLink>
      ))}
    </div>
  );
};

export default NavResponsive;
