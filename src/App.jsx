import React from "react";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/home/Home";
import RoomDetails from "./pages/roomDetails/RoomDetails";
import ListingsPage from "./pages/ListingsPage/ListingsPage";
import MyRequestPage from "./pages/myRequestPage/MyRequestPage";
import Contact from "./pages/contact/Contact";
import LoginPage from "./pages/auth/loginPage/LoginPage";
import RegisterPage from "./pages/auth/registerpage/RegisterPage";

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
        },
        {
          path:"/my-requests",
          element:<MyRequestPage/>
        },
        {
          path:"/contact",
          element:<Contact/>
        },
        {
          path:"/login",
          element:<LoginPage/>
        },
        {
          path:"/register",
          element:<RegisterPage/>
        }
      ],
    },
  ]);
  return <RouterProvider router={routes}> </RouterProvider>;
};

export default App;
