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
import { PrivateRoute } from "./PrivateRoute";
import { axiosPublic } from "../hooks/useAxiosPublic"; // Import the instance

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
    loader: async ({ params }) => {
      const res = await axiosPublic.get(`/products/${params?.id}`);
      return res.data;
    },
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "/checkout/:id",
    element: <PrivateRoute><Checkout /></PrivateRoute>,
    loader: async ({ params }) => {
      const res = await axiosPublic.get(`/products/${params?.id}`);
      return res.data;
    },
  },

  {
    path: "/checkout",
    element: <PrivateRoute> <CheckoutPageFromCart /></PrivateRoute>,
  },
  {
    path: "/shop",
    element: <ShopPage />,
    loader: async () => {
      const res = await axiosPublic.get("/products");
      return res.data;
    },
  },
  {
    path: "/category/:category",
    element: <CategoryShopPage />,
    loader: async ({ params }) => {
      const category = params?.category;
      const capitalizedCategory = category
        ? category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
        : "";
      const res = await axiosPublic.get(`/category/${capitalizedCategory}`);
      return res.data;
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
        loader: async ({ params }) => {
          const res = await axiosPublic.get(`/products/${params?.id}`);
          return res.data;
        },
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