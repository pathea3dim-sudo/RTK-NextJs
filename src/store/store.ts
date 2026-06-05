// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '@/features/countSlice/countSlice'  // ← Changed path

export const makeStore = () => configureStore({
  reducer: {
    cart: cartReducer  // State name remains 'cart'
  }
});

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']