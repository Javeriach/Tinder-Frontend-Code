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
    if(user.toString())
      fetchFeed();
  },[]);

  return (
    <div className="md:justify-center bg-lime-700 pt-[70px] py-11 min-h-screen h-full md:pt-[100px] grid place-items-center"  style={{background: `linear-gradient(0deg, rgba(253,120,87,1) 0%, rgba(253,41,125,1) 100%)`}}>
      {
        loading?<UserCardSkeletion/>:feed.length === 0 ?<h1 className='mt-10 text-white text-center'>No More Users Found!!</h1>:
          feed?.map((feeduser,index) =>(
                <UserCard key={index} feeduser={feeduser} index={index} feed={true} feedArray={feed} />
          )
          )
          
      
      }
    </div>
  );
}

export default Feed;
