import { lazy } from "react";
import { Outlet, createBrowserRouter } from "react-router-dom";

import { App, AppPrivate } from "./App";
import NotFound from "./components/NotFound";
import Redirect from "./components/Redirect";
const Home = lazy(() => import("./pages/home"));
const Motors = lazy(() => import("./pages/motors"));
const Order = lazy(() => import("./pages/order"));
const OrderNew = lazy(() => import("./pages/order/new"));

const UserNotes = lazy(() => import("./pages/user/notes"));
const AdminNotes = lazy(() => import("./pages/admin/notes"));
const About = lazy(() => import("./pages/about"));

export const router = createBrowserRouter([
  {
    path: "admin",
    element: <AppPrivate />,
    children: [
      {
        path: "",
        element: <AdminNotes />,
      },
    ],
  },
  {
    path: "app",
    element: <AppPrivate />,
    children: [
      {
        path: "",
        element: <UserNotes />,
      },
      {
        path: "order",
        element: <Outlet />,
        children: [
          {
            path: "",
            element: <Order />,
          },
          {
            path: "new",
            element: <OrderNew />,
          },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "motors",
        children: [
          {
            path: "",
            element: <Redirect to="/" />,
          },
          {
            path: ":type",
            element: <Motors />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
