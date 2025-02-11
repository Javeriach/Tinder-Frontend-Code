import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SingleNotificationCard = ({
  ContactInfo,
  latestTimestamp,
  onlineUsers,
}) => {
  let friend = ContactInfo;
  let { notifications } = useSelector(store => store.chat);
  const unreadMessages = notifications?.filter((notification) =>
  {
    return notification.senderId === ContactInfo?._id;
  })

  const isoString = latestTimestamp;

  // Convert to local time
  const date = new Date(isoString);

  // Format the time
  const hours = date.getHours() % 12 || 12; // Convert to 12-hour format
  const minutes = date.getMinutes();
  const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

  // Ensure two-digit minute formatting
  const formattedTime = `${hours}:${minutes
    .toString()
    .padStart(2, '0')} ${ampm}`;

  return (
    <Link
      to={'/chat/' + friend?._id}
      className="flex items-center p-4 hover:bg-gray-300 hover:rounded-2xl border-gray-500 border-b-[0.1px] border-opacity-10 bg-white cursor-pointer text-white  w-[90%] max-w-md"
    >
      {/* Avatar */}
      

      <div class="relative">
        <img
          class="w-14 h-14 rounded-sm"
          src={friend?.photoUrl}
          alt=""
        ></img>
        <span class={`absolute top-0 left-11 transform -translate-y-1/2 w-3.5 h-3.5 ${onlineUsers.includes(friend?._id) ?"bg-green-600":"bg-red-600"}  border-2 border-white dark:border-gray-800 rounded-full`}></span>
      </div>

      {/* Content */}
      <div className="ml-4 flex-grow">
        <div className="flex justify-between items-center">
          <h2 className=" font-semibold text-[17px]  text-black font-Roboto">
            {friend?.firstName} {friend?.lastName}
          </h2>
          <span className="text-sm text-gray-400">{formattedTime}</span>
        </div>
        <div className='flex justify-between'>
        <p className="font-semibold text-[15px] mt-1 text-black">
          {onlineUsers.includes(friend?._id) ? 'Online' : 'Offline'}
          </p>
{          unreadMessages.length > 0 && <div className='newMessageNotification bg-blue font-semibold flex justify-center items-center text-[10px] text-white bg-blue-600 w-[22px] h-[23px] rounded-full'>{unreadMessages?.length > 0 ? unreadMessages?.length:""}</div>
}        </div>
        
      </div>
    </Link>
  );
};

export default SingleNotificationCard;
