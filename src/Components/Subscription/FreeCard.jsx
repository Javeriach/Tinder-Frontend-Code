import React from "react";
import FreePlan from "../../Images/FreePlan.png";


const FreePlanCard = () => {
  return (
      <div className="w-64 bg-white shadow-md  h-[400px]  hover:border-2 hover:border-blue-50  rounded-lg  overflow-hidden" data-aos="zoom-out">
        <div className="bg-gradient-to-b from-blue-500 h-[200px] to-gray-700 p-6">
          <div className="flex  justify-center items-center">
           <div className="flex justify-center mb-1">
                       <img
                         src={FreePlan}
                         alt="diamond-icon"
                          className="w-24 h-24"
                          data-aos="zoom-in"
                       />
                     </div>
          </div>
          <h2 className=" text-xl font-bold mb-1 text-center text-white">Basic</h2>
          <div className="mt-2 flex justify-center items-center">
            <span className=" text-3xl font-bold text-white">Rs.0</span>
            <span className="text-white text-sm font-normal mt-2"> / PER MONTH</span>
          </div>
        </div>
        <div className="p-6 text-center">
          <p className="text-2xl font-bold text-gray-800">Free</p>
          <div className="flex justify-center items-center mt-2">
            <span className="border-r pr-2 text-lg font-semibold text-black">Free</span>
            <span className="pl-2 text-sm text-gray-500">Limited Access</span>
          </div>
        </div>
        <div className="px-6 pb-6 flex justify-center">
        <button className="bg-black mt-1 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-gray-800">
            SUBSCRIBE
          </button>
        </div>
      </div>
  );
};

export default FreePlanCard;
