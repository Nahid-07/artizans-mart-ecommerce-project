import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./router/router.jsx";
import { AuthProviderContext } from "./context_API/AuthProviderContext.jsx";
import { CartProvider } from "./context_API/CartProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <AuthProviderContext>
        <RouterProvider router={router} />
      </AuthProviderContext>
    </CartProvider>
  </StrictMode>
);
