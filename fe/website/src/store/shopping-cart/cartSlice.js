import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,

  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      // const gia = parseFloat(parseFloat(newItem.DONGIA) - parseFloat(newItem.DONGIA)*parseFloat(newItem.SALE))
      const gia = newItem.DONGIA - newItem.DONGIA*newItem.SALE
      const existingItem = state.cartItems.find(
        (item) => item.MASP === newItem.MASP
      );
      state.totalQuantity++;
      // console.log(state.totalQuantity)

      if (!existingItem) {
        state.cartItems.push({
          MASP: newItem.MASP,
          TENSP: newItem.TENSP,
          HINHANH: newItem.HINHANH,
          DONGIA: gia,
          SALE: newItem.SALE,
          NUOCSX: newItem.NUOCSX,
          quantity: 1,
          totalPrice: gia,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice =
          parseFloat(existingItem.totalPrice) + parseFloat(gia);
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) => parseFloat(parseFloat(total) + parseFloat((item.DONGIA)) * parseFloat(item.quantity)).toFixed(3),
        0
      );
    },
    removeItem(state, action) {
      const MASP = action.payload;
      const existingItem = state.cartItems.find((item) => item.MASP === MASP);
      state.totalQuantity--;
      // console.log(state.totalQuantity)

      if (existingItem.quantity === 1) {
        state.cartItems = state.cartItems.filter((item) => item.MASP !== MASP);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice =
        parseFloat(existingItem.totalPrice) - parseFloat(existingItem.price);
      }
      state.totalAmount = state.cartItems.reduce(
        (total, item) => parseFloat(parseFloat(total) + parseFloat((item.DONGIA)) * parseFloat(item.quantity)).toFixed(3),
        0
      );
    },

    deleteItem(state, action) {
      const MASP = action.payload;
      const existingItem = state.cartItems.find((item) => item.MASP === MASP);

      if (existingItem) {
        state.cartItems = state.cartItems.filter((item) => item.MASP !== MASP);
        state.totalQuantity = state.totalQuantity - existingItem.quantity
      }
      state.totalAmount = state.cartItems.reduce(
        (total, item) => parseFloat((parseFloat(total) + parseFloat((item.DONGIA)) * parseFloat(item.quantity))).toFixed(3),
        0
      );
    }
  }
});

export const cartActions = cartSlice.actions;
export default cartSlice;
