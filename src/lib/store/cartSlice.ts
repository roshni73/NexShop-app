import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, Product } from '@/types/product';

interface CartState {
  items: CartItem[];
  total: number;
  totalItems: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
  totalItems: 0,
};

const calculateTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  return { total: Math.round(total * 100) / 100, totalItems };
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      const totals = calculateTotals(state.items);
      state.total = totals.total;
      state.totalItems = totals.totalItems;
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      const totals = calculateTotals(state.items);
      state.total = totals.total;
      state.totalItems = totals.totalItems;
    },

    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = Math.max(0, action.payload.quantity);
        if (item.quantity === 0) {
          state.items = state.items.filter(i => i.id !== action.payload.id);
        }
      }

      const totals = calculateTotals(state.items);
      state.total = totals.total;
      state.totalItems = totals.totalItems;
    },

    isInCart:(state, action: PayloadAction<{id: number}>) => {
      const item = state.items.find(item => item.id === action.payload.id);

    },

    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.totalItems = 0;
    },

    rehydrateCart: (state, action: PayloadAction<CartState>) => {
      return action.payload;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, rehydrateCart } = cartSlice.actions;
export default cartSlice.reducer;