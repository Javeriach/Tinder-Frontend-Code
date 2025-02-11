import { createSlice } from '@reduxjs/toolkit';

let requestSlice = createSlice({
  name: 'requests',
  initialState: [],
  reducers: {
    addRequests: (state, action) => action.payload,
    removeRequests: () => [],
  },
});

export const { addRequests, removeRequests } = requestSlice.actions;
export default requestSlice.reducer;
