import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import UserCard from './UserCard';
import { useEffect } from 'react';
import axios from 'axios';
import { BASE_USL } from '../utiles/constants/constant';
import { addFeed } from '../utiles/Slices/feedSlice';

function Feed() {
  let user = useSelector((store) => store.user);
  let navigate = useNavigate();
  let feed = useSelector((store) => store.feed);
  let dispatch = useDispatch();
  if (!user) {
    navigate('/login');
    return;
  }

  const fetchFeed = async () => {
    try {
      const response = await axios.get(BASE_USL + '/feed', {
        withCredentials: true,
      });
        dispatch(addFeed(response.data.data));
    } catch (error) {
      console.log(error.message);
      toast.error('Something went wrong');
      throw new Error('Something went wrong!!');
    }
  };

  useEffect(() => {
    if (feed?.length === 0) {
      fetchFeed();
    }
  },[]);

  if (feed?.length === 0) {
    return <div className='min-h-[430px]'><h1 className='mt-10 text-white text-center'>No More Users Found!!</h1></div>
  }
  return (
    <div className="flex justify-center bg-lime-700 py-11 min-h-11"  style={{background: `linear-gradient(0deg, rgba(253,120,87,1) 0%, rgba(253,41,125,1) 100%)`}}>
      {feed && <UserCard user={feed[0]} feed={true} />}
    </div>
  );
}

export default Feed;
