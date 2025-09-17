import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router";

export const SearchBarDesktop = () => {
  const id = useParams()
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false); // State for dropdown visibility
  const searchContainerRef = useRef(null); // Ref to detect clicks outside the container

  // Debouncing and API call logic
  useEffect(() => {
    const debounceSearch = setTimeout(async () => {
      if (searchQuery.length > 2) {
        setLoading(true);
        try {
          const response = await fetch(
            `https://artizans-mart-ecom-server.vercel.app/search?q=${searchQuery}`
          );
          const data = await response.json();
          setResults(data);
          setShowResults(true); // Show results after successful fetch
        } catch (error) {
          console.error("Error fetching search results:", error);
          setResults([]);
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
        setShowResults(false); // Hide results if query is too short or empty
      }
    }, 300);

    return () => clearTimeout(debounceSearch);
  }, [searchQuery,id]);

  // Click-away listener to hide results
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col w-full relative" ref={searchContainerRef}>
      <div className="hidden md:flex flex-grow items-center md:justify-center">
        <div className="relative w-full max-w-lg">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => {
              if (searchQuery.length > 2) {
                setShowResults(true);
              }
            }}
            value={searchQuery} // Controlled component
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Search Results Dropdown */}
      {showResults && (
        <div className="absolute top-full left-0 right-0 z-50 bg-white border border-gray-200 rounded-md shadow-lg mt-2 w-full">
          {loading ? (
            <p className="p-4 text-center text-gray-500">Searching...</p>
          ) : results.length > 0 ? (
            <ul className="max-h-60 overflow-y-auto">
              {results.map((item) => (
                <li
                  key={item._id}
                  className="p-4 hover:bg-gray-100 cursor-pointer border-b border-gray-200 last:border-b-0"
                >
                  <Link
                    to={`/productDetails/${item._id}`}
                    onClick={() => {
                      setShowResults(false);
                      setSearchQuery(""); // Clear search on click
                    }}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            searchQuery.length > 2 && (
              <p className="p-4 text-center text-gray-500">No results found.</p>
            )
          )}
        </div>
      )}
    </div>
  );
};
