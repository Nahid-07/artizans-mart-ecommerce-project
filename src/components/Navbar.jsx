import { useState } from "react";
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router";
import SearchModal from "./SearchModal";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false); // New state for search modal
  const [cartItemCount, setCartItemCount] = useState(0);

  const toggleMenu = () => setIsOpen(!isOpen);
  const openSearchModal = () => setSearchModalOpen(true);
  const closeSearchModal = () => setSearchModalOpen(false);

  return (
    <>
      <nav className="bg-white shadow-lg fixed w-full top-0 left-0 z-50">
        <div className="container mx-auto px-4 py-4 md:flex md:justify-between md:items-center">
          {/* Left Part: Logo */}
          <div className="flex justify-between items-center">
            <Link
              to="/"
              className="text-xl font-semibold text-gray-800 whitespace-nowrap"
            >
              Artizans' Mart
            </Link>
            {/* Mobile menu and search/cart buttons */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={openSearchModal}
                className="text-gray-800 hover:text-blue-500 transition-colors duration-300"
              >
                <MagnifyingGlassIcon className="h-6 w-6" />
              </button>
              <Link
                to="/cart"
                className="relative text-gray-800 hover:text-blue-500 transition-colors duration-300"
              >
                <ShoppingCartIcon className="h-6 w-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-2 inline-flex items-center justify-center h-4 w-4 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                    {cartItemCount}
                  </span>
                )}
              </Link>
              <button
                onClick={toggleMenu}
                className="text-gray-800 focus:outline-none"
              >
                {isOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Middle Part: Search Bar (Desktop Only) */}
          <div className="hidden md:flex flex-grow items-center md:justify-center">
            <div className="relative w-full max-w-lg">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Right Part: Menu Items & Icons */}
          <div
            className={`md:flex md:items-center md:space-x-6 ${
              isOpen ? "block" : "hidden"
            }`}
          >
            <ul className="flex flex-col md:flex-row md:space-x-8 px-4 py-8 md:py-0">
              <li>
                <Link
                  to="/"
                  className="block py-2 text-gray-800 hover:text-blue-500 transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="block py-2 text-gray-800 hover:text-blue-500 transition-colors duration-300"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  to="/aboutus"
                  className="block py-2 text-gray-800 hover:text-blue-500 transition-colors duration-300"
                >
                  About Us
                </Link>
              </li>
              <li className="md:hidden mt-4">
                <Link
                  to="/login"
                  className="bg-blue-500 text-white px-4 py-2 rounded-full w-full block text-center hover:bg-blue-600 transition-colors duration-300"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/add-to-cart"
              className="relative text-gray-800 hover:text-blue-500 transition-colors duration-300"
            >
              <ShoppingCartIcon className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-2 inline-flex items-center justify-center h-4 w-4 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <Link
              to="/login"
              className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors duration-300"
            >
              Login
            </Link>
          </div>
        </div>
      </nav>
      <SearchModal isOpen={searchModalOpen} onClose={closeSearchModal} />
    </>
  );
};

export default Navbar;
