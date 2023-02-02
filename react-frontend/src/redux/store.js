import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/features/user/userSlice";
import productReducer from "../redux/features/product/productSlice";
import filterReducer from "../redux/features/product/filterSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    filter: filterReducer,
  },
});
