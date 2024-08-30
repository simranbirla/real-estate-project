import HomePage from "./routes/homePage/homePage";
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import ListPage from "./routes/listPage/listPage";
import Layout, { ProtectedRoute } from "./routes/layout/layout";
import SinglePage from "./routes/singlePage/singlePage";
import ProfilePage from "./routes/profilePage/profilePage";
import Login from "./routes/login/login";
import ProfileUpdatePage from "./routes/profileUpdatePage/profileUpdatePage";
import Register from "./routes/register/register";
import NewPostPage from "./routes/newPostPage/newPostPage";
import { listLoader, postLoader, profileListLoader } from "./lib/loader";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/list",
          element: <ListPage />,
          loader: listLoader,
        },
        {
          path: "/property/:id",
          element: <SinglePage />,
          loader: postLoader,
        },

        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
      ],
    },
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/profile",
          element: <ProfilePage />,
          loader: profileListLoader
        },
        {
          path: "/profile/update",
          element: <ProfileUpdatePage />,
        },
        {
          path: "/add-post",
          element: <NewPostPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}


export default App;
