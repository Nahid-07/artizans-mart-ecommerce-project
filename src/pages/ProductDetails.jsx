import { Link, useLoaderData, useParams } from "react-router";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import Navbar from "../components/Navbar";
import ProductReviews from "../components/ProductReviews";
import { useEffect, useState } from "react";
import { renderStars } from "../libs/renderStars";
import Footer from "../components/Footer";

const ProductDetails = () => {
  const { data: productData, filterRiview } = useLoaderData();
  const [mainImage, setMainImage] = useState(productData.images[0]);
  useEffect(() => {
    setMainImage(productData.images[0]);
  }, [productData]);
  return (
    <div>
      <Navbar />
      <div className="bg-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:space-x-12">
            {/* Left Side: Product Images */}
            <div className="w-full md:w-1/2">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img
                  src={mainImage} // <-- This is the fix
                  alt={productData.name}
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Thumbnail Gallery */}
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                {productData?.images?.map((image, index) => (
                  <div
                    key={index}
                    className={`w-20 h-20 rounded-md overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105 ${
                      mainImage === image
                        ? "ring-2 ring-blue-600 ring-offset-2"
                        : ""
                    }`}
                    onClick={() => setMainImage(image)}
                  >
                    <img
                      src={image}
                      alt={`${productData.name} thumbnail ${index + 1}`}
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
                  ({filterRiview?.length} reviews)
                </span>
              </div>

              <p className="mt-6 text-4xl font-bold text-gray-900">
                ৳{productData.offer_price}
              </p>

              <p className="mt-6 text-gray-700 leading-relaxed">
                {productData.long_description}
              </p>

              {productData.stock_status === "out_of_stock" ? (
                <p className="text-center mt-8 font-bold text-2xl">
                  Out of stock
                </p>
              ) : (
                <div className="mt-8 flex space-x-4">
                  <button className="cursor-pointer flex-1 flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-full font-semibold text-lg hover:bg-blue-700 transition-colors transform hover:scale-105">
                    <ShoppingCartIcon className="h-5 w-5 mr-2" />
                    Add to Cart
                  </button>
                  <Link to={`/checkout/${productData._id}`}>
                    <button className="flex-1 flex items-center justify-center border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-full font-semibold text-lg hover:bg-blue-50 transition-colors transform hover:scale-105">
                      Buy Now
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Additional Sections (e.g., Features) */}
          <div className="mt-20">
            <h3 className="text-2xl font-bold text-gray-900 border-b pb-2">
              Product Features
            </h3>
            <ul className="mt-4 list-disc list-inside space-y-2 text-gray-700">
              {productData.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <ProductReviews productId={productData._id} />
      <Footer />
    </div>
  );
};

export default ProductDetails;
