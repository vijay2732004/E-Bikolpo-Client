import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import HomeLayout from "../Pages/HomeLayout";
import Home from "../components/Home";
import ErrorPage from "../components/ErrorPage";
import Queries from "../components/Queries";
import Login from "../components/Login";
import Register from "../components/Registration";



const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children: [
      {index: true, Component: Home},
      {path: "/quires", Component: Queries},
      {path: "/login", Component: Login},
      {path: "/register", Component: Register},
    ]
  },
  {
    path: "*",
    Component: ErrorPage
  }
]);
export default router;