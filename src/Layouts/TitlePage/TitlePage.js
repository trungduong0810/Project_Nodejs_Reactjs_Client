import React from "react";
const TitlePage = ({ children, className }) => {
  return (
    <div>
      <div className={className}>
        {children}
      </div>
    </div>
  );
};

export default TitlePage;
