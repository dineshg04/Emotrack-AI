import React from "react";

const Plans = () => {
  return (
    <>
    <div className="flex justify-center items-center space-x-8 p-44 w-screen h-screen drop-shadow-lg">
      {/* Freemium Card */}
      <div className= "flex flex-col bg-white shadow-lg rounded-lg p-6 w-1/2 h-[400px] ">
        <h3 className="text-xl font-semibold text-gray-800">Freemium</h3>
        <p className="mt-4 text-gray-600">Enjoy basic features with limited access for free.</p>
        <ul className=" mt-4 space-y-2 text-gray-600 mb-32">
          <li>✔ Text-Analysis 20 word</li>
          <li>✔ Chat bot access for only 5 mins</li>
          <li>✖ No history is record</li>
        </ul>
        <button className="mt-6 w-full bg-gray-300 text-gray-800 font-bold py-2 rounded-md drop-shadow-md">
          Get Started
        </button>
      </div>

      {/* Premium Card */}
      <div className=" flex flex-col bg-white text-gray-800 shadow-lg rounded-lg p-6 w-1/2 h-[400px] ">
        <h3 className="text-xl font-semibold">Premium</h3>
        <p className="mt-4">Unlock all features with priority support and exclusive tools.</p>
        <ul className=" flex flex-col mt-4 space-y-2">
          <li>✔ Text-Analysis unlimted words</li>
          <li>✔ Indepth Analysis increased Accuracy</li>
          <li>✔ Auido Analysis</li>
          <li>✔ Chat Bot Timeless</li>
          <li>✔ Mental Health Meter</li>
          <li>✔ Customized Emoji</li>
          <li>✔ Export Data in Pdf</li>
        </ul>
        <button className="mt-6 w-full bg-gray-300 text-gray-800  font-bold py-2 rounded-md drop-shadow-md">
          Upgrade Now
        </button>
      </div>
    </div>
    </>
    
  );
};

export default Plans;
