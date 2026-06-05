// src/features/cart/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  amazonLink: string; // Added amazonLink
}

interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalAmount: number;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...newItem, quantity: 1 });
      }
      
      state.totalQuantity += 1;
      state.totalAmount += newItem.price;
    }, 
    removeFromCart: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= existingItem.price * existingItem.quantity;
        state.items = state.items.filter(item => item.id !== id);
      }
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      
      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.items = state.items.filter(item => item.id !== id);
        } else {
          existingItem.quantity -= 1;
        }
        state.totalQuantity -= 1;
        state.totalAmount -= existingItem.price;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    }
  }
});

export const { 
  addToCart, 
  removeFromCart, 
  decreaseQuantity, 
  clearCart 
} = cartSlice.actions;
export default cartSlice.reducer;


// // src/features/countSlice/countSlice.ts
// import { createSlice } from "@reduxjs/toolkit";

// interface CounterState {
//   value: number;
// }

// const initialState: CounterState = {
//   value: 0
// };

// export const countSlice = createSlice({
//   name: 'counter',
//   initialState,
//   reducers: {
//     increment: (state) => {
//       state.value += 1;
//     },
//     decrement: (state) => {
//       state.value -= 1;
//     },
//     reset: (state) => {
//       state.value = 0;
//     }
//   }
// });

// export const { increment, decrement, reset } = countSlice.actions;
// export default countSlice.reducer;

