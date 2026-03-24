import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems: (state, action) => {
      state.items = action.payload;
    },

    saveCartItem: (state, action) => {
      const nextCartItem = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.productId === nextCartItem.productId
      );

      if (existingItemIndex >= 0) {
        state.items[existingItemIndex] = nextCartItem;
        return;
      }

      state.items.push(nextCartItem);
    },

    removeCartItem: (state, action) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload
      );
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { clearCart, removeCartItem, saveCartItem, setCartItems } =
  cartSlice.actions;

export default cartSlice.reducer;
