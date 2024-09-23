import React from "react";
import ProfileInfo from "../../components/Cards/ProfileInfo";
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const onLogout = () => {
    navigate('/login');
  };

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow-xl h-[80px]">
      
      {/* Left Section: Logo/Title */}
      <div className="flex-1">
        <h2 className="text-4xl font-medium text-black">EmoTrackAI</h2>
      </div>

      {/* Center Section: Navigation Links */}
      <div className="flex space-x-28 ">
        <Link to="/" className='font-bold text-2xl text-orange-500  hover:text-secondary transition'>
          Home
        </Link>
        <Link to="/aitrack" className='font-bold text-2xl text-orange-500  hover:text-secondary transition hover:underline'>
          Product
        </Link>
        <Link to="/dashboard" className='font-bold text-2xl text-orange-500  hover:text-secondary transition hover:underline'>
          Dashboard
        </Link>
        <Link to="/plans" className='font-bold text-2xl text-orange-500 hover:text-secondary transition hover:underline'>
          Plans
        </Link>
      </div>

      {/* Right Section: Profile Info */}
      <div className="flex-1 flex justify-end">
        <ProfileInfo onLogout={onLogout} />
      </div>

    </div>
  );
}

export default Navbar;
