import axios from 'axios';
import toast from 'react-hot-toast';
import { BASE_USL } from '../utiles/constants/constant';
import { useDispatch } from 'react-redux';
import { removeSelectedUserFromFeed } from '../utiles/Slices/feedSlice';
import {
  motion,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import { useState } from 'react';
// import { UserCardSkeletion } from '@/ReuseAble_Components/UserCardSkeletion';
import loading from "../utiles/Lotties/Loading.json";
import Lottie from 'lottie-react/build';

function UserCard({ feeduser: user, feed, index, feedArray }) {


  let dispatch = useDispatch();
  const x = useMotionValue(0);
  let [isLoading, setLoading] = useState(false);
  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);
  const rotateRaw = useTransform(x, [-150, 150], [-18, 18]);
  const rotate = useTransform(() => {
    const offset = index == feedArray?.length - 1 ? 0 : index % 2 ? 6 : -6;
    return `${rotateRaw.get() + offset}deg`;
  });

  if (!user) return;
  let { firstName, lastName, about, age, gender, photoUrl, _id } = user;

  if (about.length > 200) {
    about = about.substring(0, 50);
    about = about + '...';
  }

  let handleDrayEnd = async () => {
    let status = 'interested';
    if (x.get() < 0) {
      status = 'ignored';
    } else if (x.get() == 0) {
      return;
    }

    setLoading(true);
    try {
      let response = await axios.post(
        BASE_USL + '/request/send/' + status + '/' + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeSelectedUserFromFeed(_id));
    } catch (error) {
      toast.error('Something went wrong');
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading){ return <div className='absolute'>
    <Lottie className='h-[100px]' animationData={ loading}  />
  </div>
  }
  else return (
    <motion.div
      className={`card max-[800px]:mt-3  origin-center  rounded-2xl bg-gray-950  h-[500px] w-[300px]  md:h-[640px] md:w-[350px] hover:cursor-grab active:cursor-grabbing
        ${index == feedArray?.length - 1 ? "shadow-md shadow-red-500" : "" }`}
      style={{
        gridRow: 1,
        gridColumn: 1,
        x,
        opacity,
        rotate,
        transition: '0.125s transform',
         
      }}
      animate={{ scale: index == feedArray?.length - 1 ? 1 : 0.98 }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDrayEnd}
    >

      <motion.img
        onDragStart={(e) => e.preventDefault()}
        className="h-[350px] w-full md:w-[350px] md:h-[440px] rounded-t-2xl"
        src={
          photoUrl
            ? photoUrl
            : gender === 'female'
            ? 'https://static.vecteezy.com/system/resources/previews/042/332/098/non_2x/default-avatar-profile-icon-grey-photo-placeholder-female-no-photo-images-for-unfilled-user-profile-greyscale-illustration-for-socail-media-web-vector.jpg'
            : 'https://st.depositphotos.com/1779253/5140/v/450/depositphotos_51405259-stock-illustration-male-avatar-profile-picture-use.jpg'
        }
        alt={firstName}
      />
      <div className="card-body pt-0 mt-2">
        <h2 className="card-title fw-bold">{firstName + ' ' + lastName} </h2>
        <p className="text-[15px] font-semibold">{about}</p>
        {age && gender && (
          <p>
            Gender {gender} , Age: {age}
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default UserCard;
