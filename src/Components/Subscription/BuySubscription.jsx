import { BASE_USL } from '@/utiles/constants/constant';
import FreePlanCard from './FreeCard';
import GoldSubscriptionCard from './GoldenCard';
import PremiumCard from './PremiumCard';
import axios from 'axios';
function BuySubscription() {
  let subscriptionHandler = async (type, benefits) => {
    try {
      const order = await axios.post(BASE_USL + '/payment/create', {
        membershipType: type,
        benefits: benefits,
      },{withCredentials:true});
      console.log(order);

      //DESTRUCTURE ORDER DETAILS FOR CONVIENCE
      const { orderId, notes, keyId, amount, currency } = order.data;
      console.log(orderId);
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
      };
      //NOW RAZORPAY DIALOGUE BOX WILL OPEN NOW
      const rzp = new window.Razorpay(options);
      rzp.open();
      console.log("Hello jea");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="pt-[100px] h-full lg:h-screen w-full flex justify-center pb-6 ">
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
