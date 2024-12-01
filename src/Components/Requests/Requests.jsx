import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../../utiles/Slices/requests";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_USL } from "../../utiles/constants/constant";
import RequstedConnection from "./RequstedConnection";
import { RequestSkeleton } from "@/ReuseAble_Components/RequestSkeleton";

function Requests() {
  let dispatch = useDispatch();
  let requests = useSelector((store) => store.requests);
  let [loading, setLoading] = useState(false);

  let fetchRequests = async () => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);
    
  
  return (
    <div className="flex flex-col items-center min-h-screen pb-4 pt-[90px] ">
     {loading?<RequestSkeleton/>:requests.toString() === ""? <h1 className="text-2xl font-bold text-black mt-4">Connections Request</h1>:
      <div className='gap-3'>
        {requests?.map((req,index) => (
            <RequstedConnection key={index} fromUser={req?.fromUserId} requestId={req?._id} fetchRequests={fetchRequests} />
        ))}
      </div>}
    </div>
  );
}

export default Requests
