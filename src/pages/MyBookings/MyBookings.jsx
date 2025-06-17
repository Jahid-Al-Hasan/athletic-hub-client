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
import { Trash2, Calendar, MapPin, Ticket } from "lucide-react";
import { format } from "date-fns";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookedEvents, setBookedEvents] = useState([]);
  const [cancellingId, setCancellingId] = useState(null);
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>

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
      ) : (
        <div className="border rounded-lg overflow-hidden shadow-sm">
          <Table>
            <TableHeader className="bg-gray-50">
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
      )}
    </div>
  );
};

export default MyBookings;
