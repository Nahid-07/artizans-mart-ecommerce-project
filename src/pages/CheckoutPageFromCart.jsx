import { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { useCart } from "../hooks/useCart";
import useAxiosSecure from "../hooks/useAxiosSecure"; // Use Secure Hook
import toast from "react-hot-toast";
import { AuthContext } from "../context_API/authContext"; // Import AuthContext

const CheckoutPageFromCart = () => {
  const { cartItems, handleRemoveCartItems } = useCart();
  const { user } = useContext(AuthContext); // Get logged-in user
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure(); // Use Secure Hook for orders

  const [shippingInfo, setShippingInfo] = useState({
    name: user?.displayName || "", // Auto-fill name
    email: user?.email || "", // Auto-fill email (CRITICAL FIX)
    phone: "",
    area: "",
    address: "",
    note: "",
  });

  const [shippingFee, setShippingFee] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  const shippingFees = {
    insideDhakaSouth: 70,
    insideDhakaNorth: 70,
    Gazipur: 100,
    OutSideDhaka: 120,
  };

  // Update state if user loads after component mount
  useEffect(() => {
    if (user) {
      setShippingInfo((prev) => ({
        ...prev,
        name: prev.name || user.displayName || "",
        email: prev.email || user.email || "",
      }));
    }
  }, [user]);

  useEffect(() => {
    const cartSubtotal = cartItems.reduce(
      (acc, item) => acc + item.offer_price * item.quantity,
      0
    );
    setSubtotal(cartSubtotal);

    const fee = shippingFees[shippingInfo.area] || 0;
    setShippingFee(fee);
  }, [cartItems, shippingInfo.area, shippingFees]);

  useEffect(() => {
    setTotal(subtotal + shippingFee);
  }, [subtotal, shippingFee]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };

  const handleConfirmOrder = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    if (!shippingInfo.area) {
      toast.error("Please select a delivery area.");
      return;
    }

    const orderDetails = {
      shippingInfo, // Now includes email!
      items: cartItems.map((item) => ({
        id: item._id,
        name: item.name,
        price: item.offer_price,
        quantity: item.quantity,
      })),
      subtotal,
      shippingFee,
      total,
      date: new Date().toISOString().split("T")[0],
      status: "Pending", // Default status
    };

    try {
      const res = await axiosSecure.post("/place-order", orderDetails);

      if (res.data.insertedId) {
        handleRemoveCartItems();
        toast.success("Order confirmed! Thank you for your purchase.");
        navigate("/thank-you");
      }
    } catch (error) {
      console.error("Order confirmation error:", error);
      toast.error("Order could not be placed. Please try again.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-16 mt-16">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-10">
          Checkout
        </h2>
        <div className="flex flex-col md:flex-row md:space-x-12">
          {/* Left Side: Customer Information Form */}
          <div className="w-full md:w-1/2 bg-white rounded-lg shadow-xl p-8">
            <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-6">
              Shipping Information
            </h3>
            <form onSubmit={handleConfirmOrder} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={shippingInfo.name}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              {/* Email Field (Read Only or Editable) */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={shippingInfo.email}
                  readOnly // Prevent changing email if logged in
                  className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={shippingInfo.phone}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Select area
                </label>
                <select
                  name="area"
                  value={shippingInfo.area}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="" disabled>
                    Select a delivery area
                  </option>
                  <option value="insideDhakaSouth">
                    Dhaka (South city corporation)
                  </option>
                  <option value="insideDhakaNorth">
                    Dhaka (North city corporation)
                  </option>
                  <option value="Gazipur">Gazipur</option>
                  <option value="OutSideDhaka">Outside Of Dhaka</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Shipping Address
                </label>
                <textarea
                  name="address"
                  value={shippingInfo.address}
                  onChange={handleInputChange}
                  rows="4"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Notes (optional)
                </label>
                <textarea
                  name="note"
                  value={shippingInfo.note}
                  onChange={handleInputChange}
                  rows="3"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                ></textarea>
              </div>
              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
                >
                  <ShoppingCartIcon className="h-5 w-5 mr-2" />
                  Confirm Order
                </button>
              </div>
            </form>
          </div>

          {/* Right Side: Order Summary */}
          <div className="w-full md:w-1/2 mt-8 md:mt-0 bg-white rounded-lg shadow-xl p-8 h-fit sticky top-24">
            <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-6">
              Order Summary
            </h3>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center"
                >
                  <p className="text-gray-700">
                    {item.name} (x{item.quantity})
                  </p>
                  <p className="font-semibold">
                    ৳{(item.offer_price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-5 pt-4 border-t border-gray-200">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-medium">৳{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-gray-600">Shipping:</span>
              <span className="font-medium">৳{shippingFee.toFixed(2)}</span>
            </div>

            <div className="flex justify-between font-extrabold text-2xl border-t border-gray-300 pt-4 mt-4 text-gray-900">
              <span>Total:</span>
              <span>৳{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPageFromCart;
