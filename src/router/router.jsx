import { createBrowserRouter } from "react-router";
import { DashboardLayout } from "../layout/DashboradLayout/DashboardLayout";
import { ProductUpdateForm } from "../components/dashboardComponents/ProductUpdateForm";
import { HomePageLayout } from "../layout/HomePageLayout/HomePageLayout";
import ProductDetails from "../pages/ProductDetails";
import ProductGrid from "../components/ProductGrid";
import ProductForm from "../components/dashboardComponents/ProductForm";
import Checkout from "../pages/Checkout";
import OrdersPage from "../components/dashboardComponents/OrdersPage";
import Categories from "../components/Categories";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePageLayout />,
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
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard/add-product",
        element: <ProductForm />,
      },
      {
        path: "/dashboard/update-product",
        element: <ProductUpdateForm />,
      },
      {
        path: "/dashboard/orders",
        element: <OrdersPage />,
      },
    ],
  },
]);
