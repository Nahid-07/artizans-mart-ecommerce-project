import { useState, useEffect, useCallback } from "react"; // Import useCallback
import OrderTable from "../dashboardComponents/OrderTable";
import useAxiosSecure from "../../hooks/useAxiosSecure"; // Use Secure Hook
import TableSkeleton from "../loader/TableSkeleton";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  // Create a reusable fetch function
  const fetchOrders = useCallback(async () => {
    try {
      const response = await axiosSecure.get("/orders");
      // Sort orders by date (newest first) if your backend doesn't do it
      const sortedData = response.data.reverse();
      setOrders(sortedData);
    } catch (error) {
      console.error("Failed to fetch orders", error);
    } finally {
      setLoading(false);
    }
  }, [axiosSecure]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  if (loading) {
    return (
      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-3xl font-bold text-center mb-8">All Orders</h1>
          <TableSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-center mb-8">All Orders</h1>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center bg-white p-16 rounded-lg shadow-sm text-center">
            <div className="bg-gray-100 p-6 rounded-full mb-4">
              <ClipboardDocumentListIcon className="h-16 w-16 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Orders Yet
            </h3>
            <p className="text-gray-500">
              When customers place orders, they will appear here.
            </p>
          </div>
        ) : (
          // Pass the fetchOrders function as a prop named 'refetch'
          <OrderTable orders={orders} refetch={fetchOrders} />
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
