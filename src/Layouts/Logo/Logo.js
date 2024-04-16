import React from "react";
import logo from "../../Assets/image/logo.webp";
import { NavLink } from "react-router-dom";

const Logo = ({ className }) => {
  return (
    <NavLink to="/">
      <img src={logo} alt="" className={`laptop:h-[40px] mobile:h-[30px] ${className}`} />
    </NavLink>
  );
};

export default Logo;
