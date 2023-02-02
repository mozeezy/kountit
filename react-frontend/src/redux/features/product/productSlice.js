import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createProduct, getAllProducts } from "../../../api/productServer";
import { toast } from "react-toastify";

const initialState = {
  product: null,
  allProducts: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const addNewProduct = createAsyncThunk(
  "product/createProduct",
  async (data, thunkAPI) => {
    try {
      return await createProduct(data);
    } catch (error) {
      console.log(error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (_, thunkAPI) => {
    try {
      return await getAllProducts();
    } catch (error) {
      console.log(error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    totalStoreValue(state, action) {
      console.log("Hello");
    },
  },
  extraReducers: {
    [addNewProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [addNewProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      console.log(action.payload);
      state.allProducts.push(action.payload);
      toast.success("Product added.");
    },
    [addNewProduct.rejected]: (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.message = action.payload;
      toast.error(action.payload);
    },
    [getProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [getProducts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      console.log(action.payload);
      state.allProducts = action.payload; 
    },
    [getProducts.rejected]: (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.message = action.payload;
      toast.error(action.payload);
    },
  },
});

export const { totalStoreValue } = productSlice.actions;
// console.log(productSlice);

export const selectIsLoading = (state) => state.product.isLoading;

export default productSlice.reducer;
