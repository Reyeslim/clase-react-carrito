import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    ids: [],
  },
  reducers: {
    toggleLocalWishlist(state, action) {
      const exists = state.ids.includes(action.payload);

      state.ids = exists
        ? state.ids.filter((id) => id !== action.payload)
        : [...state.ids, action.payload];
    },
  },
});

export const { toggleLocalWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
