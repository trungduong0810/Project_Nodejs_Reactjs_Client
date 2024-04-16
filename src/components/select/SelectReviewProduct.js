import React from "react";
import { useDispatch } from "react-redux";
import { selectReview } from "../../Redux/selectReviewProduct";
const SelectReviewProduct = () => {
  const dispatch = useDispatch();
  const handleChange = (event) => {
    dispatch(selectReview(event.target.value));
  };

  const dataReviews = [
    {
      id: 1,
      label: "Chất lượng sản phẩm tuyệt vời",
      value: "Chất lượng sản phẩm tuyệt vời",
    },
    {
      id: 2,
      label: "Đóng gói sản phẩm rất đẹp và chắc chắn",
      value: "Đóng gói sản phẩm rất đẹp và chắc chắn",
    },
    {
      id: 3,
      label: "Shop phụ vụ tốt",
      value: "Shop phụ vụ tốt",
    },
    {
      id: 4,
      label: "Rất đáng tiền",
      value: "Rất đáng tiền",
    },
    {
      id: 5,
      label: "Thời gian giao hàng nhanh",
      value: "Thời gian giao hàng nhanh",
    },
    {
      id: 6,
      label: "Sản phẩm không đúng mô tả",
      value: "Sản phẩm không đúng mô tả",
    },
    {
      id: 7,
      label: "Giao hàng rất lâu",
      value: "Giao hàng rất lâu",
    },

    {
      id: 8,
      label: "Đóng gói kém ",
      value: "Đóng gói kém ",
    },
  ];

  return (
    <div className="mt-7">
      <div className="w-full select_reviews flex items-center justify-center flex-wrap gap-4">
        {dataReviews &&
          dataReviews.map((item, index) => (
            <div className="select_group" key={index}>
              <input
                type="radio"
                name="size"
                id={item.id}
                hidden
                value={item.value}
                onChange={handleChange}
              />
              <label
                htmlFor={item.id}
                className="select_label inline-block text-center py-1 px-2 leading-[30px] border-green-600 border text-sm font-medium rounded-lg cursor-pointer"
              >
                <span> {item.label}</span>
              </label>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SelectReviewProduct;
