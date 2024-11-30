import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../../utiles/Slices/requests";
import toast from "react-hot-toast";
import { useEffect } from "react";
import axios from "axios";
import { BASE_USL } from "../../utiles/constants/constant";
import RequstedConnection from "./RequstedConnection";

function Requests() {
  let dispatch = useDispatch();
  let requests = useSelector((store) => store.requests);

  let fetchRequests = async () => {
    try {
        let requestResponse = await axios.get(
            BASE_USL + '/request/connections/received',
            { withCredentials: true }
        );
      dispatch(addRequests(requestResponse.data.data));
      console.log(requestResponse.data.data);
    } catch (error) {
      console.log(error.message);
      toast.error('Something went wrong');
      throw new Error('Something went wrong');
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);
    
  if (requests.toString() === "")
      return <div className="flex items-center justify-center h-screen">
        <h1 className="text-center text-[30px] text-black font-bold">No connections Requests!!😊</h1>;
    </div>
  return (
    <div className="flex flex-col items-center min-h-[470px]">
      <h1 className="text-2xl font-bold text-black mt-4">Connections Request</h1>
      <div className='gap-3'>
        {requests?.map((req,index) => (
            <RequstedConnection key={index} fromUser={req?.fromUserId} requestId={req?._id} fetchRequests={fetchRequests} />
        ))}
      </div>
    </div>
  );
}

export default Requests
