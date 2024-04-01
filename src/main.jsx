import React from "react";
import { RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import router from "./router";

import "./index.css";
import 'react-toastify/dist/ReactToastify.css';

import AuthProvider from "./components/AuthProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
