import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types";

/**
 * Favori Ürünler Durumu (Wishlist State)
 */
export interface WishlistState {
  items: Product[];
}

const initialState: WishlistState = {
  items: [],
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    /**
     * Ürünü favorilere ekler veya listeden kaldırır (Toggle)
     */
    toggleWishlist: (state, action: PayloadAction<Product>) => {
      const existsIndex = state.items.findIndex((item) => item.id === action.payload.id);
      if (existsIndex >= 0) {
        state.items.splice(existsIndex, 1);
      } else {
        state.items.push(action.payload);
      }
    },
    clearWishlist: (state) => {
      state.items = [];
    },
  },
});

export const { toggleWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
