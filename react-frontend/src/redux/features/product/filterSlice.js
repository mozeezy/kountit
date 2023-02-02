import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredProductsArray: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filterProduct(state, action) {
      const { allProducts, searchValue } = action.payload;

      const filteredProducts = allProducts.filter(
        (item) =>
          item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.category.toLowerCase().includes(searchValue.toLowerCase())
      );
      state.filteredProductsArray = filteredProducts;
    },
  },
});

export const { filterProduct } = filterSlice.actions;
export const selectFilter = (state) => state.filter.filteredProductsArray;

export default filterSlice.reducer;
