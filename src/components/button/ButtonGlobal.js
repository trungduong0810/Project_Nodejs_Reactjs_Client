import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import React from "react";

const ButtonGlobal = ({ children, className, color, to, ...props }) => {
  if (to && typeof (to === "string")) {
    return (
      <NavLink to={to}>
        <div className={className}>
          <Button variant="contained" color={color}  {...props}>
            {children}
          </Button>
        </div>
      </NavLink>
    );
  } else {
    return (
      <div className={className}>
        <Button variant="contained" color={color} {...props}>
          {children}
        </Button>
      </div>
    );
  }
};

export default ButtonGlobal;
