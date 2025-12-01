import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const OrderTable = ({ orders, refetch }) => {
  const axiosSecure = useAxiosSecure();

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await axiosSecure.patch(`/orders/${orderId}`, {
        status: newStatus,
      });
      if (res.data.modifiedCount > 0) {
        toast.success(`Order status updated to ${newStatus}`);
        if (refetch) refetch();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-xl">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Customer Info
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Delivery Details
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Items
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order) => (
            <tr key={order._id}>
              {/* Customer Info */}
              <td className="px-6 py-4 text-sm text-gray-900">
                <div className="font-bold">{order.shippingInfo.name}</div>
                <div className="text-gray-500">{order.shippingInfo.phone}</div>
                <div className="text-blue-600 text-xs mt-1 bg-blue-50 inline-block px-2 py-0.5 rounded">
                  {order.shippingInfo.email || "No Email"}
                </div>
              </td>

              {/* Delivery Details (Address & Note) */}
              <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
                <div>
                  <span className="font-semibold text-gray-800">Zone:</span>{" "}
                  {order.shippingInfo.area}
                </div>
                <div className="mt-1">
                  <span className="font-semibold text-gray-800">Addr:</span>{" "}
                  {order.shippingInfo.address}
                </div>
                {order.shippingInfo.note && (
                  <div className="mt-2 text-xs bg-yellow-50 p-2 rounded border border-yellow-100 text-yellow-800">
                    <span className="font-bold">Note:</span>{" "}
                    {order.shippingInfo.note}
                  </div>
                )}
              </td>

              {/* Items */}
              <td className="px-6 py-4 text-sm text-gray-500">
                <ul className="list-disc pl-4">
                  {order.items.map((item, index) => (
                    <li key={index}>
                      {item.name}{" "}
                      <span className="font-bold text-gray-900">
                        x{item.quantity}
                      </span>
                    </li>
                  ))}
                </ul>
              </td>

              {/* Total Price */}
              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">
                ৳{order.total}
              </td>

              {/* Date */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {order.date}
              </td>

              {/* Status Dropdown */}
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <select
                  defaultValue={order.status || "Pending"}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  className={`block w-full px-3 py-1 text-xs font-semibold rounded-full border-0 focus:ring-2 focus:ring-blue-500 cursor-pointer shadow-sm ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-800"
                      : order.status === "Shipped"
                      ? "bg-blue-100 text-blue-800"
                      : order.status === "Processing"
                      ? "bg-purple-100 text-purple-800"
                      : order.status === "Cancelled"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
