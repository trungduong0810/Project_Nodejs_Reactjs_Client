import {
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";

import { useDispatch } from "react-redux";
import React from "react";
import { filterType } from "../../Redux/filterTypeProduct";

const dataSelectTypeProduct = [
  { label: "Tất cả sản phẩm", value: "allProduct" },
  // áo
  { label: "Áo sơ mi nam", value: "Áo sơ mi nam" },
  { label: "Áo thun nam", value: "Áo thun nam" },
  { label: "Áo polo nam", value: "Áo polo nam" },
  // quần
  { label: "Quần âu nam", value: "Quần âu nam" },
  { label: "Quần baggy nam", value: "Quần baggy nam" },
  // giá
  { label: "Giá dưới 100.000đ", value: "<100" },
  { label: "100.000đ - 200.000đ", value: ">=100 <=200" },
  { label: "200.000đ - 300.000đ", value: ">200 <=300" },
  { label: "300.000đ - 500.000đ", value: ">300 <=500" },
  { label: "500.000đ - 1.000.000đ", value: ">500 <=1000" },
  { label: "Giá trên 1.000.000đ", value: ">1000" },
];

const SelectTypeProduct = () => {
  const dispatch = useDispatch();
  const handleChange = (event) => {
    dispatch(filterType(event.target.value));
  };
  return (
    <div>
      <h2 className="uppercase text-xl font-[500] mb-5">Lọc sản phẩm</h2>
      <div className="w-[250px] laptop:mx-0 mobile:mx-auto">
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            onChange={handleChange}
            defaultValue="allProduct"
          >
            <div className="border border-teal-500 p-2 rounded-lg ">
              {dataSelectTypeProduct &&
                dataSelectTypeProduct.map((item, index) => (
                  <FormControlLabel
                    value={item.value}
                    control={<Radio color="success" />}
                    label={item.label}
                  />
                ))}
            </div>
          </RadioGroup>
        </FormControl>
      </div>
    </div>
  );
};

export default SelectTypeProduct;
