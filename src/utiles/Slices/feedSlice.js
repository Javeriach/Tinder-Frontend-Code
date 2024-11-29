import { createSlice } from '@reduxjs/toolkit';

const feedSlice = createSlice({
  name: 'feed',
  initialState: [],
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },
    removeFeed: (state, action) => {
      return action.payload;
    },
    removeSelectedUserFromFeed: (state, action) => {
      let data = state.filter((req) => req._id != action.payload);
      return data;
    },
  },
});
export const { addFeed, removeFeed, removeSelectedUserFromFeed } =
  feedSlice.actions;
export default feedSlice.reducer;
