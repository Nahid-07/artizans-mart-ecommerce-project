import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router";
import useAxiosPublic from "../hooks/useAxiosPublic";

const SearchModal = ({ isOpen, onClose }) => {
  const axiosPublic = useAxiosPublic();
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const modalRef = useRef(null);
  const inputRef = useRef(null); // Ref for auto-focus

  // Auto-focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100); // Slight delay ensures render is complete
    }
  }, [isOpen]);

  // Handle Search with Debounce and Race Condition Protection
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery("");
      setResults([]);
      setLoading(false);
      return;
    }

    let isMounted = true; // Flag to prevent state updates if unmounted

    const debounceSearch = setTimeout(async () => {
      if (searchQuery.length > 2) {
        if (isMounted) setLoading(true);
        try {
          const response = await axiosPublic.get(`/search?q=${searchQuery}`);
          if (isMounted) setResults(response.data);
        } catch (error) {
          console.error("Error fetching search results:", error);
          if (isMounted) setResults([]);
        } finally {
          if (isMounted) setLoading(false);
        }
      } else {
        if (isMounted) setResults([]);
      }
    }, 500);

    return () => {
      isMounted = false;
      clearTimeout(debounceSearch);
    };
  }, [searchQuery, isOpen, axiosPublic]);

  // Handle outside clicks
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    // Handle Escape key
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-90 flex justify-center items-start pt-20 transition-opacity duration-300">
      <div
        ref={modalRef}
        className="w-11/12 md:w-3/4 lg:w-1/2 bg-white rounded-lg shadow-xl"
      >
        <div className="flex items-center p-4 border-b border-gray-200">
          <div className="relative flex-grow">
            <input
              ref={inputRef}
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
                    <div className="flex items-center space-x-3">
                      {/* Optional: Show small image if available */}
                      {item.images && item.images[0] && (
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-8 h-8 object-cover rounded"
                        />
                      )}
                      <span>{item.name}</span>
                    </div>
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
