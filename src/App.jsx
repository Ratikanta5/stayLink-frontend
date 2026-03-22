import React from "react";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/home/Home";
import RoomDetails from "./pages/roomDetails/RoomDetails";
import ListingsPage from "./pages/ListingsPage/ListingsPage";

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
        {
          path:"/listings",
          element:<ListingsPage/>
        }
      ],
    },
  ]);
  return <RouterProvider router={routes}> </RouterProvider>;
};

export default App;
