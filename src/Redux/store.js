import { configureStore } from "@reduxjs/toolkit";
import selectMethodPayReducer from "./selectMethodPay";
import infoOrderProductReducer from "./infoOrderProduct";
import userIdReducer from "./userId";
import cartBuyNowReducer from "./cartBuyNow";
import updateNewsReducer from "./updateNews";
import reviewProductReducer from "./reviewProduct";
import selectProductReducer from "./selectReviewProduct";
import avatarUserReducer from "./AvatarUser";
import changeAvatarUserReducer from "./RenderchangeAvatarUser";
import changeCartReducer from "./updateCart";
import filterTypeProuctReducer from "./filterTypeProduct";
import searchProductReducer from "./searchProduct";
import senderIdChatReducer from "./getSenderIdChat";
export const store = configureStore({
  reducer: {
    filterTypeProduct: filterTypeProuctReducer,
    selectMethodPay: selectMethodPayReducer,
    infoOrderProduct: infoOrderProductReducer,
    userId: userIdReducer,
    cartBuyNow: cartBuyNowReducer,
    updateNews: updateNewsReducer,
    reviewProduct: reviewProductReducer,
    selectReview: selectProductReducer,
    avatarUser: avatarUserReducer,
    changeAvatarUser: changeAvatarUserReducer,
    changeCart: changeCartReducer,
    searchProduct: searchProductReducer,
    senderIdChat: senderIdChatReducer,
  },
});
