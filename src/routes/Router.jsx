import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Error from "../pages/Error/Error";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ProtectedRoute from "../provider/ProtectedRoute";
import CreateEvent from "../pages/CreateEvent/CreateEvent";
import BookEvent from "../pages/BookEvent/BookEvent";
import MyBookings from "../pages/MyBookings/MyBookings";
import ManageEvents from "../pages/ManageEvents/ManageEvents";
import AllEvents from "../pages/AllEvents/AllEvents";
import axios from "axios";
import EventDetails from "../pages/EventDetails/EventDetails";
import { Loading } from "../components/Loading/Loading";

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
        path: "events",
        loader: () => fetch("http://localhost:3000/api/v1/events"),
        Component: AllEvents,
        hydrateFallbackElement: <Loading />,
      },
      {
        path: "book-event",
        element: (
          <ProtectedRoute>
            <BookEvent />
          </ProtectedRoute>
        ),
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
