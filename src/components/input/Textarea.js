import React from "react";
import Textarea from "@mui/joy/Textarea";
import { useController } from "react-hook-form";

const TextareaForm = ({ control, ...props }) => {
  const { field } = useController({
    control,
    name: props.name,
    defaultValue: "",
  });
  return (
    <div className="mb-5">
      <Textarea  {...props} {...field} />
    </div>
  );
};

export default TextareaForm;
