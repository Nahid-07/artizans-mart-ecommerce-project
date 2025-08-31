import { createBrowserRouter } from "react-router";
import { DashboardLayout } from "../layout/DashboradLayout/DashboardLayout";
import { ProductUploadForm } from "../components/dashboardComponents/ProductUploadForm";
import { ProductUpdateForm } from "../components/dashboardComponents/ProductUpdateForm";
import { HomePageLayout } from "../layout/HomePageLayout/HomePageLayout";
import ProductDetails from "../pages/ProductDetails";
import ProductGrid from "../components/ProductGrid";
import ProductForm from "../components/dashboardComponents/ProductForm";

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
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard/add-product",
        element: <ProductForm/>
      },
      {
        path: "/dashboard/update-product",
        element: <ProductUpdateForm />,
      },
    ],
  },
]);
