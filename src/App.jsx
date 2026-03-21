import React from "react";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/home/Home";
import RoomDetails from "./pages/roomDetails/RoomDetails";

const App = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/room/:id",
          element: <RoomDetails />,
        },
      ],
    },
  ]);
  return <RouterProvider router={routes}> </RouterProvider>;
};

export default App;
