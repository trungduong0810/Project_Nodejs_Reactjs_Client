import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Nav from "../Layouts/Nav/Nav";
import NavResponsive from "./NavResposive";

const HeaderResponsive = () => {
  const [showNav, setShowNav] = useState();
  const handleClickBar = () => {
    setShowNav((showNav) => !showNav);
  };
  return (
    <div className="relative laptop:hidden desktop:hidden">
      <div
        onClick={handleClickBar}
        className="mobile:block laptop:hidden desktop:hidden cursor-pointer"
      >
        <FontAwesomeIcon
          icon={faBars}
          className={`${!showNav ? "block" : "hidden"}`}
        />
        <FontAwesomeIcon
          icon={faXmark}
          className={`${showNav ? "block" : "hidden"}`}
          // className="hidden"
        />
      </div>

      <div
        className={`fixed top-[80px] left-0 right-0 bg-black opacity-90  overflow-hidden transition-all duration-300 ${
          showNav ? "h-screen" : "h-0"
        }`}
      >
        <NavResponsive></NavResponsive>
      </div>
    </div>
  );
};

export default HeaderResponsive;
