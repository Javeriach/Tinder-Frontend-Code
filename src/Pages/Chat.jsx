import ChatsContainer from '@/Components/Chat/ChatsContainer/ChatsContainer';
import ContactsContainer from '@/Components/Chat/ContactsContainer/ContactsContainer';
import EmptyChatContainer from '@/Components/Chat/EmptyChatContainer/EmptyChatContainer';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import  {fetchMessages} from '@/Components/ApiFunctions/Chat-ApiFunctions';
import { notificationsHandler, removeNotification } from '../Redux/Slices/chatSlice';
// import VoiceRecorder from '@/Components/Chat/SubFeatures/VoiceRecorder';

function Chat() {
  let { targetUserId } = useParams();
  const { currentChatData,contactsloading,contactsData} = useSelector((store) => store.chat);
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  let dispatch = useDispatch();
  
  //ONLY FETCH THE CHAT ON THE TARGETUSERID CHAT
  useEffect(() => {
    if (!targetUserId) return;
    fetchMessages(targetUserId, dispatch);
    dispatch(removeNotification(targetUserId));
  }, [targetUserId]);

  if (!user && !user?.toString()) navigate('/login');
  if(contactsloading)
  {return (
    <div className="flex h-[100vh] bg-white justify-center items-center w-full ">
      (
      <>
     <Lottie animationData={message_loading}/>
      </>
      )
    </div>
  );}


  // if(!targetUserId && !currentChatData?.firstName && !contactsData?.length)
  //   return <div className="flex h-[100vh] bg-white ">
  //    <EmptyChatContainer />
  //   </div>
  
  
  return (
    <div className="flex h-[100vh] bg-white ">
      (
      <>
        <ContactsContainer />
        {(targetUserId && currentChatData)  ? (
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
