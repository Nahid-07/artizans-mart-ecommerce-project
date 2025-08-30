import { Link } from "react-router";

const Hero = () => {
  return (
    <div className="bg-gray-100 py-20 md:py-32 lg:py-40">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-12 md:space-y-0 md:space-x-12">
          {/* Left Part: Text Content */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
              Discover the Future of <br className="hidden md:inline" />
              <span className="text-blue-600">Electronics</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto md:mx-0">
              Explore our curated collection of the latest gadgets, from
              powerful laptops to innovative smart devices.
            </p>
            <div className="mt-8 flex justify-center md:justify-start">
              <Link
                to="#"
                className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
              >
                Shop Now
              </Link>
              <Link
                to="#"
                className="ml-4 text-blue-600 border border-blue-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-blue-50 transition-colors duration-300 transform hover:scale-105"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Right Part: Image */}
          <div className="flex-1 w-full md:w-auto mt-12 md:mt-0">
            <img
              src="https://scontent.fdac41-1.fna.fbcdn.net/v/t39.30808-6/493895865_122242964276064718_6699246580041560321_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=FUARpPeCGf0Q7kNvwE_p952&_nc_oc=Adl-hYwHnT9gETWU29hP-wDllDTAdfhOK3rs5-VUvwc8iMdcHALpLk8LmlGxpoDn9vc&_nc_zt=23&_nc_ht=scontent.fdac41-1.fna&_nc_gid=xTlZl36qPCh_voxR8L9Uww&oh=00_AfUYI9-T8RPMA_MMFjVCUrqC6UWHvQmFg1JnK6597TQ-8g&oe=68B86810"
              alt="A collection of modern electronic gadgets"
              className="w-full h-auto rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
