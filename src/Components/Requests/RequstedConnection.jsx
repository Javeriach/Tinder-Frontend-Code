import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';
import { useState } from 'react';
import { BASE_USL } from '../../utiles/constants/constant';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { addRequests } from '../../Redux/Slices/requests';
import { addConnections } from '../../Redux/Slices/connections';

function RequstedConnection({ fromUser, requestId,fetchRequests }) {
    let dispatch = useDispatch();
    // null | "accepted" | "rejected" -> which action is currently in flight
    let [busy, setBusy] = useState(null);
    if (!fromUser) return;
  let { firstName, lastName, photoUrl, about, _id } = fromUser;

    //HANDLE THE STATUS OF THE REQUEST
    let reviewRequest = async (status) =>
    {
        if (busy) return;
        try {
            setBusy(status);
            let response = await axios.post(BASE_USL+ "/request/review/" + status + "/" + requestId, {}, { withCredentials: true });

            fetchRequests();
            if(status ==="accepted")
           { let connectionsResponse = await axios.get(BASE_USL+
                '/request/connections/Accepted',
                { withCredentials: true }
              );
            dispatch(addConnections(connectionsResponse.data.data));
            }
            toast.success("Request " + status + "!!");
        } catch (error)
        {
            toast.error("Something went wrong");
        } finally {
            setBusy(null);
        }
    }


    if (about.length > 100)
    {
        about = about.substring(0,50);
        about = about + "...";
    }
    return (
        <div className="flex bg-white mt-3 w-[500px] max-[500px]:w-[350px] px-3 py-2">
            <div className="avatar w-[100px] h-[80px] max-[500px]:w-[70px] max-[500px]:h-[70px]">
              <div className="ring-primary ring-offset-base-100 w-20 rounded-full ring">
                <img src={photoUrl} />
              </div>
            </div>
            <div className='w-[200px] flex flex-col  max-[500px]:ms-2'>
              <h1 className='text-black font-bold'>
                {firstName} {lastName}
              </h1>
              <p className='text-black text-[12px] font-semibold'>{about}</p>
            </div>
            <div className="flex items-center max-[500px]:hidden gap-2">
            <button className="btn btn-active btn-secondary rounded-full min-w-[90px]" disabled={!!busy} onClick={()=>reviewRequest("rejected")}>
              {busy === "rejected" ? <span className="loading loading-spinner loading-sm"></span> : "Reject"}
            </button>
            <button className="btn btn-active btn-accent rounded-full min-w-[90px]" disabled={!!busy} onClick={()=>reviewRequest("accepted")}>
              {busy === "accepted" ? <span className="loading loading-spinner loading-sm"></span> : "Accept"}
            </button>
            </div>

            <div className="hidden items-center max-[500px]:flex">
            {busy === "rejected"
              ? <span className="loading loading-spinner loading-md text-black mx-1"></span>
              : <CancelIcon sx={{ fontSize: 40 }} className={`text-black ${busy ? "opacity-40 pointer-events-none" : ""}`} onClick={()=>reviewRequest("rejected")} />}
            {busy === "accepted"
              ? <span className="loading loading-spinner loading-md text-green-600 mx-1"></span>
              : <CheckCircleOutlineIcon sx={{ fontSize: 40 }} onClick={() => reviewRequest("accepted")} className={`text-green-600 ${busy ? "opacity-40 pointer-events-none" : ""}`} />}
            </div>

          </div>
    )
}

export default RequstedConnection
