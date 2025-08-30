import { createBrowserRouter } from "react-router";
import { DashboardLayout } from "../layout/DashboradLayout/DashboardLayout";
import { ProductUploadForm } from "../components/dashboardComponents/ProductUploadForm";
import { ProductUpdateForm } from "../components/dashboardComponents/ProductUpdateForm";
import { HomePageLayout } from "../layout/HomePageLayout/HomePageLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePageLayout/>,
    // children: [
    //   {
    //     path: ,
    //     element: 
    //   }
    // ]
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
