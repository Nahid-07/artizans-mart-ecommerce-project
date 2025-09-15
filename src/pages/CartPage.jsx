import { ShoppingCartIcon, TrashIcon } from "@heroicons/react/24/solid";

import { Link } from "react-router";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context_API/CartProvider";

// This component receives cartItems and functions to manage them as props
const CartPage = () => {
  const [cartTotal, setCartTotal] = useState(0);
  const { cartItems, handleRemoveItem, handleUpdateQuantity } = useCart();

  // Calculate the total whenever cartItems change
  useEffect(() => {
    const total = cartItems.reduce((acc, item) => {
      return acc + item.offer_price * item.quantity;
    }, 0);
    setCartTotal(total);
  }, [cartItems]);

  return (
    <div>
      <Navbar />
      <div className="bg-gray-100 py-16 min-h-screen">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
            Your Cart
          </h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-10">
              <ShoppingCartIcon className="h-24 w-24 text-gray-400 mx-auto" />
              <p className="mt-4 text-xl text-gray-600">Your cart is empty.</p>
              <Link
                to="/shop"
                className="mt-4 inline-block text-blue-600 hover:underline"
              >
                Start shopping
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Cart Items List */}
              <div className="lg:w-3/4 bg-white p-6 rounded-lg shadow-md">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex-col md:flex items-center justify-between border-b py-4"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div>
                        <Link
                          to={`/productDetails/${item._id}`}
                          className="text-lg font-semibold text-gray-900 hover:text-blue-600"
                        >
                          {item.name}
                        </Link>
                        <p className="text-sm text-gray-500">{item.brand}</p>
                        <p className="text-lg font-bold text-gray-800">
                          ৳{item.offer_price}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item._id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
                        >
                          -
                        </button>
                        <span className="px-4 py-1">{item.quantity}</span>
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item._id, item.quantity + 1)
                          }
                          className="px-3 py-1 text-gray-600 hover:bg-gray-200"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <TrashIcon className="h-6 w-6" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:w-1/4 bg-white p-6 rounded-lg shadow-md h-fit">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Order Summary
                </h2>
                <div className="flex justify-between items-center border-b pb-2 mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-gray-800">
                    ৳{cartTotal}
                  </span>
                </div>
                {/* <div className="flex justify-between items-center border-b pb-2 mb-2">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold text-gray-800">Free</span>
                </div> */}
                <div className="flex justify-between items-center font-bold text-lg pt-2">
                  <span>Total</span>
                  <span>৳{cartTotal}</span>
                </div>
                <Link
                  to="/checkout"
                  className="mt-6 w-full flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-full font-semibold text-lg hover:bg-blue-700 transition-colors"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
