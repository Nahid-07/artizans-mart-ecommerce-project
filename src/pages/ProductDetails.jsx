import { Link, useLoaderData } from "react-router";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import Navbar from "../components/Navbar";
import ProductReviews from "../components/ProductReviews";
import { useEffect, useState } from "react";
import { renderStars } from "../libs/renderStars";
import Footer from "../components/Footer";
import { useCart } from "../hooks/useCart";

const ProductDetails = () => {
  const { data: productData, filterRiview } = useLoaderData();
  
  const [mainImage, setMainImage] = useState(productData?.images?.[0] || "");
  const { handleAddToCart } = useCart();

  useEffect(() => {
    if (productData?.images?.length > 0) {
      setMainImage(productData.images[0]);
    }
  }, [productData]);

  return (
    <div>
      <Navbar />
      <div className="bg-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:space-x-12">
            {/* Left Side: Product Images */}
            <div className="w-full md:w-1/2">
              <div className="rounded-lg overflow-hidden shadow-xl aspect-square flex items-center justify-center bg-gray-100">
                <img
                  src={mainImage}
                  alt={productData.name}
                  className="w-full h-full object-contain" 
                />
              </div>

              {/* Thumbnail Gallery */}
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                {productData?.images?.map((image, index) => (
                  <div
                    key={index}
                    className={`w-20 h-20 rounded-md overflow-hidden cursor-pointer border-2 transition-all duration-300 ${
                      mainImage === image
                        ? "border-blue-600 opacity-100"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                    onClick={() => setMainImage(image)}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side: Product Details */}
            <div className="w-full md:w-1/2 mt-8 md:mt-0">
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                {productData.name}
              </h1>
              <p className="mt-2 text-xl font-semibold text-gray-700">
                {productData.brand}
              </p>

              <div className="mt-4 flex items-center space-x-2">
                {renderStars(productData.rating)}
                <span className="text-gray-600 text-sm">
                  ({filterRiview?.length || 0} reviews)
                </span>
              </div>

              <div className="mt-6">
                 <p className="text-sm text-gray-500 line-through">৳{productData.regular_price}</p>
                 <p className="text-4xl font-bold text-blue-600">
                  ৳{productData.offer_price}
                </p>
              </div>

              <p className="mt-6 text-gray-700 leading-relaxed">
                {productData.long_description}
              </p>

              {productData.stock_status === "out_of_stock" ? (
                <div className="mt-8 p-4 bg-red-100 text-red-700 rounded-lg text-center font-bold">
                  Currently Out of Stock
                </div>
              ) : (
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => handleAddToCart(productData)}
                    className="flex-1 flex items-center justify-center bg-blue-600 text-white px-6 py-4 rounded-full font-semibold text-lg hover:bg-blue-700 transition-transform active:scale-95 shadow-lg"
                  >
                    <ShoppingCartIcon className="h-6 w-6 mr-2" />
                    Add to Cart
                  </button>
                  <Link to={`/checkout/${productData._id}`} className="flex-1">
                    <button className="w-full flex items-center justify-center border-2 border-blue-600 text-blue-600 px-6 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition-colors">
                      Buy Now
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-20 border-t pt-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Product Features
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {productData.features?.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="h-2 w-2 mt-2 mr-3 bg-blue-500 rounded-full"></span>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <ProductReviews productId={productData._id} initialReviews={filterRiview} />
      <Footer />
    </div>
  );
};

export default ProductDetails;