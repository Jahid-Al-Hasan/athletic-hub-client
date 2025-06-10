import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Error from "../pages/Error/Error";
import Home from "../pages/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <Error />,
    children: [{ index: true, Component: Home }],
  },
]);

export default router;
