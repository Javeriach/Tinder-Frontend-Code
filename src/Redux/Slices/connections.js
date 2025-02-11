import { createSlice } from '@reduxjs/toolkit';
let connectionsSlice = createSlice({
  name: 'connections',
  initialState: [],
  reducers: {
    addConnections: (state, action) => action.payload,
    removeConnections: (state, action) => [],
  },
});
export let { addConnections, removeConnections } = connectionsSlice.actions;
export default connectionsSlice.reducer;
