import { Link } from "react-router";
import { renderStars } from "../libs/renderStars";

const ProductCard = ({ product }) => {
  const {
    name,
    short_description,
    regular_price,
    offer_price,
    rating,
    images,
    _id,
  } = product;

  return (
    <div className="relative bg-white rounded-xl shadow-lg overflow-hidden group transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl">
      {/* Sale Badge */}
      <span className="absolute top-4 left-4 z-10 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
        Sale
      </span>

      {/* Product Image */}
      <Link to={`/productDetails/${_id}`}>
        <div className="w-full h-64 overflow-hidden">
          <img
            src={images[0]}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </Link>

      {/* Card Content */}
      <div className="p-5 flex flex-col justify-between h-auto">
        <div>
          <h3 className="text-xl font-bold text-gray-900 truncate mb-1">
            <Link
              to={`/productDetails/${_id}`}
              className="hover:text-blue-600 transition-colors"
            >
              {name}
            </Link>
          </h3>
          <p
            className="text-sm text-gray-500 line-clamp-2"
            title={short_description}
          >
            {short_description.split(" ").slice(0, 20).join(" ") + "..."}
          </p>
        </div>

        <div className="mt-4">
          {/* Ratings */}
          <div className="flex items-center mb-2">
            {renderStars(rating)}
            <span className="ml-2 text-sm text-gray-600">{rating}</span>
          </div>

          {/* Pricing */}
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-extrabold text-blue-600">
              ৳{offer_price}
            </span>
            <span className="text-md font-medium text-gray-400 line-through">
              ৳{regular_price}
            </span>
          </div>
        </div>

        {/* Add to Cart Button */}
        <Link
          to={`/productDetails/${_id}`}
          className="mt-6 w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
