import { Link } from "react-router";
import { renderStars } from "../libs/renderStars";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105">
      <Link to={`/productDetails/${product._id}`} className="block">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-48 object-cover object-center"
        />
      </Link>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 truncate">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600">{product.short_description}</p>
        <div className="mt-2">{renderStars(product.rating)}</div>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-xl font-bold text-gray-900">৳{product.price}</p>
          <Link
            to={`/productDetails/${product._id}`}
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
