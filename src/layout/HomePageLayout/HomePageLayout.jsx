import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import ProductGrid from "../../components/ProductGrid";
import { Outlet } from "react-router";
import Categories from "../../components/Categories";
import Newsletter from "../../components/Newsletter";
import Testimonial from "../../components/Testimonial";
import Footer from "../../components/Footer";

export const HomePageLayout = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <section>
        <Hero />
      </section>
      <section>
        <Outlet></Outlet>
      </section>
      <section>
        <Categories/>
      </section>
      <section>
        <Testimonial/>
      </section>
      <section>
        <Newsletter/>
      </section>
      <section>
        <Footer/>
      </section>
    </>
  );
};
