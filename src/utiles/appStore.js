import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Slices/userSlice';
import feedReducer from './Slices/feedSlice';
import connectionReducer from './Slices/connections';
import requestReducer from './Slices/requests';
///
const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connections: connectionReducer,
    requests: requestReducer,
  },
});
export default store;
