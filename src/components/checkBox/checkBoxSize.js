import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import React from "react";

const CheckBoxSize = ({ control, className, label, onChange, ...props }) => {
  const handleChange = (event) => {
    const checked = event.target.checked;
    if (onChange) {
      onChange(checked);
    }
  };
  return (
    <div>
      <div className={`${className} shadow-lg flex items-center`}>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox {...props} />}
            label={label}
            onChange={handleChange}
          />
        </FormGroup>
      </div>
    </div>
  );
};

export default CheckBoxSize;
