import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/featured-products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false); 
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center py-16">Loading...</div>;
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-xl font-semibold text-gray-700">
          No featured products available.
        </p>
        <p className="text-gray-500 mt-2">
          Check back later or add new products to see them here.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;