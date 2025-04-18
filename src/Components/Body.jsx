import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import toast, { Toaster } from 'react-hot-toast';
import { BASE_USL } from '../utiles/constants/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../Redux/Slices/userSlice';
import { useContext, useEffect } from 'react';
import axios from 'axios';
import SocketContext from '@/Sockets/socketContext';
function Body() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  const {socket,disconnectSocket,connectSocket} = useContext(SocketContext);

  useEffect(() => {

    return () => {
      disconnectSocket() //IT WILL DISCONNECT THE SOCKET CONNECTION
    };
  }, []);


  const fetchUser = async () => {
    try {
      const user = await axios.get(`/profile/view`, {
        withCredentials: true,
      });
      dispatch(addUser(user.data));
      connectSocket(user.data._id); //IT WILL CONNECT THE SOCKET CONNECTION
      navigate("/feed");
    } catch (error) {
      console.log(error);
      if (error.status === 401) {
        navigate('/');
      } else {
        
        toast.error('Something went wrong!!');
        throw new Error('Something  went wrong!!');
      }
    }
  };

  useEffect(() => {
    if (!user?.toString())
    {
      fetchUser();
    }
  }, []);

  return (
    <div  className='bg-custom-gradient'>
      <Navbar />
      <Outlet />
      <Toaster />
    </div>
  );
}

export default Body;
