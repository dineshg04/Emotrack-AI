import React from "react";
import ProfileInfo from "../../components/Cards/ProfileInfo";
import { Link, useNavigate } from "react-router-dom"; // Combined imports

function Navbar() {
  const navigate = useNavigate();

  const onLogout = () => {
    navigate('/login');
  };

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <h2 className="text-xl font-medium text-black py-2">EmoTrackAI</h2>
      <div>
      <Link to="/" className='font-medium text-primary underline'>Home</Link>
      <Link to="/aitrack" className='font-medium text-orange underline'>Product</Link>
      </div>
      
      <ProfileInfo onLogout={onLogout} />
      {/* Updated the 'to' prop to match the route path */}
      
    </div>
  );
}

export default Navbar;
