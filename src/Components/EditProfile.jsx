import { useDispatch, useSelector } from 'react-redux';
import UserCard from './UserCard';
import { useState } from 'react';
import axios from 'axios';
import { BASE_USL } from '../utiles/constants/constant';
import toast from 'react-hot-toast';
import { addUser } from '../Redux/Slices/userSlice';
import PreviewUserCard from './PreviewUserCard';
import { useNavigate } from 'react-router-dom';

function EditProfile() {
  let user = useSelector((store) => store.user);
 
  let dispatch = useDispatch();
  let [firstName, setFirstName] = useState(user?.firstName ? user.firstName : "");
  let [lastName, setLastName] = useState(user?.lastName ? user.lastName : "");
  let [about, setAbout] = useState(user?.about);
  let [age, setAge] = useState(user?.age ? user.age : 0);
  let [gender, setGender] = useState(user?.gender ? user.gender : "male");
  let [photoUrl, setPhotoUrl] = useState(user?.photoUrl ? user?.photoUrl : "");
  let [error, setError] = useState("");
  
  let navigate = useNavigate();

  if (!user?.toString()) navigate("/login");
  
  let saveProfileHandler = async () => {
    setError("");
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

    if (!(age >= 18 && age <= 90))
    {
      setError("Age must be greater than 17 and less than 91!!");
      return;
    }

    try {
      const response = await axios.patch(BASE_USL+'/profile/edit',
        {
          firstName: firstName,
          lastName,
          age,
          gender,
          about,
          photoUrl,
        },
        { withCredentials: true }
      );
      dispatch(addUser(response.data.data));
      toast.success('Profile saves successfully!!');
    } catch (error) {
      toast.error('Saving Profile Failed');
      throw new Error('Something went wrong!');
    }
  };

  return (
    <div className="relative pt-[100px]  flex justify-center items-center py-6 max-[800px]:flex-col ">
      <div className="mx-4  card rounded-none  text-black   p-4 bg-black w-[350px]  max-w-96 shadow-xl">
        <h1 className="text-center font-bold text-white text-2xl">
          Edit Profile
        </h1>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">What is your name?</span>
          </div>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs text-white"
          />
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">What is your last name?</span>
          </div>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs text-white"
          />
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Your photoUrl?</span>
          </div>
          <input
            type="text"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs text-white"
          />
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">What is your about?</span>
          </div>
          <textarea
            maxLength={180}
            placeholder="About"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="textarea textarea-bordered textarea-sm w-full max-w-xs text-white"
          ></textarea>
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">What is your age?</span>
          </div>
          <input
            type="text"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs text-white"
          />
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">What is your gender?</span>
          </div>

          <select value={gender} className=" text-white dropdown menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow" onChange={e=>setGender(e.target.value)}>
            
           
              <option value={"male"}>
                Male
              </option>
              <option value={"female"}>
                Female
              </option>
              <option value={"other"}>
                Other
              </option>
           
          </select>


        </label>

        {error && <p className='text-red-700 font-semibold'>{error}</p>}

        <div className="card-actions justify-end ">
          <button
            className=" mt-2 bg-[#389923] rounded text-white btn-primary p-3 font-semibold text-[15px]"
            onClick={saveProfileHandler}
          >
            Save Profile
          </button>
        </div>
      </div>
      <PreviewUserCard user={{firstName,lastName,gender,photoUrl,age,about}} />
    </div>
  );
}

export default EditProfile;
