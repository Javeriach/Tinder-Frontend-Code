import React from 'react';
import Goldbricks from '../../Images/Goldbricks.png';

const GoldSubscriptionCard = ({ subscriptionHandler }) => {
  const goldenPlanBenefits = [
    'Chat Feature access.',
    '200 Connections Requests per day.',
  ];
  return (
    <div
      className="bg-white w-64 rounded-lg shadow-lg overflow-hidden h-[400px] hover:border-2 hover:border-blue-50"
      data-aos="zoom-out"
    >
      <div className="bg-gradient-to-b from-yellow-400 h-[200px] to-gray-300 p-6 text-center relative">
        <div className="flex justify-center mb-3">
          <img
            src={Goldbricks}
            alt="gold-icon"
            className="w-28 h-21"
            data-aos="zoom-in"
          />
        </div>
        <h2 className="text-black text-xl font-bold mb-1">Gold</h2>
        <div className="mt-2">
          <span className="text-black text-3xl font-bold">Rs.400</span>
          <span className="text-black text-sm font-normal"> /PER MONTH</span>
        </div>
      </div>
      <div>
        <div className="py-4  px-5 text-center flex flex-col justify-between items-center">
          <ul className=" text-black font-semibold text-left">
            {goldenPlanBenefits?.map((benefit, index) => (
              <li>
                <span className='font-bold'>{index + 1}.</span>
                {benefit}
              </li>
            ))}
          </ul>

          <button className="bg-white text-black mt-7 w-fit font-bold py-2 px-6 rounded-lg shadow-sm shadow-black hover:bg-gray-300" onClick={()=>subscriptionHandler('gold',goldenPlanBenefits)}>
            SUBSCRIBE
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoldSubscriptionCard;
