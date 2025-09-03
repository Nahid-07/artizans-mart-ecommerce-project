import { Link } from "react-router";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const NotFoundPage = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <h1 className="text-6xl font-extrabold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-600 max-w-sm mx-auto mb-6">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>

        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
        >
          <ArrowLeftIcon className="-ml-1 mr-2 h-5 w-5" />
          Go back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
