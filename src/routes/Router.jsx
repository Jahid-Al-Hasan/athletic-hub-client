import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Error from "../pages/Error/Error";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ProtectedRoute from "../provider/ProtectedRoute";
import CreateEvent from "../pages/CreateEvent/CreateEvent";
import MyBookings from "../pages/MyBookings/MyBookings";
import ManageEvents from "../pages/ManageEvents/ManageEvents";
import AllEvents from "../pages/AllEvents/AllEvents";
import axios from "axios";
import EventDetails from "../pages/EventDetails/EventDetails";
import { Loading } from "../components/Loading/Loading";
import MyProfile from "../pages/MyProfile/MyProfile";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <Error />,
    children: [
      { index: true, Component: Home },
      { path: "login", Component: Login },
      { path: "signup", Component: Register },
      {
        path: "my-profile",
        Component: MyProfile,
      },
      {
        path: "events",
        loader: () =>
          fetch("https://athletichubserver.vercel.app/api/v1/events").catch(
            (err) => console.log(err)
          ),
        Component: AllEvents,
        hydrateFallbackElement: <Loading />,
      },
      {
        path: "my-bookings",
        element: (
          <ProtectedRoute>
            <MyBookings />
          </ProtectedRoute>
        ),
      },
      {
        path: "manage-events",
        element: (
          <ProtectedRoute>
            <ManageEvents />
          </ProtectedRoute>
        ),
      },
      {
        path: "create-event",
        element: (
          <ProtectedRoute>
            <CreateEvent />
          </ProtectedRoute>
        ),
      },
      {
        path: "event/:id",
        loader: async ({ params }) => {
          try {
            // const response = await axios.get(
            //   `https://athletichubserver.vercel.app/api/v1/event/${params.id}`
            // );
            const response = await axios.get(
              `http://localhost:3000/api/v1/event/${params.id}`
            );
            return response.data;
          } catch (error) {
            throw new Response(null, {
              status: error.response?.status || "Event not found",
            });
          }
        },
        element: (
          <ProtectedRoute>
            <EventDetails />
          </ProtectedRoute>
        ),
        hydrateFallbackElement: <Loading />,
      },
    ],
  },
]);

export default router;
