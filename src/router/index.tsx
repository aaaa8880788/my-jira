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
        path: "home/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      
    ]
  }
]);

export default router
