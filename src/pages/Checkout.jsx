import React, { useState, useEffect, useContext } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import Navbar from "../components/Navbar";
import { useLoaderData, useNavigate } from "react-router";
import { AuthContext } from "../context_API/authContext";

const Checkout = () => {
  const {user} = useContext(AuthContext)
  const [shippingInfo, setShippingInfo] = useState({
    name: user ? user?.displayName : "",
    phone: "",
    email: user ?  user.email : "",
    area: "",
    address: "",
    note: "",
  });
  const navigate = useNavigate();

  const [shippingFee, setShippingFee] = useState(0);

  const orderedProductData = useLoaderData();
  const productPrice = parseFloat(orderedProductData.data.offer_price);

  useEffect(() => {
    let newshippingFee = 0;
    if (
      shippingInfo.area === "insideDhakaSouth" ||
      shippingInfo.area === "insideDhakaNorth"
    ) {
      newshippingFee = 70;
    } else if (shippingInfo.area === "Gazipur") {
      newshippingFee = 100;
    } else if (shippingInfo.area === "OutSideDhaka") {
      newshippingFee = 120;
    }
    setShippingFee(newshippingFee);
  }, [shippingInfo.area]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({
      ...shippingInfo,
      [name]: value,
    });
  };

  const total = productPrice + shippingFee;

  const handleConfirmOrder = (e) => {
    e.preventDefault();
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    const orderDetails = {
      shippingInfo,
      items: [{
        id: orderedProductData.data._id,
        name: orderedProductData.data.name,
        price: orderedProductData.data.offer_price,
        quantity: 1,
      }],
      shippingFee,
      total: productPrice + shippingFee,
      date: formattedDate,
    };

    fetch("https://artizans-mart-ecommerce-server.onrender.com/place-order", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(orderDetails),
    })
      .then((res) => res.json())
      .then(() => {
        navigate('/thank-you');
      });
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-1"
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-1"
                />
              </div>
               <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  name="email"
                  value={shippingInfo.email}
                  onChange={handleInputChange}
                  placeholder="Optional"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Select area
                </label>
                <select
                  type="text"
                  name="area"
                  value={shippingInfo.area}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-1"
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-1"
                />
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-1"
                />
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
          <div className="w-full md:w-1/2 mt-8 md:mt-0 bg-white rounded-lg shadow-xl p-8">
            <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-6">
              Order Summary
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="font-semibold text-gray-900">
                  {orderedProductData.data.name}
                </p>
                <p className="text-gray-600">৳{productPrice}</p>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>৳{shippingFee}</span>
              </div>
            </div>

            <div className="flex justify-between font-extrabold text-2xl border-t pt-4 mt-4 text-gray-900">
              <span>Total:</span>
              <span>৳{total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
