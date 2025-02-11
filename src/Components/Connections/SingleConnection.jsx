import { Link } from "react-router-dom";
function SingleConnection({ friend }) {
  if (friend.toString() === '') return;

  let { firstName, lastName, about, photoUrl,gender,_id} = friend;

  if (about.length > 50) {
    about = about.substring(0, 50);
    about = about + '...';
  }

  return (
    <div>
      <div className="flex bg-white mt-3 w-[500px] max-[500px]:w-[350px]  px-3 py-3 ">
        <div className="avatar w-[100px] h-full flex items-center">
          <div className=" w-20 h-20 max-[500px]:w-14  max-[500px]:h-14  rounded-full  ring-2 ring-black ">
            <img
              src={
                photoUrl
                  ? photoUrl
                  : gender === 'female'
                  ? 'https://static.vecteezy.com/system/resources/previews/042/332/098/non_2x/default-avatar-profile-icon-grey-photo-placeholder-female-no-photo-images-for-unfilled-user-profile-greyscale-illustration-for-socail-media-web-vector.jpg'
                  : 'https://st.depositphotos.com/1779253/5140/v/450/depositphotos_51405259-stock-illustration-male-avatar-profile-picture-use.jpg'
              }
            />
          </div>
        </div>

        <div className="w-[320px]   max-[500px]:ms-3   flex flex-col ">
          <h1 className="text-black font-[700] text-[17px]">
            {firstName} {lastName}
          </h1>
          <p className=" text-black text-[14px] max-[500px]:text-[12px]  font-semibold md:block">{about}</p>
        </div>
        <div className="flex items-center">
        <Link to={"/chat/"+_id}>
          <button className="bg-blue-700 w-[80px] h-[45px] text-white font-semibold text-[17px] rounded-xl">
          Chat</button></Link>
        </div>


    
      </div>
    </div>
  );
}

export default SingleConnection;
