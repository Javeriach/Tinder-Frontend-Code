import { BASE_USL } from '@/utiles/constants/constant';
import FreePlanCard from '../Components/Subscription/FreeCard';
import GoldSubscriptionCard from '../Components/Subscription/GoldenCard';
import PremiumCard from '../Components/Subscription/PremiumCard';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function BuySubscription() {

  const [isPremium, setIsPremium] = useState(false);
  // which plan's checkout is currently being created ("" | "gold" | "premium")
  const [loadingType, setLoadingType] = useState('');
  const user = useSelector(store => store.user);

  const verifyPrimiumUser = async () => {
    try {
      const userPrimiumData = await axios.get(BASE_USL + "/premium/verify", { withCredentials: true });
      if (userPrimiumData.data.isPremium) {
        setIsPremium(true);
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() =>
  {
    if (user!= null && !(user?.toString() === ""))
    {
      if (user.isPremium === true) {
        setIsPremium(true);
      }
    }

    // Coming back from Stripe Checkout: confirm the upgrade with the backend.
    const params = new URLSearchParams(window.location.search);
    if (params.get('payment') === 'success') {
      verifyPrimiumUser();
    }
  }, []);

  //FUNCTION TO HANDLE THE SUBSCRIPTION
  let subscriptionHandler = async (type, benefits) => {
    if (loadingType) return;
    try {
      setLoadingType(type);
      const { data } = await axios.post(BASE_USL + '/payment/create', {
        membershipType: type,
        benefits: benefits,
      }, { withCredentials: true });

      // Redirect the browser to Stripe's hosted checkout page.
      window.location.href = data.url;
    } catch (error) {
      console.log(error);
      setLoadingType('');
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
          <GoldSubscriptionCard subscriptionHandler={subscriptionHandler} loadingType={loadingType} />
        </div>
        <div className="divider lg:divider-horizontal text-black">OR</div>
        <div className="card  rounded-box grid  w-fit place-items-center">
          <PremiumCard subscriptionHandler={subscriptionHandler} loadingType={loadingType} />
        </div>
      </div>
    </div>
  );
}

export default BuySubscription;
