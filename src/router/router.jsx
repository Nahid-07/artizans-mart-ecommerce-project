import { createBrowserRouter } from "react-router";
import { DashboardLayout } from "../layout/DashboradLayout/DashboardLayout";
import { ProductUploadForm } from "../components/dashboardComponents/ProductUploadForm";
import { ProductUpdateForm } from "../components/dashboardComponents/ProductUpdateForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>hello</h1>,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard/add-product",
        element: <ProductUploadForm />,
      },
      {
        path: "/dashboard/update-product",
        element: <ProductUpdateForm />,
      },
    ],
  },
]);
