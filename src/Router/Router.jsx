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
import PrivetRoute from "./PrivetRoute";
import AddQuery from "../components/AddQueries";
import UpdateQueires from "../components/UpdateQueires";
import QueryDetails from "../components/QueriesDetails";



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
      {path: "/myQueries", element: <PrivetRoute><MyQueries/></PrivetRoute>},
      {path: "/addQueries", element: <PrivetRoute><AddQuery/></PrivetRoute>},
      {path: "/myRecommendations", Component: MyRecommendations},
      {path: "/UpdateQuery/:id", Component: UpdateQueires},
      {path: "/QueryDetails/:id", Component: QueryDetails},
    ]
  },
  {
    path: "*",
    Component: ErrorPage
  }
]);
export default router;