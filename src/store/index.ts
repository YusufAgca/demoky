import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import wishlistReducer from "./slices/wishlistSlice";
import uiReducer from "./slices/uiSlice";

/**
 * Redux Store Yapılandırması
 * 
 * Mimari Açıklama:
 * Uygulamanın sepet (cart), favoriler (wishlist) ve arayüz durumları (ui)
 * Redux Toolkit ile merkezi, tahmin edilebilir ve tip güvenli (type-safe)
 * olarak yönetilir.
 */
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    ui: uiReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
