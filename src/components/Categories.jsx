
import { Link } from 'react-router';
import Headphone from '../assets/earBuds.png'
import Powerbank from '../assets/powerbank.jpg'
import smartwatch from '../assets/smartwatch.jpg'

const categoriesData = [
  {
    name: 'Headphones',
    image: Headphone,
    link: '/products/headphones',
  },
  {
    name: 'Powerbank',
    image: Powerbank,
    link: '/products/smartwatches',
  },
  {
    name: 'Smartwatches',
    image: smartwatch,
    link: '/products/laptops',
  },
  {
    name: 'Gaming Accessories',
    image: 'https://images.unsplash.com/photo-1596538421869-d4c5c70a0491?q=80&w=2940&auto=format&fit=crop',
    link: '/products/gaming',
  },
];

const Categories = () => {
  return (
    <div className="bg-white py-12 sm:py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categoriesData.map((category, index) => (
            <Link key={index} to={category.link} className="block group">
              <div className="relative overflow-hidden rounded-lg shadow-md transition-shadow duration-300 group-hover:shadow-xl">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-48 sm:h-64 object-cover transform transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black opacity-70 flex items-center justify-center">
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                    {category.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;