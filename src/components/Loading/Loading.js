import React from "react";

const Loading = ({ className }) => {
  return (
    <div>
      <span class={`lds-dual-ring ${className}`}></span>
    </div>
  );
};

export default Loading;
