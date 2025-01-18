import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { BASE_USL } from '../utiles/constants/constant';
import toast from 'react-hot-toast';
import { removeUser } from '../utiles/Slices/userSlice';
import { useDispatch } from 'react-redux';
import { removeConnections } from '../utiles/Slices/connections';
import { removeRequests } from '../utiles/Slices/requests';
import { removeFeed } from '../utiles/Slices/feedSlice';
import tinder from '../Images/tinder.png';

function Navbar() {
  const user = useSelector((store) => store.user);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const currentRoute = useLocation();

  //FUNCTION TO HANDLE LOGOUT
  let handleLogout = async () => {
    if (!user) return;
    try {
      await axios.post(
        BASE_USL + '/auth/logout',
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeUser());
      dispatch(removeConnections());
      dispatch(removeRequests());
      dispatch(removeFeed());
      navigate('/login');
      toast.success('Logout Successfully!!');
    } catch (err) {
      toast.error('Logout Failed!!');
    }
  };

  return (
    <div>
      <div
        className={`navbar fixed top-0 h-[70px] ${
          currentRoute.pathname == '/' ? 'bg-none' : 'bg-zinc-900'
        }  px-6 z-[50]`}
      >
        <div className="flex-1">
          <Link className="flex text-3xl font-mono" to={'/'}>
            <img className="mx-1 h-[40px] w-[40px]" src={tinder} />
            <h1 className="font-bold">Tinder</h1>
          </Link>
        </div>
        <div className="flex-none gap-2">
          {user?.firstName && (
            <label className="font-semibold text-1xl">
              Hi! {user.toString() ? user.firstName : ''}
            </label>
          )}
          <div className="form-control"></div>
          {user?.toString() && (
            <div className="dropdown dropdown-end ">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-12 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={
                      user?.toString()
                        ? user.photoUrl?.length > 0
                          ? user.photoUrl
                          : user.gender === 'female'
                          ? 'https://static.vecteezy.com/system/resources/previews/042/332/098/non_2x/default-avatar-profile-icon-grey-photo-placeholder-female-no-photo-images-for-unfilled-user-profile-greyscale-illustration-for-socail-media-web-vector.jpg'
                          : 'https://st.depositphotos.com/1779253/5140/v/450/depositphotos_51405259-stock-illustration-male-avatar-profile-picture-use.jpg'
                        : ''
                    }
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link className="justify-between" to={'/profile'}>
                    My Profile
                    <span className="badge">You</span>
                  </Link>
                </li>
                <li>
                  <Link to={'/feed'}>Feed</Link>
                </li>

                <li>
                  <Link to={'/connections'}>Friends</Link>
                </li>

                <li>
                  <Link to={'/requests'}>Friend Requests</Link>
                </li>

                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
