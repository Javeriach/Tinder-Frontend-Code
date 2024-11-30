import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utiles/Slices/userSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { BASE_USL } from '../utiles/constants/constant';

function Login() {
  let [emailID, setEmailID] = useState('amina@gmail.com');
  let [password, setPassword] = useState('Amina123@#');
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let [message, setMessage] = useState('');
  let user = useSelector((store) => store.user);
  let [firstName, setFirstName] = useState('');
  let [lastName, setLastName] = useState('');
  let [loginFrom, setLoginForm] = useState(true);
  let [forgetPassword, setForgetPassword] = useState(false);
  let [error, setError] = useState("");
  
  console.log(firstName, lastName, password, emailID);
  const handleSignUp = async () =>
  {
    if(error) setError("");
    if (password.length < 8)
    {
      setError("Password length must be atleast 8.");
      return;
    }

    if (firstName.length < 5 || firstName.length > 50)
      {
        setError("First name length must be between 5 & 50.");
        return;
    }
    if (lastName.length < 5 || lastName.length > 50)
      {
        setError("Last name length must be between 5 & 50.");
        return;
    }

    try {
      let response = await axios.post(BASE_USL+"/auth/signup", { 
        firstName:firstName,
        lastName:lastName,
        email:emailID,
        password,
        gender: "male",
        age: 20,
        
       }, {withCredentials: true });
      toast.success("LoginNow");
      dispatch(addUser(response.data));
      navigate("/profile");
    } catch (error)
    {
      if (error.status === 400) setError(error.response.data);
      else toast.error("Something went wrong!!");
      console.log(error);
      throw new Error('ERROR' + error.message);
    }
  }

  const loginHandler = async () => {
    if(error) setError("");
    if (password.length < 8)
    {
      setError("Password length must be atleast 8.");
      return;
    }


    try {
      const result = await axios.post(
        'http://localhost:7777/auth/login',
        {
          email: emailID,
          password,
        },
        {
          withCredentials: true,
        }
      );

      dispatch(addUser(result.data));
      toast.success('Login successfully!!');
      navigate('/feed');
    } catch (error) {
      if (error.status === 400) setError(error.response.data);
      else toast.error("Something went wrong!!");
      throw new Error('ERROR' + error.message);
    }
  };

  let handleForgetPassword = async () => {
    try {
      setError("");
      let result = await axios.patch(BASE_USL + "/forgetPassword", {
        emailId: emailID,
        password
      }, { withCredentials: true });
      toast.success("Password Updated Successfully!!");
      setLoginForm(true);
      setForgetPassword(false);
    } catch (error)
    {
      if (error.status === 400) {
        setError(error.response.data.message);
      } else toast.error("Something went wrong!!");
    }
    
  }
  // useEffect(() => {
  //   if (message) {
  //     setTimeout(() => {
  //       setMessage('');
  //     }, 3000);
  //     return;
  //   }

  //   setMessage('Please Login');
  // }, [user, message]);


  
  return (

    <div  
      className="w-full  h-[500px] flex  justify-center items-center">
     
      <div className="card text-black bg-white w-[320px]  max-w-96 shadow-xl">
        <div className="card-body ">
          <div>
            <h2 className={`card-title text-3xl justify-center font-bold cursor-pointer ${forgetPassword && "p-2"}`}>
              {!loginFrom && !forgetPassword ? 'Create a user' : forgetPassword?"Reset Password" :'Welcome Back'}
            </h2>
          </div>

          {!loginFrom && !forgetPassword &&
            <>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70 text-white"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input
                  type="text"
                  className="grow text-white"
                  placeholder="First Name"
                  onChange={(e)=>setFirstName(e.target.value)}
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70 text-white"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input
                  type="text"
                  className="grow text-white"
                  placeholder="Last Name"
                  onChange={(e)=>setLastName(e.target.value)}
                  
                />
              </label>
            </>
          }

          <label className={`input input-bordered flex items-center gap-2 ${loginFrom || !forgetPassword && "mt-3"} text-white`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70 text-white"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Email"
              value={emailID}
              onChange={(e) => setEmailID(e.target.value)}
            />
          </label>
          <div>
          <label className="input input-bordered flex items-center gap-2  text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70 text-white"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <div>
                <input
                  placeholder={forgetPassword?"Enter new Password":"Enter Password"}
              type="password"
              className="grow "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
            </div>            
            </label>
            {error && <p className='text-red-600 font-semibold'>{error}</p>}
          {loginFrom && !forgetPassword  &&  <div>
              <p className='ms-[125px] text-[15px] font-semibold cursor-pointer' onClick={() => {
                setForgetPassword(!forgetPassword);
                setLoginForm(false);
              }}>Forget Password?</p>
            </div>}
          </div>
          

          
          <div className="card-actions justify-center ">
            <button
              className=" h-[40px] bg-sky-700 rounded text-white btn-primary w-[150px] font-bold text-[20px]"
              onClick={loginFrom && !forgetPassword ? loginHandler :forgetPassword ?handleForgetPassword:handleSignUp}
            >
              {loginFrom ?  "Login": forgetPassword ? "Reset Password":"Sign Up"}
            </button>

            {loginFrom && !forgetPassword ? 
            <p className='text-center text-[15px]' onClick={()=>setLoginForm(ps=>!ps)}>
              Don't have an account?<span className='text-blue-950 font-bold cursor-pointer text-[17px]'> SignUp</span>
            </p>
            :
              <p className='text-center  text-[15px]' onClick={() => {
                setLoginForm(ps => !ps)
                setForgetPassword(false)
            }}>
              Already have an Account?<span className='text-blue-950 font-bold cursor-pointer text-[15px]'> Login Now </span>
              </p>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
