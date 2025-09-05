import React, { useState, useEffect } from "react";
import { useParams, Link, useLoaderData } from "react-router";
import { renderStars } from "../libs/renderStars";

const CategoryShopPage = () => {
  const data = useLoaderData();
  const { category } = useParams();
  const [filters, setFilters] = useState({ priceRange: "All", rating: 0 });

  const filteredProducts = data?.filter((product) => {
    // Simplified price filter logic
    const priceMatch = true;
    // Rating filter
    const ratingMatch = product.rating >= filters.rating;
    return priceMatch && ratingMatch;
  });
  return (
    <div className="bg-gray-100 min-h-screen py-16">
      <div className="container mx-auto px-4 mt-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center capitalize">
          {category}
        </h1>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="md:w-1/4 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>
            {/* Rating Filter */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Rating
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                onChange={(e) =>
                  setFilters({ ...filters, rating: parseFloat(e.target.value) })
                }
              >
                <option value="0">All</option>
                <option value="4.5">4.5 Stars & Up</option>
                <option value="4.0">4.0 Stars & Up</option>
                <option value="3.0">3.0 Stars & Up</option>
              </select>
            </div>
            {/* Price Range Filter */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Price Range
              </label>
              <p className="text-sm text-gray-500">Coming soon...</p>
            </div>
          </div>

          {/* Product Grid */}
          <div className="md:w-3/4">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-10 text-gray-500">
                <p>No products found in this category matching your filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                  >
                    <Link to={`/product/${product._id}`}>
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                    </Link>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        <Link to={`/product/${product._id}`}>
                          {product.name}
                        </Link>
                      </h3>
                      <p className="text-sm text-gray-500">{product.brand}</p>
                      <div className="flex items-center my-2">
                        {renderStars(product.rating)}
                        <span className="ml-2 text-sm text-gray-600">
                          {product.rating}
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-gray-800">
                        ৳{product.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryShopPage;
