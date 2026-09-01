import { createSlice } from '@reduxjs/toolkit';

const feedSlice = createSlice({
  name: 'feed',
  initialState: [],
  reducers: {
    // Replace the whole feed (initial load / refresh).
    addFeed: (state, action) => action.payload,

    // Add a fresh batch, skipping anyone already in the stack.
    appendFeed: (state, action) => {
      const seen = new Set(state.map((u) => u._id));
      const incoming = (action.payload || []).filter(
        (u) => u && !seen.has(u._id)
      );
      return [...state, ...incoming];
    },

    // Clear the feed (logout / switching account).
    removeFeed: () => [],

    removeSelectedUserFromFeed: (state, action) => {
      return state.filter((req) => req._id != action.payload);
    },
  },
});

export const { addFeed, appendFeed, removeFeed, removeSelectedUserFromFeed } =
  feedSlice.actions;
export default feedSlice.reducer;
