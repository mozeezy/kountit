import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  product: null,
  allProducts: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    totalStoreValue(state, action) {
      console.log("Hello");
    },
  },
  extraReducers: {
    
  }
});

export const { totalStoreValue } = productSlice.actions;
// console.log(productSlice);

export default productSlice.reducer;
