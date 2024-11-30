import axios from 'axios';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { BASE_USL } from '../../utiles/constants/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../../utiles/Slices/connections';
import SingleConnection from './SingleConnection';

function Connections() {
  let dispatch = useDispatch();
  let connections = useSelector((store) => store.connections);

  let fetchConnections = async () => {
    try {
      let connectionsResponse = await axios.get(
        BASE_USL + '/request/connections/Accepted',
        { withCredentials: true }
      );
      dispatch(addConnections(connectionsResponse.data.data));
      console.log(connectionsResponse.data.data);
    } catch (error) {
      console.log(error.message);
      toast.error('Something went wrong');
      throw new Error('Something went wrong');
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections.length > 0)
    return <div className='flex  justify-center items-center  h-screen  bg-custom-gradient ' >
      <h1 h1 className = "text-center text-black" > Currently!! You have not any friend!!😊</h1>
  </div>  
  return (
    <div className="flex flex-col items-center min-h-screen pb-4 pt-[100px] ">
      <h1 className="text-3xl font-bold text-black mt-7 ">Your Friends!!</h1>
      <div className='gap-3'>
        {connections?.map((connection) => (
            <SingleConnection friend={connection} />
        ))}
      </div>
    </div>
  );
}

export default Connections;
