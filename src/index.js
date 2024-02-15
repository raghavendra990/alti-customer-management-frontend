import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";

import Body from "./body";
import UserInput from "./userInput";

import Header from "./header";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

const Applayout = () => {
  // const location = useLocation();
  // const productUrl = location.pathname;

  return (
    <>
      <Header />
      <Outlet />
    </>
  )
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Applayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/login",
        element: <UserInput meta = "Login" />,
      },
      {
        path: "/register",
        element: <UserInput meta = "Register" />,
      },

    ],
  },


  // {path: "*",
  //   element: <PageNotFound/>
  // }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
