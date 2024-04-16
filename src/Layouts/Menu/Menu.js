import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Menu = () => {
  return (
    <div className="flex items-center rounded-lg overflow-hidden w-[200px]cursor-pointer">
      <div className="bg-green-600 h-[50px] w-[70px] flex items-center justify-center">
        <FontAwesomeIcon icon={faBars} className="text-2xl" />
      </div>
      <span className="h-[50px] w-[130px] flex items-center justify-center bg-white font-semibold text-xl">
        Menu
      </span>
    </div>
  );
};

export default Menu;
