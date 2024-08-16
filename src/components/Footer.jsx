import React from 'react';
import { FaGithub, FaFacebook, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Website Name */}
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h2 className="text-2xl font-bold">GadgetZone</h2>
          <p className="mt-2">Your one-stop shop for all your electronic needs.</p>
        </div>

        {/* Contact Info */}
        <div className="mb-4 md:mb-0  text-center md:text-left">
          <h3 className="text-lg font-semibold">Contact Us</h3>
          <p>Email: mahmudthedatahunter@gmail.com</p>
          <p>Phone: +8801798120845</p>
        </div>

        {/* Social Links */}
        <div className="flex space-x-4">
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-400"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://facebook.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-400"
          >
            <FaFacebook size={24} />
          </a>
          <a
            href="mailto:mahmudthedatahunter@gmail.com"
            className="text-white hover:text-gray-400"
          >
            <FaEnvelope size={24} />
          </a>
        </div>
      </div>

      <div className="text-center mt-4">
        <p>&copy; {new Date().getFullYear()} GadgetZone. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
