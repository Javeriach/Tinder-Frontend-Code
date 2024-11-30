import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import toast, { Toaster } from 'react-hot-toast';
import { BASE_USL } from '../utiles/constants/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utiles/Slices/userSlice';
import { useEffect } from 'react';
import axios from 'axios';

function Body() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.user);

  const fetchUser = async () => {
    try {
      const user = await axios.get(`${BASE_USL}/profile/view`, {
        withCredentials: true,
      });
        dispatch(addUser(user.data));
        navigate("/feed");
    } catch (error) {
      if (error.status === 401) {
        navigate('/');
      } else {
        toast.error('Something went wrong!!');
        throw new Error('Something  went wrong!!');
      }
    }
  };

  useEffect(() => {
    if (!user)
    {
      fetchUser();
    }
  }, []);

  return (
    <div  className='bg-custom-gradient'>
      <Navbar />
      <Outlet />
      {/* <Footer /> */}
      <Toaster />
    </div>
  );
}

export default Body;
