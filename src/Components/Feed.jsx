import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import UserCard from './UserCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_USL } from '../utiles/constants/constant';
import { addFeed } from '../utiles/Slices/feedSlice';
import { UserCardSkeletion } from '@/ReuseAble_Components/UserCardSkeletion';

function Feed() {
  let user = useSelector((store) => store.user);
  let navigate = useNavigate();
  let feed = useSelector((store) => store.feed);
  let [loading, setLoading] = useState(false);
  let dispatch = useDispatch();
  if (!user) {
    navigate('/login');
    return;
  }

  const fetchFeed = async () => {
    try {
      setLoading(false);
      const response = await axios.get(BASE_USL + '/feed', {
        withCredentials: true,
      });
        dispatch(addFeed(response.data.data));
    } catch (error) {
      console.log(error.message);
      toast.error('Something went wrong');
      throw new Error('Something went wrong!!');
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
   
      fetchFeed();
    
  },[]);

  return (
    <div className="flex justify-center bg-lime-700 py-11 min-h-screen h-full pt-[100px]"  style={{background: `linear-gradient(0deg, rgba(253,120,87,1) 0%, rgba(253,41,125,1) 100%)`}}>
      {
        loading?<UserCardSkeletion/>:feed.length === 0 ?<h1 className='mt-10 text-white text-center'>No More Users Found!!</h1>:
       <UserCard user={feed[0]} feed={true} />}
    </div>
  );
}

export default Feed;
