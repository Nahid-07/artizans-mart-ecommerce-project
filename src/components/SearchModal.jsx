import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router"; // Use react-router-dom for navigation

const SearchModal = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const modalRef = useRef(null);
  useEffect(() => {
    if (!isOpen) {
      // Reset state when the modal is closed
      setSearchQuery("");
      setResults([]);
      setLoading(false);
      return;
    }
    const debounceSearch = setTimeout(async () => {
      if (searchQuery.length > 2) {
        setLoading(true);
        try {
          const response = await fetch(
            `https://artizans-mart-ecommerce-server.onrender.com/search?q=${searchQuery}`
          );
          const data = await response.json();
          setResults(data);
        } catch (error) {
          console.error("Error fetching search results:", error);
          setResults([]);
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(debounceSearch);
  }, [searchQuery, isOpen]);

  // Handle outside clicks to close the modal
  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  // Attach event listener only when the modal is open
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  if (!isOpen) {
    return null; // Don't render anything when the modal is closed
  }

  return (
    <div className="fixed inset-0 z-50 bg-gray-900 opacity-90 flex justify-center items-start pt-20 transition-opacity duration-300">
      <div
        ref={modalRef}
        className="w-11/12 md:w-3/4 lg:w-1/2 bg-white rounded-lg shadow-xl"
      >
        <div className="flex items-center p-4 border-b border-gray-200">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          <button
            onClick={onClose}
            className="ml-4 text-gray-800 hover:text-red-500 transition-colors"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Search Results Area */}
        <div className="p-4 max-h-80 overflow-y-auto">
          {loading ? (
            <p className="text-center text-gray-500">Searching...</p>
          ) : results.length > 0 ? (
            <ul className="space-y-2">
              {results.map((item) => (
                <li
                  key={item._id}
                  className="py-2 px-4 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={onClose}
                >
                  <Link to={`/productDetails/${item._id}`} className="block">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          ) : searchQuery.length > 2 ? (
            <p className="text-center text-gray-500">No results found.</p>
          ) : (
            <p className="text-center text-gray-500">
              Start typing to search for products.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
