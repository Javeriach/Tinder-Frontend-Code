import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CancelIcon from '@mui/icons-material/Cancel';
import { removeCurrentChatData } from '@/Redux/Slices/chatSlice';
import SocketContext from '@/Sockets/socketContext';
import {useNavigate} from 'react-router-dom';
const ChatHeader = ({ contactData }) => {
  
  let dispatch = useDispatch();
  let { onlineUsers } = useContext(SocketContext);  
  const navigate = useNavigate();

  //========================================DELETE THE TARGETUSEID PARAM AND ALSO THE CURRENT CHAT=============================
  const closeChat = () => {
    navigate("/chat", { replace: true }); // Navigate to "/chat" only
    dispatch(removeCurrentChatData());
  }
  
  return (
    <div
      className="w-full flex items-center justify-between p-4 border-gray-500 border-b-[0.1px] border-opacity-10
     bg-white cursor-pointer text-white h-[80px]  "
    >
      {/* Avatar */}
      <div className="flex">
        <div className="w-14 h-14 flex-shrink-0 rounded-full bg-blue-500 ring-2 ring-[#fe3c72]  flex items-center text-xl font-bold">
          <img
            src={contactData?.photoUrl}
            className="w-full h-full rounded-full"
          />
        </div>

        {/* Content */}
        <div className=" ml-3 flex-grow ">
          <div className="flex flex-col ">
            <h2 className=" font-semibold text-[17px]  text-black font-Roboto">
              {contactData?.firstName} {contactData?.lastName}
            </h2>
            <span className="text-sm text-gray-400">{onlineUsers?.includes(contactData._id)?"Online":"Last Seen:24 mint ago"}</span>
          </div>
        </div>
      </div>
      <CancelIcon className='text-black' onClick={closeChat} />
    </div>
  );
};

export default ChatHeader;
