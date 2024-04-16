import React from "react";
const TitleAdmin = ({ title, className }) => {
  return (
    <div className="w-full">
      <div className={`${className} mb-5 uppercase`}>
        <div className="w-full h-[50px] bg-green-700 leading-[50px] text-white text-[20px] font-semibold px-3 rounded-lg">
          {title}
        </div>
      </div>
    </div>
  );
};

export default TitleAdmin;
