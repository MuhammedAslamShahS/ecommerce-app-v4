import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./orderSlice";
import cartReducer from "./cartSlice";
import authReducer from "./authSlice";

const store = configureStore({
    reducer: {
        order: orderReducer,
        cart: cartReducer,
         auth: authReducer,
    },
});

export default store;
