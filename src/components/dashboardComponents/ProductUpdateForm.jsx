// import { useState } from "react";
// import { useLoaderData, useNavigate } from "react-router";

// const ProductUpdateForm = () => {
//   const { data } = useLoaderData();
//   const navigate = useNavigate();
//   const [productData, setProductData] = useState({
//     name: data.name,
//     brand: data.brand,
//     price: data.price,
//     rating: data.rating,
//     reviews_count: 0,
//     category: data.category,
//     is_featured: data.is_featured,
//     stock_status: data.stock_status,
//     short_description: data.short_description,
//     long_description: data.long_description,
//     images: data.images,
//     features: data.features,
//   });
//   const [newFeature, setNewFeature] = useState("");
//   const [newImage, setNewImage] = useState("");

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setProductData({
//       ...productData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleAddFeature = () => {
//     if (newFeature.trim() !== "") {
//       setProductData({
//         ...productData,
//         features: [...productData.features, newFeature.trim()],
//       });
//       setNewFeature("");
//     }
//   };

//   const handleRemoveFeature = (index) => {
//     const updatedFeatures = productData.features.filter((_, i) => i !== index);
//     setProductData({ ...productData, features: updatedFeatures });
//   };

//   const handleAddImage = () => {
//     if (newImage.trim() !== "") {
//       setProductData({
//         ...productData,
//         images: [...productData.images, newImage.trim()],
//       });
//       setNewImage("");
//     }
//   };

//   const handleRemoveImage = (index) => {
//     const updatedImages = productData.images.filter((_, i) => i !== index);
//     setProductData({ ...productData, images: updatedImages });
//   };

//   const handleUpdate = (e) => {
//     e.preventDefault();
//     fetch(`https://artizans-mart-ecommerce-server.onrender.com/update-product/${data._id}`, {
//       method: "PUT",
//       headers: {
//         "content-type": "application/json",
//       },
//       body: JSON.stringify(productData),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.result.modifiedCount > 0) {
//           alert(data.message);
//           navigate("/dashboard/all-products");
//         }
//       });
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
//         <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
//           Update Product
//         </h2>
//         <form onSubmit={handleUpdate} className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Product Name
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 value={productData.name}
//                 onChange={handleInputChange}
//                 required
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Brand
//               </label>
//               <input
//                 type="text"
//                 name="brand"
//                 value={productData.brand}
//                 onChange={handleInputChange}
//                 required
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Price (৳)
//               </label>
//               <input
//                 type="number"
//                 name="price"
//                 value={productData.price}
//                 onChange={handleInputChange}
//                 step="0.01"
//                 required
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Rating (1-5)
//               </label>
//               <input
//                 type="number"
//                 name="rating"
//                 value={productData.rating}
//                 onChange={handleInputChange}
//                 min="0"
//                 max="5"
//                 step="0.1"
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//               />
//             </div>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Category
//               </label>
//               <input
//                 type="text"
//                 name="category"
//                 value={productData.category}
//                 onChange={handleInputChange}
//                 required
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Stock Status
//               </label>
//               <select
//                 name="stock_status"
//                 value={productData.stock_status}
//                 onChange={handleInputChange}
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//               >
//                 <option value="in_stock">In Stock</option>
//                 <option value="out_of_stock">Out of Stock</option>
//               </select>
//             </div>
//           </div>
//           <div>
//             <label className="inline-flex items-center">
//               <input
//                 type="checkbox"
//                 name="is_featured"
//                 checked={productData.is_featured}
//                 onChange={handleInputChange}
//                 className="rounded text-blue-600 focus:ring-blue-500"
//               />
//               <span className="ml-2 text-sm text-gray-700">
//                 Mark as Featured Product
//               </span>
//             </label>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Short Description
//             </label>
//             <textarea
//               name="short_description"
//               value={productData.short_description}
//               onChange={handleInputChange}
//               rows="3"
//               required
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Long Description
//             </label>
//             <textarea
//               name="long_description"
//               value={productData.long_description}
//               onChange={handleInputChange}
//               rows="5"
//               required
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//             />
//           </div>

//           {/* Dynamic Features Input */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Features
//             </label>
//             <div className="flex space-x-2 mt-1">
//               <input
//                 type="text"
//                 value={newFeature}
//                 onChange={(e) => setNewFeature(e.target.value)}
//                 placeholder="e.g., Active Noise Cancellation"
//                 className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//               />
//               <button
//                 type="button"
//                 onClick={handleAddFeature}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
//               >
//                 Add
//               </button>
//             </div>
//             <ul className="mt-2 space-y-2">
//               {productData.features.map((feature, index) => (
//                 <li
//                   key={index}
//                   className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
//                 >
//                   <span className="text-sm text-gray-700">{feature}</span>
//                   <button
//                     type="button"
//                     onClick={() => handleRemoveFeature(index)}
//                     className="ml-2 text-red-500 hover:text-red-700"
//                   >
//                     &times;
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Dynamic Images Input */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Image URLs
//             </label>
//             <div className="flex space-x-2 mt-1">
//               <input
//                 type="url"
//                 value={newImage}
//                 onChange={(e) => setNewImage(e.target.value)}
//                 placeholder="https://example.com/image.jpg"
//                 className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//               />
//               <button
//                 type="button"
//                 onClick={handleAddImage}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
//               >
//                 Add
//               </button>
//             </div>
//             <ul className="mt-2 space-y-2">
//               {productData.images.map((image, index) => (
//                 <li
//                   key={index}
//                   className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
//                 >
//                   <span className="text-sm text-gray-700 truncate">
//                     {image}
//                   </span>
//                   <button
//                     type="button"
//                     onClick={() => handleRemoveImage(index)}
//                     className="ml-2 text-red-500 hover:text-red-700"
//                   >
//                     &times;
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div className="mt-6">
//             <button
//               type="submit"
//               className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
//             >
//               Update
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ProductUpdateForm;

import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router"; // Use react-router-dom for useNavigate

const ProductUpdateForm = () => {
  const { data } = useLoaderData();
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    name: data.name,
    brand: data.brand,
    // Add regular price and offer price to the state
    regular_price: data.regular_price || "",
    offer_price: data.offer_price || "",
    rating: data.rating,
    reviews_count: data.reviews_count,
    category: data.category,
    is_featured: data.is_featured,
    stock_status: data.stock_status,
    short_description: data.short_description,
    long_description: data.long_description,
    images: data.images,
    features: data.features,
  });
  const [newFeature, setNewFeature] = useState("");
  const [newImage, setNewImage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductData({
      ...productData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleAddFeature = () => {
    if (newFeature.trim() !== "") {
      setProductData({
        ...productData,
        features: [...productData.features, newFeature.trim()],
      });
      setNewFeature("");
    }
  };

  const handleRemoveFeature = (index) => {
    const updatedFeatures = productData.features.filter((_, i) => i !== index);
    setProductData({ ...productData, features: updatedFeatures });
  };

  const handleAddImage = () => {
    if (newImage.trim() !== "") {
      setProductData({
        ...productData,
        images: [...productData.images, newImage.trim()],
      });
      setNewImage("");
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = productData.images.filter((_, i) => i !== index);
    setProductData({ ...productData, images: updatedImages });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Price validation
    const regularPrice = parseFloat(productData.regular_price);
    const offerPrice = parseFloat(productData.offer_price);

    if (offerPrice >= regularPrice) {
      setError("Offer price must be less than the regular price.");
      setIsSubmitting(false);
      return;
    }

    // Prepare data to send, ensuring numerical values are parsed
    const updatedProductData = {
      ...productData,
      regular_price: regularPrice,
      offer_price: offerPrice,
      rating: parseFloat(productData.rating),
    };

    try {
      const res = await fetch(`https://artizans-mart-ecommerce-server.onrender.com/update-product/${data._id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(updatedProductData),
      });

      const resultData = await res.json();
      
      if (resultData.result.modifiedCount > 0) {
        alert(resultData.message);
        navigate("/dashboard/all-products");
      } else {
        alert("No changes were made to the product.");
      }
    } catch (err) {
      console.error("Update failed:", err);
      setError("Failed to update product. Please check your network connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
          Update Product
        </h2>
        {error && (
          <div className="mb-4 text-center text-red-600 font-medium">
            {error}
          </div>
        )}
        <form onSubmit={handleUpdate} className="space-y-6">
          {/* Product and Brand Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Product Name</label>
              <input
                type="text"
                name="name"
                value={productData.name}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Brand</label>
              <input
                type="text"
                name="brand"
                value={productData.brand}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-1"
              />
            </div>
          </div>
          
          {/* Price and Rating Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Regular Price (৳)</label>
              <input
                type="number"
                name="regular_price"
                value={productData.regular_price}
                onChange={handleInputChange}
                step="0.01"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Offer Price (৳)</label>
              <input
                type="number"
                name="offer_price"
                value={productData.offer_price}
                onChange={handleInputChange}
                step="0.01"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Rating (0-5)</label>
              <input
                type="number"
                name="rating"
                value={productData.rating}
                onChange={handleInputChange}
                min="0"
                max="5"
                step="0.1"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-1"
              />
            </div>
          </div>
          
          {/* Category, Stock, and Featured Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <input
                type="text"
                name="category"
                value={productData.category}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Stock Status</label>
              <select
                name="stock_status"
                value={productData.stock_status}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-1"
              >
                <option value="in_stock">In Stock</option>
                <option value="out_of_stock">Out of Stock</option>
              </select>
            </div>
          </div>
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="is_featured"
                checked={productData.is_featured}
                onChange={handleInputChange}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Mark as Featured Product</span>
            </label>
          </div>
          
          {/* Description Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Short Description</label>
            <textarea
              name="short_description"
              value={productData.short_description}
              onChange={handleInputChange}
              rows="3"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Long Description</label>
            <textarea
              name="long_description"
              value={productData.long_description}
              onChange={handleInputChange}
              rows="5"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-1"
            />
          </div>

          {/* Dynamic Features Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Features</label>
            <div className="flex space-x-2 mt-1">
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder="e.g., Active Noise Cancellation"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-1"
              />
              <button
                type="button"
                onClick={handleAddFeature}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Add
              </button>
            </div>
            <ul className="mt-2 space-y-2">
              {productData.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
                >
                  <span className="text-sm text-gray-700">{feature}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(index)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    &times;
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Dynamic Images Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Image URLs</label>
            <div className="flex space-x-2 mt-1">
              <input
                type="url"
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-1"
              />
              <button
                type="button"
                onClick={handleAddImage}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Add
              </button>
            </div>
            <ul className="mt-2 space-y-2">
              {productData.images.map((image, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
                >
                  <span className="text-sm text-gray-700 truncate">{image}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    &times;
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors ${
                isSubmitting ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isSubmitting ? "Updating..." : "Update Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductUpdateForm;
