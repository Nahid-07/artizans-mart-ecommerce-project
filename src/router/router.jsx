import { createBrowserRouter } from "react-router";
import { DashboardLayout } from "../layout/DashboradLayout/DashboardLayout";
import ProductUpdateForm from "../components/dashboardComponents/ProductUpdateForm";
import { HomePageLayout } from "../layout/HomePageLayout/HomePageLayout";
import ProductDetails from "../pages/ProductDetails";
import ProductGrid from "../components/ProductGrid";
import ProductAddForm from "../components/dashboardComponents/ProductAddForm";
import Checkout from "../pages/Checkout";
import OrdersPage from "../components/dashboardComponents/OrdersPage";
import AllProducts from "../components/dashboardComponents/AllProducts";
import NotFoundPage from "../pages/NotFoundPage";
import ShopPage from "../components/ShopPage";
import AboutUsPage from "../pages/AboutUsPage";
import ThankYouPage from "../pages/ThankYouPage";
import CategoryShopPage from "../pages/CategoryShopPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import CartPage from "../pages/CartPage";
import CheckoutPageFromCart from "../pages/CheckoutPageFromCart";
import ReturnPolicy from "../pages/ReturnPolicy";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePageLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <ProductGrid />,
      },
    ],
  },

  {
    path: "/productDetails/:id",
    element: <ProductDetails />,
    loader: ({ params }) =>
      fetch(
        `https://artizans-mart-ecommerce-server.onrender.com/products/${params?.id}`
      ),
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "/checkout/:id",
    element: <Checkout />,
    loader: ({ params }) =>
      fetch(
        `https://artizans-mart-ecommerce-server.onrender.com/products/${params?.id}`
      ),
  },

  {
    path: "/checkout",
    element: <CheckoutPageFromCart />,
  },
  {
    path: "/shop",
    element: <ShopPage />,
    loader: () =>
      fetch("https://artizans-mart-ecommerce-server.onrender.com/products"),
  },
  {
    path: "/category/:category",
    element: <CategoryShopPage />,
    loader: ({ params }) => {
      const category = params?.category;
      const capitalizedCategory = category
        ? category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
        : "";
      return fetch(
        `https://artizans-mart-ecommerce-server.onrender.com/category/${capitalizedCategory}`
      );
    },
  },
  {
    path: "/thank-you",
    element: <ThankYouPage />,
  },
  {
    path: "/about_us",
    element: <AboutUsPage />,
  },
  {
    path: "/register_user",
    element: <RegisterPage />,
  },
  {
    path: "/login_user",
    element: <LoginPage />,
  },
  {
    path: "/returns",
    element: <ReturnPolicy />,
  },

  {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/dashboard/add-product",
        element: <ProductAddForm />,
      },
      {
        path: "/dashboard/update-product/:id",
        element: <ProductUpdateForm />,
        loader: ({ params }) =>
          fetch(
            `https://artizans-mart-ecommerce-server.onrender.com/products/${params?.id}`
          ),
      },
      {
        path: "/dashboard/orders",
        element: <OrdersPage />,
      },
      {
        path: "/dashboard/all-products",
        element: <AllProducts />,
      },
    ],
  },
]);
