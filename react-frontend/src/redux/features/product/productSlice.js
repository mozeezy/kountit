import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getAllProducts,
  getSingleProduct,
} from "../../../api/productServer";
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

export const deleteProducts = createAsyncThunk(
  "product/deleteProducts",
  async (id, thunkAPI) => {
    try {
      return await deleteProduct(id);
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

export const getAProduct = createAsyncThunk(
  "product/getAProduct",
  async (id, thunkAPI) => {
    try {
      return await getSingleProduct(id);
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

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, productData }, thunkAPI) => {
    try {
      console.log(id);
      console.log(productData);
      return await editProduct(id, productData);
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
        if (quantity <= 3 && quantity !== "0" && quantity !== 0) {
          count += 1;
        }
      });

      state.lowStock = count;
    },
    calculateCategories(state, action) {
      const products = action.payload;
      const newArr = [];

      products.map((item) => {
        const { category } = item;
        return newArr.push(category);
      });

      const categoryArr = [...new Set(newArr)];
      state.totalCategories = categoryArr;
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
      state.allProducts = action.payload;
    },
    [getProducts.rejected]: (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.message = action.payload;
      toast.error(action.payload);
    },

    [deleteProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteProducts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      toast.success("The product was deleted successfully");
    },
    [deleteProducts.rejected]: (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.message = action.payload;
      toast.error(action.payload);
    },

    [getAProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [getAProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.product = action.payload;
    },
    [getAProduct.rejected]: (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.message = action.payload;
      toast.error(action.payload);
    },

    [updateProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [updateProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      console.log(action.payload);
      toast.success("Product has been updated successfully.");
    },
    [updateProduct.rejected]: (state, action) => {
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
  calculateCategories,
} = productSlice.actions;
// console.log(productSlice);

export const selectIsLoading = (state) => state.product.isLoading;
export const selectProduct = (state) => state.product.product;
export const selectTotalStoreValue = (state) => state.product.totalStoreValue;
export const selectOutOfStock = (state) => state.product.outOfStock;
export const selectLowStock = (state) => state.product.lowStock;
export const selectCategory = (state) => state.product.totalCategories;

export default productSlice.reducer;
