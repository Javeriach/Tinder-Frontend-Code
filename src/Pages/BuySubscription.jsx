import { BASE_USL } from '@/utiles/constants/constant';
import FreePlanCard from '../Components/Subscription/FreeCard';
import GoldSubscriptionCard from '../Components/Subscription/GoldenCard';
import PremiumCard from '../Components/Subscription/PremiumCard';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function BuySubscription() {

  const [isPremium, setIsPremium] = useState(false);
  const user = useSelector(store => store.user);

  useEffect(() =>
  {
    if (user!= null && !(user?.toString() === ""))
    {
      if (user.isPremium === true) {
        setIsPremium(true);
      }
    }
  }, []);

  const verifyPrimiumUser = async (req, res)=>
{
    try { 
      const userPrimiumData = await axios.get("/premium/verify", { withCredentials: true });
      if (userPrimiumData.data.isPremium)
      {
        setIsPremium(true);
      }
    }
    catch (error)
    {
      throw new Error("Something went wrong!");
    }
  }

  //FUNCTION TO HANDLE THE SUBSCRIPTION
  let subscriptionHandler = async (type, benefits) => { 
    try {
      const order = await axios.post('/payment/create', {
        membershipType: type,
        benefits: benefits,
      },{withCredentials:true});

      //DESTRUCTURE ORDER DETAILS FOR CONVIENCE
      const { orderId, notes, keyId, amount, currency } = order.data;
    
      //OPTIONS-DATA THAT WILL DISPLAY ON RAZORPAY DIALOGUE BOX
       // Open Razorpay Checkout
       const options = {
        key: keyId, // Replace with your Razorpay key_id
        amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency,
        name: 'Tinder',// WEBSITE NAME
        description: 'Connect to your friends and have a chat.',
        order_id: orderId, // This is the order_id created in the backend
        // callback_url: 'http://localhost:3000/payment-success', // Your success URL
        prefill: {
          name: notes.firstName + " " + notes.lastName,
          email: notes.email,
          contact: '+923449329032'
        },
        theme: {
          color: '#0000FF'
        },
        handler:verifyPrimiumUser
      };
      //NOW RAZORPAY DIALOGUE BOX WILL OPEN NOW
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(error);
    }
  };
  return (
     isPremium? <div className='flex w-screen flex-col items-center pt-[100px] lg:flex-row  h-screen lg:justify-center text-black'>You are a Premium User</div>: <div className="pt-[100px] h-full lg:h-screen w-full flex justify-center pb-6 ">
      <div className="flex w-screen flex-col items-center lg:flex-row  h-auto lg:justify-center">
        <div className="card rounded-box grid  w-fit place-items-center">
          <FreePlanCard subscriptionHandler={subscriptionHandler} />
        </div>
        <div className="divider lg:divider-horizontal text-black">OR</div>

        <div className="card rounded-box grid  w-fit place-items-center">
          <GoldSubscriptionCard subscriptionHandler={subscriptionHandler} />
        </div>
        <div className="divider lg:divider-horizontal text-black">OR</div>
        <div className="card  rounded-box grid  w-fit place-items-center">
          <PremiumCard subscriptionHandler={subscriptionHandler} />
        </div>
      </div>
    </div>
  );
}

export default BuySubscription;
