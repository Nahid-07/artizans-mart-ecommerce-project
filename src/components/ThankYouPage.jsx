import { Link } from 'react-router';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

const ThankYouPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl text-center">
        <div>
          <CheckCircleIcon className="mx-auto h-24 w-24 text-green-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Thank You for Your Order!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Your order has been successfully placed. We've sent a confirmation email to your inbox.
          </p>
        </div>
        <div className="mt-8 space-y-4">
          <Link
            to="/"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;