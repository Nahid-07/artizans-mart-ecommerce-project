import React, { useState, useEffect } from 'react';
import OrderTable from '../dashboardComponents/OrderTable';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch data from your API
    const fetchOrders = async () => {
      const response = await fetch('http://localhost:5000/orders');
      const data = await response.json();
      setOrders(data);
      setLoading(false);
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-20">
        <p className="text-xl text-gray-600">Loading orders...</p>
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