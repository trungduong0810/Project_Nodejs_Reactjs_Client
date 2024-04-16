import React from "react";
import { TextField } from "@mui/material";
import { useController } from "react-hook-form";

const Input = ({ control, ...props }) => {
  const { field } = useController({
    control,
    name: props.name,
    defaultValue: "",
  });
  return (
    <div className="mb-5">
      <TextField {...props} {...field} />
    </div>
  );
};

export default Input;
