import ChatsContainer from '@/Components/Chat/ChatsContainer/ChatsContainer';
import ContactsContainer from '@/Components/Chat/ContactsContainer/ContactsContainer';
import EmptyChatContainer from '@/Components/Chat/EmptyChatContainer/EmptyChatContainer';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import  {fetchContacts, fetchMessages} from '@/Components/ApiFunctions/Chat-ApiFunctions';
import { removeNotification } from '../Redux/Slices/chatSlice';
import message_loading from "../assests/message_loading.json";
import Lottie from 'lottie-react';
import SocketContext from '@/Sockets/socketContext';


function Chat() {
  let { targetUserId } = useParams();
  const { currentChatData,contactsloading,contactsData,messagesLoading} = useSelector((store) => store.chat);
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  let dispatch = useDispatch();
  let { setTargetUserId } = useContext(SocketContext);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  

  //CALL TO FETCH THE CONTACTS  
  useEffect(() => {
    fetchContacts(dispatch);
  }, []);

  //ONLY FETCH THE CHAT ON THE TARGETUSERID CHAT
  useEffect(() => {
    if (!targetUserId) return;
    fetchMessages(targetUserId, dispatch);
    dispatch(removeNotification(targetUserId));
  }, [targetUserId]);


  useEffect(() =>
  {
    setTargetUserId(targetUserId);
    return () => setTargetUserId("");
  }, [targetUserId]);
  
  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, [window.innerWidth]);

  if (!user && !user?.toString()) navigate('/login');
  console.log(contactsloading)
  if(contactsloading)
  {return (
    <div className="flex h-[100vh] bg-white justify-center items-center w-full ">
      (
      <>
     <Lottie animationData={message_loading}/>
      </>
      )
    </div>
  );
  }
  
  return (
    <div className="flex h-[90vh] bg-white ">
      (
      <>
        <ContactsContainer />
        {(targetUserId && (currentChatData || messagesLoading))  ? (
          <ChatsContainer />
        ) : (
          <EmptyChatContainer />
        )}
      </>
      )
    </div>
  );
}

export default Chat;
