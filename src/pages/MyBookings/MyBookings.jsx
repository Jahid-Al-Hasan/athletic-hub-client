import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthContext";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2, Calendar, MapPin, Ticket, List, Grid } from "lucide-react";
import { format } from "date-fns";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import PageTitle from "../../utils/PageTitle/PageTitle";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookedEvents, setBookedEvents] = useState([]);
  const [cancellingId, setCancellingId] = useState(null);
  const [viewMode, setViewMode] = useState("table"); // 'table' or 'card'
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (!user?.email) return;

    const fetchBookings = async () => {
      try {
        const res = await axiosSecure.get(`/my-bookings?email=${user?.email}`);
        setBookedEvents(res.data);
      } catch (err) {
        Swal.fire("Failed to load bookings");
        console.error(err);
      }
    };

    fetchBookings();
  }, [user?.email, axiosSecure]);

  const handleCancelBooking = async (bookingId) => {
    setCancellingId(bookingId);
    try {
      const response = await axiosSecure.patch(
        `/cancel-booking/${bookingId}?email=${user?.email}`
      );
      setBookedEvents(bookedEvents.filter((event) => event._id !== bookingId));
      if (response?.matchedCount > 0) {
        Swal.fire("Booking cancelled successfully");
      }
    } catch (err) {
      Swal.fire("Failed to cancel booking");
      console.error(err);
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <PageTitle title="My Bookings" />
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 justify-between items-start mb-6">
        <h1 className="text-xl lg:text-2xl font-bold">My Bookings</h1>
        <div className="flex flex-col md:flex-row gap-2">
          <Button
            variant={viewMode === "table" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("table")}
          >
            <List className="h-4 w-4 mr-2" />
            Table View
          </Button>
          <Button
            variant={viewMode === "card" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("card")}
          >
            <Grid className="h-4 w-4 mr-2" />
            Card View
          </Button>
        </div>
      </div>

      {bookedEvents.length === 0 ? (
        <div className="text-center py-12">
          <Ticket className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h2 className="text-xl font-medium text-gray-600">
            No Bookings Found
          </h2>
          <p className="text-gray-500 mt-2">
            You haven't booked any events yet. Browse events to make your first
            booking.
          </p>
          <Button className="mt-4" asChild>
            <a href="/events">Browse Events</a>
          </Button>
        </div>
      ) : viewMode === "table" ? (
        <div className="border rounded-lg overflow-hidden shadow-sm">
          <Table>
            <TableHeader className="bg-secondary">
              <TableRow>
                <TableHead className="w-[200px]">Event</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookedEvents.map((booking) => (
                <TableRow key={booking?._id}>
                  <TableCell className="font-medium">{booking?.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      {format(new Date(booking?.date), "MM, dd, yyyy")}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                      {booking?.location}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                      {booking?.category}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="destructive"
                      size="sm"
                      className="cursor-pointer"
                      onClick={() => {
                        handleCancelBooking(booking._id);
                      }}
                      disabled={cancellingId === booking._id}
                    >
                      {cancellingId === booking._id ? (
                        "Cancelling..."
                      ) : (
                        <>
                          <Trash2 className="h-4 w-4 mr-1" />
                          Cancel
                        </>
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookedEvents.map((booking) => (
            <Card
              key={booking?._id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <CardTitle>{booking?.name}</CardTitle>
                <div className="flex items-center mt-2">
                  <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                    {booking?.category}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                  {format(new Date(booking?.date), "MMM dd, yyyy")}
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                  {booking?.location}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleCancelBooking(booking._id)}
                  disabled={cancellingId === booking._id}
                >
                  {cancellingId === booking._id ? (
                    "Cancelling..."
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4 mr-1" />
                      Cancel
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
