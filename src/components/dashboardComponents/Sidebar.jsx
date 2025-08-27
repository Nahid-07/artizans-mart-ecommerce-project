import { useState } from "react";
import { Link } from "react-router"; // use react-router-dom
import { FaBars, FaTimes } from "react-icons/fa";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      {/* Hamburger Button (Mobile Only) */}
      <button
        className="md:hidden p-4 text-2xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 min-h-screen w-64 bg-gray-50 shadow-lg transform 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        transition-transform duration-300 ease-in-out 
        md:translate-x-0 md:static md:w-64`}
      >
        <h1 className="text-2xl font-bold text-center py-6 border-b border-gray-300">
          Artizans' Mart
        </h1>

        <ul className="mt-6 space-y-2 px-4">
          <li>
            <Link
              to="/dashboard/add-product"
              className="block w-full py-3 px-4 rounded-md text-center hover:bg-gray-300 transition"
            >
              Add Products
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/update-product"
              className="block w-full py-3 px-4 rounded-md text-center hover:bg-gray-300 transition"
            >
              Update Product
            </Link>
          </li>
        </ul>
      </div>

      {/* Overlay (when sidebar is open on mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-opacity-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};
