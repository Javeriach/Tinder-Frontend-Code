import { useDispatch, useSelector } from 'react-redux';
import UserCard from './UserCard';
import { useRef, useState } from 'react';
import axios from 'axios';
import { BASE_USL } from '../utiles/constants/constant';
import { DEFAULT_AVATAR } from '../utiles/placeholderAvatar';
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
  let [photoUrl, setPhotoUrl] = useState(user?.photoUrl?.length > 0 ? user.photoUrl : "");
  let [uploadingPhoto, setUploadingPhoto] = useState(false);
  let [error, setError] = useState("");
  let [saving, setSaving] = useState(false);
  const fileInputRef = useRef(null);

  let navigate = useNavigate();

  if (!user?.toString()) navigate("/login");

  //FUNCTION TO HANDLE PICKING A PHOTO FROM THE PC AND UPLOADING IT
  let handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be smaller than 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        setUploadingPhoto(true);
        const { data } = await axios.post(
          BASE_USL + '/profile/uploadPhoto',
          { image: reader.result },
          { withCredentials: true }
        );
        setPhotoUrl(data.url);
        toast.success('Photo uploaded!');
      } catch (error) {
        toast.error(error.response?.data?.message || 'Photo upload failed.');
      } finally {
        setUploadingPhoto(false);
      }
    };
    reader.readAsDataURL(file);
  };

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
      setSaving(true);
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
    } finally {
      setSaving(false);
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
            <span className="label-text">Profile photo</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-700 flex-shrink-0">
              <img
                src={photoUrl?.length > 0 ? photoUrl : DEFAULT_AVATAR}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handlePhotoChange}
            />
            <button
              type="button"
              disabled={uploadingPhoto}
              onClick={() => fileInputRef.current?.click()}
              className="btn btn-sm bg-white text-black hover:bg-gray-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {uploadingPhoto && (
                <span className="loading loading-spinner loading-xs"></span>
              )}
              {uploadingPhoto ? 'Uploading...' : 'Choose Photo'}
            </button>
          </div>
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
            disabled={saving}
            className=" mt-2 bg-[#389923] rounded text-white btn-primary p-3 font-semibold text-[15px] flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            onClick={saveProfileHandler}
          >
            {saving && <span className="loading loading-spinner loading-sm"></span>}
            {saving ? 'Saving...' : 'Save Profile'}
          </button>
        </div>
      </div>
      <PreviewUserCard user={{firstName,lastName,gender,photoUrl,age,about}} />
    </div>
  );
}

export default EditProfile;
