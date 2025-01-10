import { useEffect, useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utiles/Slices/userSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { BASE_USL } from '../utiles/constants/constant';
import { removeConnections } from '../utiles/Slices/connections';
import { removeFeed } from '../utiles/Slices/feedSlice';
import { removeRequests } from '../utiles/Slices/requests';

function Login() {
  let [emailID, setEmailID] = useState('');
  let [password, setPassword] = useState('');
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let [message, setMessage] = useState('');
  let user = useSelector((store) => store.user);
  let [firstName, setFirstName] = useState('');
  let [lastName, setLastName] = useState('');
  let [loginFrom, setLoginForm] = useState(true);
  let [forgetPassword, setForgetPassword] = useState(false);
  let [error, setError] = useState('');
  let [showPassword, setShowPassword] = useState(false);

  const handleSignUp = async () => {
    if (error) setError('');
    // Add validation checks
    if (firstName.length < 5 || firstName.length > 50) {
      setError('First name length must be between 5 & 50.');
      return;
    }
    if (lastName.length < 5 || lastName.length > 50) {
      setError('Last name length must be between 5 & 50.');
      return;
    }
    if (password.length < 8) {
      setError('Password length must be at least 8.');
      return;
    }

    try {
      let response = await axios.post(
        BASE_USL + '/auth/signup',
        {
          firstName: firstName,
          lastName: lastName,
          email: emailID,
          password,
          gender: 'male',
          age: 20,
        },
        { withCredentials: true }
      );
      toast.success('Sign Up Successful!');
      dispatch(addUser(response.data));
      navigate('/profile');
      dispatch(removeConnections());
      dispatch(removeFeed());
      dispatch(removeRequests());
    } catch (error) {
      if (error.response.status === 400) {
        setError(error.response.data.message);
      } else if (error.response.data.message.includes('E11000')) {
        setError('Use a different Email address!');
      } else {
        toast.error('Something went wrong!');
      }
    }
  };

  const loginHandler = async () => {
    if (error) setError('');
    try {
      const result = await axios.post(
        `${BASE_USL}/auth/login`,
        {
          email: emailID,
          password,
        },
        {
          withCredentials: true,
        }
      );

      dispatch(addUser(result.data));
      toast.success('Login Successful!');
      navigate('/feed');
      dispatch(removeConnections());
      dispatch(removeFeed());
      dispatch(removeRequests());
    } catch (error) {
      if (error.response.status === 400) {
        setError(error.response.data.message);
      } else {
        toast.error('Something went wrong!');
      }
    }
  };

  let handleForgetPassword = async () => {
    try {
      setError('');
      let result = await axios.patch(
        BASE_USL + '/forgetPassword',
        {
          emailId: emailID,
          password,
        },
        { withCredentials: true }
      );
      toast.success('Password Updated Successfully!');
      setLoginForm(true);
      setForgetPassword(false);
    } catch (error) {
      if (error.response.status === 400) {
        setError(error.response.data.message);
      } else {
        toast.error('Something went wrong!');
      }
    }
  };

  return (
    <div className="w-full h-screen flex justify-center pt-[60px] overflow-y-auto bg-gray-100">
      <div className="card text-black bg-white w-[320px] mt-[60px] h-fit max-w-sm shadow-xl">
        <div className="card-body">
          <div>
            <h2
              className={`card-title text-3xl font-bold text-center ${
                forgetPassword && 'p-2'
              }`}
            >
              {!loginFrom && !forgetPassword
                ? 'Create a User'
                : forgetPassword
                ? 'Reset Password'
                : 'Welcome Back'}
            </h2>
          </div>

          {/* Input Fields */}
          <div>
            {/* Responsive Input Icon */}
          </div>
        </div>
      </div>
    </div>
  );
}
