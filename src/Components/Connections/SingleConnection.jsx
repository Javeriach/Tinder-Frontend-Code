function SingleConnection({ friend }) {
  if (friend.toString() === '') return;

  let { firstName, lastName, about, photoUrl,gender } = friend;

  if (about.length > 50) {
    about = about.substring(0, 50);
    about = about + '...';
  }

  return (
    <div>
      <div className="flex bg-white mt-3 w-[500px] max-[500px]:w-[320px]  px-3 py-2">
        <div className="avatar w-[100px] h-[80px]">
          <div className="  w-20 rounded-full  ring-2 ring-black ">
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
        <div className="w-[400px]   max-[500px]:ms-3   flex flex-col ">
          <h1 className="text-black font-bold text-[17px]">
            {firstName} {lastName}
          </h1>
          <p className="text-black text-[14px] font-semibold ">{about}</p>
        </div>
      </div>
    </div>
  );
}

export default SingleConnection;
