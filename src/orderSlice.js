import { createSlice } from "@reduxjs/toolkit";

// to initialise initial value of each sections
const initialState = {
    product: null, // Product details object
    quantity: 1,
    paymentMethod: null,
    totalPrice: 0,
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        // Action to set order data when user clicks BuyNow Button then.
        setOrderData: (state, action) => {
            state.product = action.payload.product;
            state.quantity = action.payload.quantity;
            state.totalPrice = action.payload.product.price * action.payload.quantity;
        },

        // Action to set payment methods user selected payment like
        setPaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
        },

        clearOrder: (state) => {
            state.product = null;
            state.quantity = 1;
            state.paymentMethod = null;
            state.totalPrice = 0;
        },
    },
});

export const { setOrderData, setPaymentMethod, clearOrder } = orderSlice.actions;

export default orderSlice.reducer;
