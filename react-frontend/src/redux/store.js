import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/features/user/userSlice";
import productReducer from "../redux/features/product/productSlice";

export const store = configureStore({
  reducer: { user: userReducer, product: productReducer },
});
