import { createSlice } from '@reduxjs/toolkit';
let chatSlice = createSlice({
  name: 'chat',
  initialState: {
    currentChatData: [],
    contactsData: [],
    contactsloading: false,
    messagesLoading: false,
    notifications: [],
  },

  reducers: {
    currentChatDataHandler: (state, action) => {
      console.log(action.payload);

      const currentData = action.payload;
      return {
        ...state,
        currentChatData: currentData?.length ? currentData[0] : {},
      };
    },
    currentChatMessageSetter: (state, action) => {
      return {
        ...state,
        currentChatData: {
          ...state.currentChatData,
          messages: [...state.currentChatData.messages, action.payload],
        },
      };
    },
    contacts_DataUpdater_on_Message_Arrival: (state, action) => {
      //first filterout the contacts
      const filteredData = state.contactsData.map((contact) => {
        return contact.roomId == action.payload.roomId;
      });

      const remainingContacts = state.contactsData.map((contact) => {
        return contact.roomId != action.payload.roomId;
      });
      if (filteredData.length === 0) {
        return {
          ...state,
          contactsData: [
            {
              _id: action.payload._id,
              roomId: action.payload?.roomId,
              latestTimestamp: action?.payload?.latestTimestamp,
              ContactData: [action.payload?.ContactData],
            },
            ...state.contactsData,
          ],
        };
      } else return state;
    },
    removeCurrentChatData: (state, action) => {
      console.log('I am callled-undefined');
      return { ...state, currentChatData: undefined };
    },
    setCurrentContacts: (state, action) => {
      return { ...state, contactsData: action.payload };
    },
    setContactsLoading: (state, action) => {
      return { ...state, contactsloading: action.payload };
    },
    setMessageLoading: (state, action) => {
      return { ...state, messagesLoading: action.payload };
    },

    notificationsHandler: (state, action) => {
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
      };
    },
    removeNotification: (state, action) => {
      const filterNotifications = state.notifications.filter((notification) => {
        return notification.senderId != action.payload;
      });
      return {
        ...state,
        notifications: filterNotifications,
      };
    },
    ImagePreviewHandler: (state, action) => {
      return {
        ...state,
        ImageToPreview: action.payload,
      };
    },
  },
});
export let {
  currentChatDataHandler,
  setCurrentContacts,
  removeCurrentChatData,
  setContactsLoading,
  setMessageLoading,
  currentChatMessageSetter,
  contacts_DataUpdater_on_Message_Arrival,
  notificationsHandler,
  removeNotification,
} = chatSlice.actions;
export default chatSlice.reducer;
