import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import { App } from "./App";
import { AppPrivate } from "./AppPriv";
import NotFound from "./components/NotFound";
const Home = lazy(() => import("./pages/home"));
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
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
