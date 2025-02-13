import axios from 'axios';
import {
  currentChatDataHandler,
  setCurrentContacts,
  setContactsLoading,
  setMessageLoading,
} from '@/Redux/Slices/chatSlice';

import { BASE_USL } from '../../utiles/constants/constant';
// Fetch Contacts

export const fetchContacts = async (dispatch) => {
  try {
    dispatch(setContactsLoading(true));
    const response = await axios.get(`${BASE_USL}/contacts`, {
      withCredentials: true,
    });
    dispatch(setCurrentContacts(response.data));
  } catch (error) {
    console.error('Error fetching contacts:', error.message);
    throw new Error('Failed to fetch contacts. Please try again later.');
  } finally {
    dispatch(setContactsLoading(false));
  }
};

// Fetch Messages for a Specific User
export const fetchMessages = async (targetUserId, dispatch) => {
  if (!targetUserId) {
    console.error('Target user ID is required.');
    return;
  }

  try {
    dispatch(setMessageLoading(true)); // Set loading state to true
    const response = await axios.get(
      `${BASE_USL}/oneUserchat/${targetUserId}`,
      {
        withCredentials: true,
      }
    );

    let data = response.data;
    console.log(data);
    dispatch(currentChatDataHandler(data)); // Update current chat data
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch messages. Please try again later.');
  } finally {
    dispatch(setMessageLoading(false)); // Set loading state to false
  }
};
