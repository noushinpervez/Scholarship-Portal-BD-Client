import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes";
import { HelmetProvider } from "react-helmet-async";
import FirebaseProvider from "./FirebaseProvider/FirebaseProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FirebaseProvider>
      <HelmetProvider>
        <RouterProvider router={ router } />
      </HelmetProvider>
    </FirebaseProvider>
  </React.StrictMode>,
);