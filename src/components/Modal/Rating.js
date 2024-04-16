import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
const labels = {
  0: "Đánh giá",
  1: "Rất tệ",
  2: "Không hài lòng",
  3: "Bình thường",
  4: "Rất tốt",
  5: "Tuyệt vời",
};
const RatingStar = ({ setStar }) => {
  function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(-1);
  useEffect(() => {
    if (setStar) {
      setStar(value);
    }
  }, [value, setStar]);
  return (
    <div>
      <Box
        sx={{
          width: 250,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Rating
          name="hover-feedback"
          value={value}
          precision={1}
          getLabelText={getLabelText}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        {value !== null && (
          <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
        )}
      </Box>
    </div>
  );
};

export default RatingStar;
