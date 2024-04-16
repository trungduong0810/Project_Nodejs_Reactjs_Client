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
];

const Nav = () => {
  return (
    <div className="flex justify-center items-center gap-7 font-semibold uppercase text-[17px] mobile:hidden laptop:flex desktop:flex">
      {listLink.map((item) => (
        <NavLink
          key={item.id}
          to={item.path}
          className={({ isActive }) =>
            isActive
              ? "text-black font-bold"
              : "text-gray-400 hover:text-gray-600 transition-all"
          }
        >
          {item.title}
        </NavLink>
      ))}
    </div>
  );
};

export default Nav;
