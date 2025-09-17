import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import { Outlet } from "react-router";
import Categories from "../../components/Categories";
import Newsletter from "../../components/Newsletter";
import Testimonial from "../../components/Testimonial";
import Footer from "../../components/Footer";

export const HomePageLayout = () => {
  return (
    <>
    <title>Artizans' Mart_ home</title>
      <header>
        <Navbar />
      </header>
      <section>
        <Hero />
      </section>
      <section>
        <Categories/>
      </section>
      <section>
        <Outlet></Outlet>
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
