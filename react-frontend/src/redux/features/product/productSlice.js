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
  totalStoreValue: 0,
  outOfStock: 0,
  lowStock: 0,
  totalCategories: [],
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
    calculateTotalStoreValue(state, action) {
      const products = action.payload;
      const newArr = [];

      products.map((item) => {
        const { price, quantity } = item;
        const productValue = price * quantity;
        return newArr.push(productValue);
      });
      const newTotalValue = newArr.reduce((a, b) => {
        return a + b;
      }, 0);

      state.totalStoreValue = newTotalValue;
    },
    calculateOutOfStock(state, action) {
      const products = action.payload;
      let count = 0;

      products.map((item) => {
        const { quantity } = item;
        if (quantity === 0 || quantity === "0") {
          count += 1;
        }
      });

      state.outOfStock = count;
    },
    calculateLowStock(state, action) {
      const products = action.payload;
      let count = 0;

      products.map((item) => {
        const { quantity } = item;
        if (quantity <= 3 && quantity !== "0") {
          count += 1;
        }
      });

      state.lowStock = count;
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

export const {
  calculateTotalStoreValue,
  calculateOutOfStock,
  calculateLowStock,
} = productSlice.actions;
// console.log(productSlice);

export const selectIsLoading = (state) => state.product.isLoading;
export const selectTotalStoreValue = (state) => state.product.totalStoreValue;
export const selectOutOfStock = (state) => state.product.outOfStock;
export const selectLowStock = (state) => state.product.lowStock;

export default productSlice.reducer;
