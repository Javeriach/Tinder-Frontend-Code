import React from 'react';
import Diamond from '../../Images/Diamond.png';

const PremiumCard = ({ subscriptionHandler }) => {
  let premiumBenefits = [
    'BlueTick for Primium users.',
    'Chat Feature Access.',
    'Unlimited Connections Requests.',
  ];
  return (
    <div
      className="bg-gray-200 w-64  hover:border-2 hover:border-blue-50 rounded-lg shadow-lg h-[400px] overflow-hidden"
      data-aos="zoom-in"
    >
      <div className="bg-gradient-to-b from-gray-400 to-black h-[200px] p-6 text-center">
        <div className="flex justify-center mb-1">
          <img src={Diamond} alt="diamond-icon" className="w-24 h-24" />
        </div>
        <h2 className="text-white text-xl font-bold mb-0.5">Premium</h2>
        <p className="text-white text-2xl font-bold">
          Rs.700
          <span className="text-sm font-normal"> / PER MONTH</span>
        </p>
      </div>
      <div className="py-4  px-5 text-center flex flex-col justify-between items-center">
        <ul className=" text-black  font-semibold text-left">
          {premiumBenefits.map((benefit, index) => (
            <li>
              <span className='font-bold'>{index + 1}.</span>
              {benefit}
            </li>
          ))}
        </ul>

        <button className="bg-white text-black mt-2 w-fit font-bold py-2 px-6 rounded-lg shadow-md hover:bg-gray-300"
        onClick={()=>subscriptionHandler("premium",premiumBenefits)}>
          SUBSCRIBE
        </button>
      </div>
    </div>
  );
};

export default PremiumCard;
