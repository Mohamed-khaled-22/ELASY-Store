import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],

}

export const cartSlice = createSlice({
    name: 'cart', initialState, reducers: {
        addItem: (state, action) => {
            state.cartItems.push(action.payload);
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        deleteItem: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload.id);
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        incrementItem: (state, action) => {
            state.cartItems = state.cartItems.map(item => item.id !== action.payload.id ? item : { ...item, quantity: item.quantity + 1 });
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        decrementItem: (state, action) => {
            state.cartItems = state.cartItems.map(item => item.id !== action.payload.id ? item : { ...item, quantity: item.quantity - 1 });
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        clearCart: (state) => {
            state.cartItems = [];
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
    }
});


export const { addItem, deleteItem, decrementItem, incrementItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;