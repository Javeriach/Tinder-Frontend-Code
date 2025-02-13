import { io } from 'socket.io-client';
import { BASE_USL } from '../utiles/constants/constant';
import React, { createContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currentChatMessageSetter, notificationsHandler } from '@/Redux/Slices/chatSlice';
import toast from 'react-hot-toast';
import { fetchContacts } from '@/Components/ApiFunctions/Chat-ApiFunctions';
const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const user = useSelector(store => store.user);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { currentChatData,contactsData } = useSelector(store => store.chat);
  const [targetUserId, setTargetUserId] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {

          socket?.on("getOnlineUsers", (onlineUsers) => {
              console.log(onlineUsers, "onlineUsers");
              setOnlineUsers(onlineUsers);
          });
    
    return () => socket?.disconnect();
  }, [socket]);

  
  const connectSocket = (userId) => {
    if (socket)
    {
      return;
    }

    const handleSocket = () =>
    {
      if (location.hostname == "localhost")
        {
          return io(BASE_USL,{
            query:{userId:userId}
          });
        }
        else {
        return io("/", {
            path:"/api/socket.io",
            query:{userId:userId}
          });
        }
    
    }
    const tempSocket = handleSocket();
    tempSocket.connect();
    setSocket(tempSocket);
  };

  //====================================================Messages Handler====================================================
  useEffect(() => {
      const handleMessage = (msg) => {
        console.log('Message Received', msg);
        if (msg.roomId === currentChatData.roomId && targetUserId) {
          dispatch(
            currentChatMessageSetter({
              text: msg.newMessage.text,
              senderId: msg.newMessage.senderId,
              imageURL: msg.newMessage.imageURL,
              createdAt: msg.newMessage.createdAt
            })
          );

          const filtersContact = contactsData?.filter((contact) =>
          {
            return contact.roomId == msg.roomId;
          })
          console.log(filtersContact);
          if (filtersContact?.length == 0)
            fetchContacts(dispatch);
          
        } else {
          fetchContacts(dispatch);
          dispatch(
            notificationsHandler({
              senderId: msg?.newMessage.senderId._id,
              roomId: msg?.roomId,
              firstName: msg?.newMessage.senderId.firstName,
              lastName: msg.newMessage.senderId.lastName,
              photoUrl: msg?.newMessage.senderId.photoUrl,
              msg: msg?.newMessage.text ? msg?.newMessage.text : '📷Photo',
              time: msg.newMessage.createdAt,
            })
          );
        }
      };
      const handleError = (problem) => {
        toast.error('Network Error');
      };
  

      //HANDLER OF RECEIVE MESSAE HANDLER
      socket?.on('messageReceived', handleMessage);
      //Message in case of error
  
      socket?.on('ImageProblem', handleError);
      
      //DON'T FORGET TO REMOVE THE LISTENER
      return () => {
        socket?.off('messageReceived', handleMessage);
      };
  });
  
  const disconnectSocket = () => {
    socket?.disconnect();
    setSocket(null);
  };
  return (
    <SocketContext.Provider value={{ socket, connectSocket, disconnectSocket,onlineUsers,setTargetUserId}}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
