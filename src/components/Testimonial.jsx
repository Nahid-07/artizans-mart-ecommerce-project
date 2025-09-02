// src/components/Testimonials.jsx
import React from 'react';
import { StarIcon } from '@heroicons/react/24/solid';

const testimonialsData = [
  {
    id: 1,
    quote: "The headphones are absolutely phenomenal! The sound quality is top-notch, and the noise cancellation is a game-changer. I highly recommend Artizans' Mart!",
    author: "Jane Doe",
    product: "Wireless Bluetooth Headphones",
    rating: 5,
  },
  {
    id: 2,
    quote: "I was skeptical at first, but the delivery was incredibly fast and the smartwatch exceeded my expectations. The team was very helpful with my queries.",
    author: "John Smith",
    product: "Smartwatch with Fitness Tracker",
    rating: 4.5,
  },
  {
    id: 3,
    quote: "Fantastic product and a smooth shopping experience. The gaming monitor is perfect for my setup. Will definitely be a returning customer.",
    author: "Mike Johnson",
    product: "4K Ultra HD Gaming Monitor",
    rating: 5,
  },
];

const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center text-yellow-400">
      {Array(fullStars).fill().map((_, i) => (
        <StarIcon key={`full-${i}`} className="h-5 w-5" />
      ))}
      {halfStar && (
        <div className="relative">
          <StarIcon className="h-5 w-5" />
          <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
            <StarIcon className="h-5 w-5 text-gray-300" />
          </div>
        </div>
      )}
      {Array(emptyStars).fill().map((_, i) => (
        <StarIcon key={`empty-${i}`} className="h-5 w-5 text-gray-300" />
      ))}
    </div>
  );
};

const Testimonial = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
          What Our Customers Say
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Hear from our satisfied customers about their experience with our products and service.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl shadow-lg p-8 transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="flex justify-center mb-4">
                {renderStars(testimonial.rating)}
              </div>
              <p className="text-gray-700 italic leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div className="mt-6">
                <p className="font-semibold text-gray-900">{testimonial.author}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Verified Buyer of <span className="font-medium">{testimonial.product}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;