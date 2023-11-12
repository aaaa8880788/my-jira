import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from '@/App'
import ErrorPage from "@/views/errorPage";
import Home from "@/views/home";
import Login from "@/views/login";
import TestPage from "@/views/testPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "test",
        element: <TestPage />,
      },
    ]
  },
]);

export default router
