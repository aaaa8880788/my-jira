import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from '@/App'
import ErrorPage from "@/views/errorPage";
import Login from "@/views/login";
import Home from "@/views/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "home",
        element: <Home />,
      },
    ]
  }
]);

export default router
