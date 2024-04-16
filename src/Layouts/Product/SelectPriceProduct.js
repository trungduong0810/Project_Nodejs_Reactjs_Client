import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";

const SelectPriceProduct = () => {

  return (
    <div className="mt-7">
      <h2 className="uppercase text-xl font-[500] mb-5">Mức giá</h2>
      <div className="w-[250px] border border-teal-400 rounded-lg py-3 px-4">
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"

          >
            <FormControlLabel
              value="allProduct"
              control={<Radio color="success" />}
              label="Tất cả sản phẩm"
            />
            <FormControlLabel
              value="<100"
              control={<Radio color="success" />}
              label="Giá dưới 100.000đ"
            />
            <FormControlLabel
              value=">=100 <=200"
              control={<Radio color="success" />}
              label="100.000đ - 200.000đ"
            />
            <FormControlLabel
              value=">200 <=300"
              control={<Radio color="success" />}
              label="200.000đ - 300.000đ"
            />
            <FormControlLabel
              value=">300 <=500"
              control={<Radio color="success" />}
              label="300.000đ - 500.000đ"
            />
            <FormControlLabel
              value=">500 <=1000"
              control={<Radio color="success" />}
              label="500.000đ - 1.000.000đ"
            />
            <FormControlLabel
              value=">1000"
              control={<Radio color="success" />}
              label="Giá trên 1.000.000đ"
            />
          </RadioGroup>
        </FormControl>
      </div>
    </div>
  );
};

export default SelectPriceProduct;
