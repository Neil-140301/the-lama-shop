import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
      action.payload.showMsg(true);
    },
    deleteProduct: (state, action) => {
      state.products.splice(
        state.products.findIndex((i) => i._id === action.payload.id),
        1
      );
      state.quantity -= 1;
      state.total -= action.payload.total;
    },
    emptyCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const { addProduct, deleteProduct, emptyCart } = cartSlice.actions;
export default cartSlice.reducer;
