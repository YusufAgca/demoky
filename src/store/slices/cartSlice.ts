import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, Product } from "@/types";
import { getEffectivePrice } from "@/lib/utils";

/**
 * Sepet Durumu Arayüzü (Cart State Interface)
 */
export interface CartState {
  items: CartItem[];
  isOpen: boolean;
  totalQuantity: number;
  totalAmount: number;
}

const initialState: CartState = {
  items: [],
  isOpen: false,
  totalQuantity: 0,
  totalAmount: 0,
};

/**
 * Toplam miktar ve tutarı yeniden hesaplayan yardımcı fonksiyon
 */
const recalculateTotals = (state: CartState) => {
  state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
  state.totalAmount = state.items.reduce(
    (total, item) =>
      total +
      getEffectivePrice(item.product.price, item.product.discountedPrice) *
        item.quantity,
    0
  );
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<{ product: Product; quantity?: number }>) => {
      const { product, quantity = 1 } = action.payload;
      const existingItem = state.items.find((item) => item.product.id === product.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ product, quantity });
      }

      recalculateTotals(state);
      state.isOpen = true;
    },

    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.product.id !== action.payload);
      recalculateTotals(state);
    },

    updateQuantity: (state, action: PayloadAction<{ productId: number; quantity: number }>) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find((item) => item.product.id === productId);

      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter((i) => i.product.id !== productId);
        } else {
          item.quantity = quantity;
        }
      }

      recalculateTotals(state);
    },

    openCart: (state) => {
      state.isOpen = true;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

export const {
  addItem,
  removeItem,
  updateQuantity,
  openCart,
  closeCart,
  toggleCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
