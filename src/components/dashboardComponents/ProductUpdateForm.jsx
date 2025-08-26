import React from "react";

export const ProductUpdateForm = () => {
  return (
    <div className="bg-white p-20 rounded-lg shadow-lg">
      <h3 className="text-gray-800 text-xl font-medium text-center mb-3">
        Update a Product
      </h3>
      <form>
        <div>
          <label className="block">Product Name</label>
          <input
            type="text"
            className="outline-none rounded-lg border border-sky-600 w-96 mt-2 p-2 text-gray-800"
            placeholder="Product name"
          />
        </div>
        <div>
          <label className="block mt-2">Category</label>
          <select
            name="productCategory"
            className="outline-none rounded-lg border border-sky-600 w-96 mt-2 p-2 text-gray-800"
          >
            <option value="powerbank">Powerbank</option>
            <option value="earbuds">earbuds</option>
            <option value="smartwatch">Smartwatch</option>
          </select>
        </div>
        <div>
          <label className="block mt-2">Price</label>
          <input
            type="text"
            className="outline-none rounded-lg border border-sky-600 w-96 mt-2 p-2 text-gray-800"
            placeholder="Price"
          />
        </div>
        <div>
          <label className="block mt-2">Stock</label>
          <input
            type="number"
            className="outline-none rounded-lg border border-sky-600 w-96 mt-2 p-2 text-gray-800"
            placeholder="Price"
          />
        </div>
        <div>
          <label className="block mt-2">Ratings</label>
          <input
            type="number"
            className="outline-none rounded-lg border border-sky-600 w-96 mt-2 p-2 text-gray-800"
            placeholder="Price"
            step={0.1}
            max={5}
          />
        </div>
        <div>
          <label className="block mt-2">Photo URL</label>
          <input
            type="text"
            className="outline-none rounded-lg border border-sky-600 w-96 mt-2 p-2 text-gray-800"
            placeholder="Photo url"
          />
        </div>
        <div>
          <label className="block mt-2">Description</label>
          <textarea
            name="description"
            className="outline-none rounded-lg border border-sky-600 w-96 mt-2 p-2 text-gray-800"
          ></textarea>
        </div>
        <div>
          <button className="w-96 bg-sky-600 text-white p-3 rounded-lg mt-2">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};
