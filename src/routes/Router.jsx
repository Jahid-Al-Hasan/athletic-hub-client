import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Error from "../pages/Error/Error";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <Error />,
    children: [
      { index: true, Component: Home },
      { path: "login", Component: Login },
    ],
  },
]);

export default router;
