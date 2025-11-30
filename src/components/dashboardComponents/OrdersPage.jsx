import { useState, useEffect } from "react";
import OrderTable from "../dashboardComponents/OrderTable";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosPublic.get("/orders");
        setOrders(response.data);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [axiosPublic]);
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
        <OrderTable orders={orders} />
      </div>
    </div>
  );
};

export default OrdersPage;
