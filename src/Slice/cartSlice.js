import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    totalItems: localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0,
    totalAmount: localStorage.getItem("totalAmount") ? JSON.parse(localStorage.getItem("totalAmount")) : 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.cartItems.find(
                (item) => item.id === action.payload.id
            );

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cartItems.push({ ...action.payload, quantity: 1 });
            }

            state.totalItems = state.cartItems.reduce((total, item) => total + item.quantity, 0);
            state.totalAmount = state.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
            localStorage.setItem("totalAmount", JSON.stringify(state.totalAmount));
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(
                (item) => item.id !== action.payload
            );

            state.totalItems = state.cartItems.reduce((total, item) => total + item.quantity, 0);
            state.totalAmount = state.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
            localStorage.setItem("totalAmount", JSON.stringify(state.totalAmount));
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.cartItems.find((item) => item.id === id);
            
            if (item) {
                item.quantity = quantity;
            }

            state.totalItems = state.cartItems.reduce((total, item) => total + item.quantity, 0);
            state.totalAmount = state.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
            localStorage.setItem("totalAmount", JSON.stringify(state.totalAmount));
        },
        clearCart: (state) => {
            state.cartItems = [];
            state.totalItems = 0;
            state.totalAmount = 0;
            
            localStorage.removeItem("cartItems");
            localStorage.removeItem("totalItems");
            localStorage.removeItem("totalAmount");
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer; 