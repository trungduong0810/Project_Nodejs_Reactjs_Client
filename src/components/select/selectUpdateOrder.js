import React from "react";
import { useController } from "react-hook-form";
import Select from "react-select";

const options = [
  { value: 2, label: "Chuẩn bị đơn hàng" },
  { value: 3, label: "Đang giao hàng" },
  { value: 4, label: "Giao hàng thành công" },
];

const SelectUpdateOrder = ({ control, ...props }) => {
  const { field } = useController({
    control,
    name: props.name,
    defaultValue: "",
  });
  return (
    <div>
      <Select options={options} {...field} {...props} />
    </div>
  );
};

export default SelectUpdateOrder;
