// src/components/ProductCard.jsx
import React from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router';

const ProductCard = ({ product }) => {
  // Function to render stars based on the rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center text-yellow-400">
        {Array(fullStars).fill().map((_, i) => (
          <StarIcon key={`full-${i}`} className="h-5 w-5" />
        ))}
        {hasHalfStar && (
          <StarIcon key="half" className="h-5 w-5 text-gray-300" />
        )}
        {Array(emptyStars).fill().map((_, i) => (
          <StarIcon key={`empty-${i}`} className="h-5 w-5 text-gray-300" />
        ))}
        <span className="ml-2 text-sm text-gray-500">({rating})</span>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105">
      <Link to={`/product/${product.id}`} className="block">
        <img
          src={product.photourl}
          alt={product.productName}
          className="w-full h-48 object-cover object-center"
        />
      </Link>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 truncate">{product.productName}</h3>
        <div className="mt-2">{renderStars(product.ratings)}</div>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-xl font-bold text-gray-900">${product.price}</p>
          <Link
            to={`/product/${product.id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;