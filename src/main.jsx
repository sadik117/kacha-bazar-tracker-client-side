import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./router/Routes.jsx";
import AuthProvider from "./Authentication/AuthProvider.jsx";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ToastContainer position="top-center"> </ToastContainer>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
    </QueryClientProvider>
    </HelmetProvider>
  </StrictMode>
);
