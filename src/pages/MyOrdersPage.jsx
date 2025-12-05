import { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../context_API/authContext";
import TableSkeleton from "../components/loader/TableSkeleton";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

const MyOrdersPage = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/my-orders/${user.email}`)
        .then((res) => {
          // Sort by newest first
          const sortedOrders = res.data.reverse();
          setOrders(sortedOrders);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch user orders", err);
          setLoading(false);
        });
    }
  }, [user?.email, axiosSecure]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-16 mt-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

        {loading ? (
          <TableSkeleton />
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center bg-white p-12 rounded-lg shadow-sm text-center">
            <div className="bg-blue-50 p-6 rounded-full mb-4">
              <ShoppingBagIcon className="h-16 w-16 text-blue-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No orders found
            </h2>
            <p className="text-gray-500">You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID / Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Items
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          #{order._id.slice(-6)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.date}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <ul className="text-sm text-gray-500">
                          {order.items.map((item, idx) => (
                            <li key={idx}>
                              {item.name} x {item.quantity}
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                        ৳{order.total}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "Shipped"
                              ? "bg-blue-100 text-blue-800"
                              : order.status === "Cancelled"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.status || "Pending"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyOrdersPage;
