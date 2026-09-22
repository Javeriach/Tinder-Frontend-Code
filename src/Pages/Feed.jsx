import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import UserCard from '../Components/UserCard';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { BASE_USL } from '../utiles/constants/constant';
import { addFeed, appendFeed } from '../Redux/Slices/feedSlice';
import { UserCardSkeletion } from '@/ReuseAble_Components/UserCardSkeletion';

const PAGE_SIZE = 10;
// Fetch the next batch once the stack gets this small.
const REFILL_AT = 2;

function Feed() {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const feed = useSelector((store) => store.feed);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // Kept in refs so the effects below don't need them as deps / stale closures.
  const feedRef = useRef(feed);
  feedRef.current = feed;
  const fetchingRef = useRef(false);
  const hasMoreRef = useRef(true);

  // The backend already excludes users you've swiped, so every fresh call to
  // GET /feed returns the *next* unseen batch - we just keep pulling page 1.
  const fetchFeed = async ({ append = false } = {}) => {
    if (fetchingRef.current) return;
    if (append && !hasMoreRef.current) return;

    fetchingRef.current = true;
    if (!append) setLoading(true);

    try {
      const { data } = await axios.get(`${BASE_USL}/feed`, {
        params: { limit: PAGE_SIZE },
        withCredentials: true,
      });
      const users = data?.data || [];

      if (append) {
        const known = new Set(feedRef.current.map((u) => u._id));
        const fresh = users.filter((u) => u && !known.has(u._id));
        // Nothing new came back -> we've reached the end.
        hasMoreRef.current = fresh.length > 0;
        if (fresh.length) dispatch(appendFeed(fresh));
      } else {
        hasMoreRef.current = users.length >= PAGE_SIZE;
        dispatch(addFeed(users));
      }
    } catch (error) {
      console.log(error.message);
      toast.error('Something went wrong');
    } finally {
      fetchingRef.current = false;
      setLoading(false);
    }
  };

  // Initial load (and when returning to the page).
  useEffect(() => {
    if (user?.toString()) {
      hasMoreRef.current = true;
      fetchFeed({ append: false });
    }
  }, []);

  // Top the stack up before it runs out.
  useEffect(() => {
    if (user?.toString() && !loading && hasMoreRef.current && feed.length <= REFILL_AT) {
      fetchFeed({ append: true });
    }
  }, [feed.length, loading, user]);

  // Redirect to login when logged out - done in an effect, not during render,
  // so it doesn't fire while a different component (e.g. Navbar) is mid-update.
  useEffect(() => {
    if (user == null || !user?.toString()) {
      navigate('/login');
    }
  }, [user]);

  if (user == null || !user?.toString()) {
    return null;
  }

  return (
    <div
      className="md:justify-center bg-lime-700 pt-[90px] py-11 min-h-screen h-full md:pt-[120px] grid place-items-center"
      style={{
        background: `linear-gradient(0deg, rgba(253,120,87,1) 0%, rgba(253,41,125,1) 100%)`,
      }}
    >
      {loading ? (
        <UserCardSkeletion />
      ) : feed.length > 0 ? (
        feed.map((feeduser, index) => (
          <UserCard
            key={feeduser._id}
            feeduser={feeduser}
            index={index}
            feed={true}
            feedArray={feed}
          />
        ))
      ) : (
        <h1 className="mt-10 text-white text-center">No More Users Found!!</h1>
      )}
    </div>
  );
}

export default Feed;
