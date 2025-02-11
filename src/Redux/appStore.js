import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Slices/userSlice';
import feedReducer from './Slices/feedSlice';
import connectionReducer from './Slices/connections';
import requestReducer from './Slices/requests';
import ChatReducer from './Slices/chatSlice.js';
// import modelReducer from './Slices/Models.js';
///---new commit
const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connections: connectionReducer,
    requests: requestReducer,
    chat: ChatReducer,
    // model: modelReducer,
  },
});
export default store;
