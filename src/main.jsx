import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./routes/Routes";
import AuthProvider from "./provider/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import  { Toaster } from 'react-hot-toast';
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
     <QueryClientProvider client={queryClient}>
    <AuthProvider>
    <HelmetProvider>
    <RouterProvider router={router} />
    <Toaster/>
    </HelmetProvider>
    </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
