import axios from "axios";
import toast from "react-hot-toast";
import { BASE_USL } from "../utiles/constants/constant";
import { useDispatch } from "react-redux";
import { removeSelectedUserFromFeed } from "../utiles/Slices/feedSlice";

function UserCard({ user, feed }) {
  let dispatch = useDispatch();

  if (!user) return;
  let { firstName, lastName, about, age, gender, photoUrl, _id } = user;
  
  if (about.length > 100) {
    about = about.substring(0, 50);
    about = about + '...';
  }

  let handleInterest = async (status) =>
  {
    if (!feed) return;

    try {
      let response = await axios.post(BASE_USL + "/request/send/" + status + "/" + _id,{},{withCredentials:true});
      dispatch(removeSelectedUserFromFeed(_id));  
       
    } catch (error)
    {
      toast.error("Something went wrong");
      throw new Error(error.message);
    }
  }

    return (
      <div className="card max-[800px]:mt-3 rounded-lg shadow-2xl  bg-gray-950  h-[640px] w-[350px]">
        <figure className="bg-base-300">
          <img
            className="w-[350px] h-[440px]"
            src={photoUrl? photoUrl:gender === 'female'? "https://static.vecteezy.com/system/resources/previews/042/332/098/non_2x/default-avatar-profile-icon-grey-photo-placeholder-female-no-photo-images-for-unfilled-user-profile-greyscale-illustration-for-socail-media-web-vector.jpg":"https://st.depositphotos.com/1779253/5140/v/450/depositphotos_51405259-stock-illustration-male-avatar-profile-picture-use.jpg"}
            alt={firstName} />
        </figure>
        <div className="card-body pt-0 mt-2">
                <h2 className="card-title fw-bold">{firstName + " " + lastName} </h2>
          <p className="text-[15px] font-semibold">{about}</p> 
          { age && gender && <p>Gender {gender} , Age: {age}</p>}
        
          <div className="card-actions justify-between">
                    <button className="btn bg-[#ed0c0c] hover:bg-[#f84343] hover:text-black" onClick={()=>handleInterest("ignored")}>Ignore</button>
            <button className="btn bg-[#389923] text-white hover:bg-[#5aca41] hover:text-black"  onClick={() => handleInterest("interested")}>Interested</button>
          </div>
          
        </div>
      </div>
    )
}

export default UserCard
