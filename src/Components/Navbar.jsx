import axios from "axios";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { BASE_USL } from "../utiles/constants/constant";
import toast from "react-hot-toast";
import {removeUser } from "../utiles/Slices/userSlice";
import { useDispatch } from "react-redux";
import { removeConnections } from "../utiles/Slices/connections";
import { removeRequests } from "../utiles/Slices/requests";
import { removeFeed } from "../utiles/Slices/feedSlice";
import tinder from "../Images/tinder.png";

function Navbar() {
  const user = useSelector(store => store.user);
  let dispatch = useDispatch();
  let navigate = useNavigate();

  let handleLogout = async () =>
  {
    if (!user) return;
    try {
      
      await axios.post(BASE_USL + '/auth/logout', {}, {
        withCredentials:true
      });
      dispatch(removeUser());
      dispatch(removeConnections());
      dispatch(removeRequests());
      dispatch(removeFeed());
      navigate("/login");
      toast.success("Logout Successfully!!");
    } catch (err)
    {
      toast.error("Logout Failed!!");
    }
  }

  return (
    <div>
      <div className="navbar top-0 h-[70px] absolute px-6 z-[1000]">
        <div className="flex-1">
          <Link className="flex text-3xl font-mono" to={'/'}>
            <img className="mx-1 h-[40px] w-[40px]" src={tinder} />
            <h1 className="font-bold">
            Tinder
            </h1>
           </Link>
        </div>
        <div className="flex-none gap-2">
        {user?.firstName && <label className="font-bold">Hi! {user.firstName} </label>}
          <div className="form-control">
          </div>
          {user && <div className="dropdown dropdown-end ">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >

              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={user?.photoUrl}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link className="justify-between" to={'/profile'}>
                  Profile
                  <span className="badge">New</span>
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
          </div>}
        </div>
      </div>
    </div>
  )
}

export default Navbar
