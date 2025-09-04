import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";

const SearchModal = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed inset-0 z-50 bg-white transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex items-center p-4 border-b border-gray-200">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
        </div>
        <button onClick={onClose} className="ml-4 text-gray-800">
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>
      <div className="p-4 text-center text-gray-500">
        <p>Type to search for products.</p>
      </div>
    </div>
  );
};

export default SearchModal;
