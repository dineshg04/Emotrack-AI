import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-200 text-black py-8  ">
      <div className="container mx-auto px-4 ">
        <div className="flex justify-between items-center flex-wrap">
          {/* Logo/Brand Section */}
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold">EmoTrack AI</h2>
            <p className="mt-2 text-black-400">Track your Emotions</p>
          </div>

          {/* Navigation Links */}
          <div className="mb-4 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-2 text-black-400">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/about" className="hover:text-white">About Us</a></li>
              <li><a href="/services" className="hover:text-white">Product</a></li>
              <li><a href="/contact" className="hover:text-white">plans</a></li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="mb-4 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-400"> 
                <i className="fab fa-facebook-f"></i> Facebook
              </a>
              <a href="#" className="hover:text-gray-400"> 
                <i className="fab fa-twitter"></i> Twitter
              </a>
              <a href="#" className="hover:text-gray-400">
                <i className="fab fa-instagram"></i> Instagram
              </a>
              <a href="#" className="hover:text-gray-400">
                <i className="fab fa-linkedin-in"></i> LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-500">
          <p>&copy; 2024 EmoTrack AI. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
