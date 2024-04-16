export const formatMoney = (money) => {
  let formatted_number = money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return formatted_number;
};

export const formatMoneyCart = (money) => {
  let formatted_number = Number(money.toString().replace(".", ""));
  return formatted_number;
};
