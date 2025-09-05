import { createBrowserRouter } from "react-router";
import { DashboardLayout } from "../layout/DashboradLayout/DashboardLayout";
import ProductUpdateForm from "../components/dashboardComponents/ProductUpdateForm";
import { HomePageLayout } from "../layout/HomePageLayout/HomePageLayout";
import ProductDetails from "../pages/ProductDetails";
import ProductGrid from "../components/ProductGrid";
import ProductForm from "../components/dashboardComponents/ProductForm";
import Checkout from "../pages/Checkout";
import OrdersPage from "../components/dashboardComponents/OrdersPage";
import AllProducts from "../components/dashboardComponents/AllProducts";
import ThankYouPage from "../components/ThankYouPage";
import NotFoundPage from "../pages/NotFoundPage";
import ShopPage from "../components/ShopPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePageLayout />,
    errorElement: <NotFoundPage/>,
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
      fetch(`http://localhost:5000/products/${params.id}`),
  },
  {
    path: "/checkout/:id",
    element: <Checkout />,
    loader: ({ params }) =>
      fetch(`http://localhost:5000/products/${params.id}`),
  },
  {
    path: '/shop',
    element: <ShopPage/>,
    loader: ()=> fetch('http://localhost:5000/products')
  },
  {
    path: '/thank-you',
    element: <ThankYouPage/>
  },

  {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: <NotFoundPage/>,
    children: [
      {
        path: "/dashboard/add-product",
        element: <ProductForm />,
      },
      {
        path: "/dashboard/update-product/:id",
        element: <ProductUpdateForm />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/products/${params.id}`),
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
