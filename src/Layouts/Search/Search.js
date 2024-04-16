import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchValue } from "../../Redux/searchProduct";
const Search = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  return (
    <div
      className={`laptop:w-[40%] mobile:w-[100%] h-[50px] bg-gray-800 flex items-center rounded-lg overflow-hidden`}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          dispatch(searchValue(e.target.value));
        }}
        className="w-[90%] h-full px-5  outline-none border"
        placeholder="Tìm kiến sản phẩm và thương hiệu"
      />
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        className="laptop:w-[10%] mobile:w-[20%] text-xl text-white text-center cursor-pointer"
      />
    </div>
  );
};

export default Search;
