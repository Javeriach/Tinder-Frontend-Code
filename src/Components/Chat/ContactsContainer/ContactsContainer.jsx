import { fetchContacts } from '@/Components/ApiFunctions/Chat-ApiFunctions';
import SingleNotificationCard from './SignleNotificationCard';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SocketContext from '@/Sockets/socketContext';
import { useParams } from 'react-router-dom';

function ContactsContainer() {
  let [contacts, setContacts] = useState([]);
  let { currentChatData, contactsData} = useSelector(
    (store) => store.chat
  );
  let [hideContacts, setHideContacts] = useState(false);
  let { socket, onlineUsers } = useContext(SocketContext);
  let [windowWidth, setWindowWidth] = useState(window.innerWidth);
  let {targetUserId} = useParams();

  
  //=======================SET THE WINDOW WIDTH============================================

  useEffect(() => {
    function reportWindowSize() {
      if (windowWidth === window.innerWidth) return;
      
      setWindowWidth(window.innerWidth);
      if (window.innerWidth < 900 && currentChatData?.length) {
        setHideContacts(true);
        console.log(window.innerWidth);
      } else setHideContacts(false);
    }
    // Trigger this function on resize
    window.addEventListener('resize', reportWindowSize);
    //  Cleanup for componentWillUnmount
    return () => window.removeEventListener('resize', reportWindowSize);
  }, [targetUserId]);

  useEffect(() => {
    if (windowWidth < 900 && targetUserId) {
      setHideContacts(true);
      console.log(window.innerWidth);
    } else setHideContacts(false);
  }, [targetUserId]);
  
  useEffect(() => {
    if (contactsData?.length) setContacts(contactsData);
  }, [contactsData, windowWidth]);

  if (!contacts?.length) {
    return (
      <div
        className={` relative md:w-[35vw] lg:w-[30vw] pt-[70px]   xl:w-[25vw] bg-white border-r-[1px] w-full ${
          hideContacts ? 'hidden' : 'flex flex-col'
        }`}
      >
        <h1 className="font-bold text-center text-black pt-[50px]">
          No Recent Chat Available
        </h1>
      </div>
    );
  }
  return (
    !hideContacts && (
      <div
        className={` relative md:w-[35vw] lg:w-[30vw] pt-[70px]   xl:w-[25vw] bg-white border-r-[1px] w-full `}
      >
        <h1 className=" font-poppins text-[18px] font-semibold px-9 mt-1  text-[#fe3c72]">
          Messages
        </h1>
        <div className="bg-black h-[1px] mt-2 opacity-5"></div>
        {/* MAPPING OVER THE CONTACTS IN OUR DATABASE */}
        <div className="flex flex-col items-center overflow-y-auto h-[90%]">
          {contacts?.map((contact) => {
            return (
              <SingleNotificationCard
                onlineUsers={onlineUsers}
                ContactInfo={contact?.ContactData[0]}
                latestTimestamp={contact.latestTimestamp}
              />
            );
          })}
        </div>
      </div>
    )
  );
}

export default ContactsContainer;
