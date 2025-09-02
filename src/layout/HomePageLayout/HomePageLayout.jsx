import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import ProductGrid from "../../components/ProductGrid";
import { Outlet } from "react-router";
import Categories from "../../components/Categories";

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
    </>
  );
};
