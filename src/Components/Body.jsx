import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import toast, { Toaster } from 'react-hot-toast';
import { BASE_USL } from '../utiles/constants/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../Redux/Slices/userSlice';
import { useContext, useEffect } from 'react';
import axios from 'axios';
import SocketContext from '@/Sockets/socketContext';
import { fetchNotifications } from './ApiFunctions/Chat-ApiFunctions';
function Body() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector(store => store.user);
  const {socket,disconnectSocket,connectSocket} = useContext(SocketContext);
  // An open one-on-one chat has its own header (with a close button), so the
  // global navbar is redundant chrome there - hide it on mobile to give the
  // conversation more vertical space. Kept visible on tablet/desktop where
  // there's room for both.
  const isChatOpen = /^\/chat\/.+/.test(location.pathname);

  useEffect(() => {

    return () => {
      disconnectSocket() //IT WILL DISCONNECT THE SOCKET CONNECTION
    };
  }, []);


  const fetchUser = async () => {
    try {
      const user = await axios.get(`${BASE_USL}/profile/view`, {
        withCredentials: true,
      });
      dispatch(addUser(user.data));
      connectSocket(user.data._id); //IT WILL CONNECT THE SOCKET CONNECTION
      navigate("/feed");
    } catch (error) {
      if (error.response?.status === 401) {
        navigate('/');
      } else {
        console.log(error);
        toast.error('Something went wrong!!');
      }
    }
  };

  useEffect(() => {
    if (!user?.toString())
    {
      fetchUser();
    }
  }, []);

  // Load any unread-message notifications from before this session started
  // (e.g. messages received while offline) as soon as the user is known -
  // regardless of which page they land on.
  useEffect(() => {
    if (user?.toString()) {
      fetchNotifications(dispatch);
    }
  }, [user?._id]);

  return (
    <div  className='bg-custom-gradient'>
      <div className={isChatOpen ? 'hidden md:block' : ''}>
        <Navbar />
      </div>
      <Outlet />
      <Toaster />
    </div>
  );
}

export default Body;
