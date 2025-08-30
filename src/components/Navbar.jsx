import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 left-0 z-50">
      <div className="container mx-auto px-4 py-4 md:flex md:justify-between md:items-center">
        {/* Left Part: Logo */}
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-semibold text-gray-800 whitespace-nowrap">
            Artizans' Mart
          </Link>
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-800 focus:outline-none">
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Middle Part: Menu Items */}
        <div
          className={`absolute md:static top-16 left-0 w-full h-screen md:h-auto bg-white transition-transform duration-300 transform ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 md:flex md:items-center md:justify-center`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-8 px-4 py-8 md:py-0">
            <li>
              <Link to="/" className="block py-2 text-gray-800 hover:text-blue-500 transition-colors duration-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="shop" className="block py-2 text-gray-800 hover:text-blue-500 transition-colors duration-300">
                Shop
              </Link>
            </li>
            <li>
              <Link to="aboutus" className="block py-2 text-gray-800 hover:text-blue-500 transition-colors duration-300">
                About Us
              </Link>
            </li>
            <li className="md:hidden mt-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-full w-full hover:bg-blue-600 transition-colors duration-300">
                Login
              </button>
            </li>
          </ul>
        </div>

        {/* Right Part: Login Button */}
        <div className="hidden md:flex md:items-center">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors duration-300">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
