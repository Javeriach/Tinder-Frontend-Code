import { BASE_USL } from '@/utiles/constants/constant';
import FreePlanCard from '../Components/Subscription/FreeCard';
import GoldSubscriptionCard from '../Components/Subscription/GoldenCard';
import PremiumCard from '../Components/Subscription/PremiumCard';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function BuySubscription() {

  const [isPremium, setIsPremium] = useState(false);
  const [membershipType, setMembershipType] = useState('');
  const [premiumExpiresAt, setPremiumExpiresAt] = useState(null);
  // which plan's checkout is currently being created ("" | "gold" | "premium")
  const [loadingType, setLoadingType] = useState('');
  const [cancelling, setCancelling] = useState(false);
  const [cancelMessage, setCancelMessage] = useState('');
  const user = useSelector(store => store.user);

  const verifyPrimiumUser = async () => {
    try {
      const userPrimiumData = await axios.get(BASE_USL + "/premium/verify", { withCredentials: true });
      if (userPrimiumData.data.isPremium) {
        setIsPremium(true);
        setMembershipType(userPrimiumData.data.membershipType || '');
        setPremiumExpiresAt(userPrimiumData.data.premiumExpiresAt || null);
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
        setMembershipType(user.membershipType || '');
        setPremiumExpiresAt(user.premiumExpiresAt || null);
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
  //FUNCTION TO HANDLE SUBSCRIPTION CANCELLATION
  const cancelSubscriptionHandler = async () => {
    if (cancelling) return;
    try {
      setCancelling(true);
      const { data } = await axios.post(
        BASE_USL + '/payment/cancel',
        {},
        { withCredentials: true }
      );
      setCancelMessage(data.message);
      if (data.premiumExpiresAt) {
        setPremiumExpiresAt(data.premiumExpiresAt);
      }
    } catch (error) {
      console.log(error);
      setCancelMessage(
        error.response?.data?.message || 'Something went wrong. Please try again.'
      );
    } finally {
      setCancelling(false);
    }
  };

  const planLabel = membershipType
    ? membershipType.charAt(0).toUpperCase() + membershipType.slice(1)
    : 'Premium';
  const renewalDate = premiumExpiresAt
    ? new Date(premiumExpiresAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;
  const isCancelled = /end/i.test(cancelMessage || '');

  return (
     isPremium? (
      <div className="flex w-screen flex-col items-center justify-center pt-[100px] min-h-screen text-black px-4">
        <div className="bg-white w-full max-w-sm rounded-xl border border-gray-200 shadow-sm p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-xs font-semibold tracking-wide text-gray-400 uppercase">
                Subscription
              </p>
              <h2 className="text-lg font-semibold text-gray-900">{planLabel} Plan</h2>
            </div>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                isCancelled ? 'bg-amber-50 text-amber-700' : 'bg-green-50 text-green-700'
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  isCancelled ? 'bg-amber-500' : 'bg-green-500'
                }`}
              ></span>
              {isCancelled ? 'Ending' : 'Active'}
            </span>
          </div>

          <p className="text-sm text-gray-500 mb-6">
            You have full access to chat, unlimited connection requests, and priority visibility.
          </p>

          {renewalDate && (
            <p className="text-sm text-gray-700 mb-6">
              {isCancelled ? 'Access until' : 'Renews on'}{' '}
              <span className="font-medium">{renewalDate}</span>
            </p>
          )}

          {!isCancelled && (
            <button
              disabled={cancelling}
              onClick={cancelSubscriptionHandler}
              className="w-full border border-gray-300 text-gray-700 font-medium text-sm py-2.5 rounded-lg hover:bg-gray-50 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {cancelling ? 'Cancelling…' : 'Cancel Subscription'}
            </button>
          )}

          {cancelMessage && (
            <p className="mt-4 text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-md px-3 py-2">
              {cancelMessage}
            </p>
          )}
        </div>
      </div>
     ): <div className="pt-[100px] h-full lg:h-screen w-full flex justify-center pb-6 ">
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
