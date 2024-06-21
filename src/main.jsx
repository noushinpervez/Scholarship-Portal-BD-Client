import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes";
import { HelmetProvider } from "react-helmet-async";
import FirebaseProvider from "./providers/FirebaseProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FirebaseProvider>
      <QueryClientProvider client={ queryClient }>
        <HelmetProvider>
          <RouterProvider router={ router } />
        </HelmetProvider>
      </QueryClientProvider>
    </FirebaseProvider>
  </React.StrictMode>,
);