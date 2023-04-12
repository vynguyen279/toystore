// import { legacy_createStore } from 'redux';
// import cartItems from '../constans/cartItem';

// export default store=legacy_createStore(cartItems);

import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
    },
    reducers: {
        addToCart: (state, action) => {
            const itemInCart = state.cart.find((item) => item.MASP == action.payload.MASP);
            if (itemInCart) {
                itemInCart.quantity;
            } else {
                state.cart.push({ ...action.payload, quantity: 1 });
            }
        },
        removeFromCart: (state, action) => {
            const removeFromCart = state.cart.filter((item) => item.MASP !== action.payload.MASP);
            state.cart = removeFromCart;
        },

        incrementQuantity: (state, action) => {
            const itemInCart = state.cart.find((item) => item.MASP == action.payload.MASP);
            itemInCart.quantity++;
        },

        decrementQuantity: (state, action) => {
            const itemInCart = state.cart.find((item) => item.MASP == action.payload.MASP);
            if (itemInCart.quantity == 1) {
                const removeFromCart = state.cart.filter((item) => item.MASP !== action.payload.MASP);
                state.cart = removeFromCart;
            } else {
                itemInCart.quantity--;
            }
        },
    },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;
