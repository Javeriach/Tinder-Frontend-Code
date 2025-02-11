import { io } from 'socket.io-client';
import { BASE_USL } from '../utiles/constants/constant';
import React, { createContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const user = useSelector(store => store.user);
  const [onlineUsers, setOnlineUsers] = useState([]);
  
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
            path:"/api/socket.io/",
            query:{userId:userId}
          });
        }
    
    }
    const tempSocket = handleSocket();
    tempSocket.connect();
    setSocket(tempSocket);
  };

  console.log(location.hostname);

  const disconnectSocket = () => {
    socket?.disconnect();
    setSocket(null);
  };
  return (
    <SocketContext.Provider value={{ socket, connectSocket, disconnectSocket,onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
