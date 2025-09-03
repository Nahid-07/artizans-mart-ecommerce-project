// src/components/AllProducts.jsx
import React, { useState, useEffect } from "react";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real application, you would fetch data from your API
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((products) => setProducts(products));

    setLoading(false);
  }, []);

  const handleDelete = async (productId) => {
    // In a real application, you would send a DELETE request to your backend
    console.log(`Deleting product with ID: ${productId}`);
    // Optimistically update the UI
    setProducts(products.filter((product) => product._id !== productId));
    alert(`Product ${productId} has been deleted.`);
  };

  if (loading) {
    return (
      <div className="text-center mt-20">
        <p className="text-xl text-gray-600">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-12 mt-16">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
          All Products
        </h1>
        <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-xl">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Product Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Brand
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Price
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.brand}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ৳{product.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        product.stock_status === "in_stock"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.stock_status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link
                      to={`/dashboard/update-product/${product._id}`}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      <PencilSquareIcon className="h-5 w-5 inline" />
                      <span className="ml-1">Edit</span>
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="h-5 w-5 inline" />
                      <span className="ml-1">Delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
