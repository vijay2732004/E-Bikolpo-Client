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
import RecommendationsForMe from "../components/RecommendationsForMe";
import MyQueries from "../components/MyQueries";
import MyRecommendations from "../components/MyRecommendations";



const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children: [
      {index: true, Component: Home},
      {path: "/quires", Component: Queries},
      {path: "/login", Component: Login},
      {path: "/register", Component: Register},
      {path: "/recommendationsForMe", Component: RecommendationsForMe},
      {path: "/myQueries", Component: MyQueries},
      {path: "/myRecommendations", Component: MyRecommendations},
    ]
  },
  {
    path: "*",
    Component: ErrorPage
  }
]);
export default router;