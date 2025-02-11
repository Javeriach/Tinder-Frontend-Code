import { useNavigate } from "react-router-dom";
import blueTick from "../Images/blueTick.png";
import { useSelector } from "react-redux";

function PreviewUserCard({ user }) {
  let navigate = useNavigate();
  let currentUser = useSelector((store) => store.user);

  if (!user.toString() || user==null) navigate("/login");
  let { firstName, lastName, about, age, gender, photoUrl, _id} = user;
  
  if (about?.length >= 160 ) {
    about = about.substring(0, 150);
    about = about + '...';
  }
  
    return (
        <div className="bg-black h-[640px] w-[350px] mt-2 md:mt-0">
        <figure >
          <img
            className="w-[350px] h-[440px]"
            src={photoUrl.length > 0? photoUrl:gender === 'female'? "https://static.vecteezy.com/system/resources/previews/042/332/098/non_2x/default-avatar-profile-icon-grey-photo-placeholder-female-no-photo-images-for-unfilled-user-profile-greyscale-illustration-for-socail-media-web-vector.jpg":"https://st.depositphotos.com/1779253/5140/v/450/depositphotos_51405259-stock-illustration-male-avatar-profile-picture-use.jpg"}
            alt={firstName} />
        </figure>
        <div className="card-body pt-0 mt-2">
          
          <h2 className="card-title fw-bold">{firstName + " " + lastName} {currentUser?.isPremium ? <img src={blueTick}  className="h-[25px] w-[25px]"/>:"" }</h2>
          <p className="text-[15px] font-semibold w-full   ">{about}</p> 
          { age && gender && <p>Gender {gender} , Age: {age}</p>}
        
        </div>
        </div>
    )
}

export default PreviewUserCard
