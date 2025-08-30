export const ProductUploadForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const productData = {
      productName: form.productName.value,
      category: form.productCategory.value,
      price: form.price.value,
      stock: form.stock.value,
      ratings: form.ratings.value,
      photourl: form.photourl.value,
      description: form.description.value,
      features: form.features.value.split(",").map((f) => f.trim()),
    };
    console.log(productData);
    fetch("http://localhost:5000/addProduct", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(productData),
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.insertedId){
          alert("Product has been added")
        }
        form.reset()
  });
  };
  return (
    <div className="bg-white p-10 md:p-20 rounded-lg shadow-lg">
      <h3 className="text-gray-800 text-xl font-medium text-center mb-3">
        Add a Product
      </h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="block">Product Name</label>
          <input
            type="text"
            className="outline-none rounded-lg border border-sky-600 md:w-96 mt-2 p-2 text-gray-800"
            placeholder="Product name"
            name="productName"
          />
        </div>
        <div>
          <label className="block mt-2">Category</label>
          <select
            name="productCategory"
            className="outline-none rounded-lg border border-sky-600 md:w-96 mt-2 p-2 text-gray-800"
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
            className="outline-none rounded-lg border border-sky-600 md:w-96 mt-2 p-2 text-gray-800"
            placeholder="Price"
            name="price"
          />
        </div>
        <div>
          <label className="block mt-2">Stock</label>
          <input
            type="number"
            className="outline-none rounded-lg border border-sky-600 md:w-96 mt-2 p-2 text-gray-800"
            placeholder="Price"
            name="stock"
          />
        </div>
        <div>
          <label className="block mt-2">Ratings</label>
          <input
            type="number"
            className="outline-none rounded-lg border border-sky-600 md:w-96 mt-2 p-2 text-gray-800"
            placeholder="Price"
            step={0.1}
            max={5}
            name="ratings"
          />
        </div>
        <div>
          <label className="block mt-2">Photo URL</label>
          <input
            type="text"
            className="outline-none rounded-lg border border-sky-600 md:w-96 mt-2 p-2 text-gray-800"
            placeholder="Photo url"
            name="photourl"
          />
        </div>
        <div>
          <label className="block mt-2">Description</label>
          <textarea
            name="description"
            className="outline-none rounded-lg border border-sky-600 md:w-96 mt-2 p-2 text-gray-800"
          ></textarea>
        </div>
        <div>
          <label className="block mt-2">Specifications</label>
          <textarea
            type="text"
            className="outline-none rounded-lg border border-sky-600 md:w-96 mt-2 p-2 text-gray-800"
            placeholder="Specifications"
            name="features"
          />
        </div>
        <div>
          <button className="md:w-96 bg-sky-600 text-white p-3 rounded-lg mt-2">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};
