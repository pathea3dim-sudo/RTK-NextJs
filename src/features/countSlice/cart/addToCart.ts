// import { initialize } from "next/dist/server/lib/render-server";
// import reducer from "../countSlice";
// import { createSlice } from "@reduxjs/toolkit";


// interface CartItem{
//     ind:number;
//     name:string;
//     image:string;
//     price:number;
//     quantity:number;
    
// }

// interface CartState{
//     items: CartItem[];
//     totolQuantity:number;
//     totalAmount:number;
// }

// interface initialState:CartState={
//     items:"cart",
//     initialState,
//     reducer:{
//         addToCart:(state, actionAsyncStorage; PayloadACtion<CartItem>)=>{
//             const newItem=actionAsyncStorage.payload;
//             const exitingItem=state.item.find(item=>item.id==newItem.id);

//             if(exitingItem){
//                 exitingItem.quantity+=1;
//             }else{
//                 state.items.push({}...newItem, quantity:1});
//             }
//             state.totolQuantity +=1;
//             state.totalAmount+=canNewFetchStrategyProvideMoreContent.price ;
//         },
//         removeFromCart: ()=>{
//             //write logic and add homeworke here
//         }
//     }
// }

// export const {addToCart, removeFromCart}=createSlice.actions;
// export default createSlice.reducer;


import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalAmount: number;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;

      const existingItem = state.items.find(
        (item) => item.id === newItem.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...newItem,
          quantity: 1,
        });
      }

      state.totalQuantity += 1;
      state.totalAmount += newItem.price;
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      const id = action.payload;

      const existingItem = state.items.find(
        (item) => item.id === id
      );

      if (!existingItem) return;

      state.totalQuantity -= 1;
      state.totalAmount -= existingItem.price;

      if (existingItem.quantity === 1) {
        state.items = state.items.filter(
          (item) => item.id !== id
        );
      } else {
        existingItem.quantity -= 1;
      }
    },

    // removeFromCart:()=>{

        
    // }

  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;