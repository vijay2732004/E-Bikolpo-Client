import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import HomeLayout from "../Pages/HomeLayout";
import Home from "../components/Home";
import ErrorPage from "../components/ErrorPage";



const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children: [
      {index: true, Component: Home}
    ]
  },
  {
    path: "*",
    Component: ErrorPage
  }
]);
export default router;