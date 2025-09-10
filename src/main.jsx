import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./router/router.jsx";
import { AuthProviderContext } from "./context_API/AuthProviderContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProviderContext>
      <RouterProvider router={router} />
    </AuthProviderContext>
  </StrictMode>
);
