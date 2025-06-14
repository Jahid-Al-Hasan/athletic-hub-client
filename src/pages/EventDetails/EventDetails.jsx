import React, { useState, useContext } from "react";
import { useParams, useNavigate, useLoaderData } from "react-router";
// import { getEventById, createBooking } from "../api/events";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  MapPin,
  Users,
  ArrowLeft,
  Ticket,
  Clock,
  Award,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AuthContext } from "../../provider/AuthContext";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [bookingLoading, setBookingLoading] = useState(false);
  const event = useLoaderData();

  const handleBookEvent = async () => {
    setBookingLoading(true);
    //     try {
    //       const bookingData = {
    //         ...event,
    //         user_email: user.email,
    //         user_name: user.displayName || user.email,
    //         booking_date: new Date().toISOString(),
    //       };

    //       await createBooking(bookingData);
    //       toast.success("Event booked successfully!");
    //     } catch (error) {
    //       toast.error("Failed to book event");
    //       console.error(error);
    //     } finally {
    //       setBookingLoading(false);
    //     }
  };

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-lg text-gray-600">Event not found</p>
        <Button onClick={() => navigate("/events")} className="mt-4">
          Back to Events
        </Button>
      </div>
    );
  }

  // Event type styling
  //   const eventTypeStyles = {
  //     marathon: "bg-orange-100 text-orange-800",
  //     sprinting: "bg-green-100 text-green-800",
  //     swimming: "bg-blue-100 text-blue-800",
  //     basketball: "bg-red-100 text-red-800",
  //     "trail-running": "bg-amber-100 text-amber-800",
  //     volleyball: "bg-yellow-100 text-yellow-800",
  //     "high-jump": "bg-purple-100 text-purple-800",
  //     cycling: "bg-cyan-100 text-cyan-800",
  //     "hurdle-race": "bg-pink-100 text-pink-800",
  //   };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="outline" onClick={() => navigate(-1)} className="mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Events
      </Button>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Event Header */}
        <div className="relative">
          <img
            src={event.pictureUrl || "https://via.placeholder.com/800x400"}
            alt={event.name}
            className="w-full h-64 object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <h1 className="text-3xl font-bold text-white">{event.name}</h1>
            <div className="flex items-center mt-2">
              <Badge
                className={`${
                  eventTypeStyles[event.category.toLowerCase()] ||
                  "bg-gray-100 text-gray-800"
                } mr-2`}
              >
                {event.category}
              </Badge>
              <span className="text-white/90 text-sm">
                Organized by {event.organizer}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6">
          {/* Main Content */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-semibold mb-4">Event Details</h2>
            <p className="text-gray-700 mb-6">{event.description}</p>

            <div className="space-y-4">
              <div className="flex items-start">
                <Calendar className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">Date & Time</h3>
                  <p className="text-gray-600">
                    {format(new Date(event.date), "EEEE, MMMM do, yyyy")}
                    <br />
                    {format(new Date(event.date), "h:mm a")}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">Location</h3>
                  <p className="text-gray-600">{event.location}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Users className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">Participants</h3>
                  <p className="text-gray-600">
                    {participantCount} registered (
                    {event.capacity - participantCount} spots remaining)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="md:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 sticky top-6">
              <h3 className="text-xl font-semibold mb-4">Event Registration</h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Registration Fee:</span>
                  <span className="font-medium">${event.registrationFee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Capacity:</span>
                  <span className="font-medium">
                    {event.capacity} participants
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">
                    {format(new Date(event.date), "MMM do")}
                  </span>
                </div>
              </div>

              <Button
                onClick={handleBookEvent}
                disabled={bookingLoading || participantCount >= event.capacity}
                className="w-full"
              >
                {bookingLoading ? (
                  "Processing..."
                ) : participantCount >= event.capacity ? (
                  "Event Full"
                ) : (
                  <>
                    <Ticket className="h-4 w-4 mr-2" />
                    Book Now
                  </>
                )}
              </Button>

              {user?.email === event.creatorEmail && (
                <Button
                  variant="outline"
                  onClick={() => navigate(`/update-event/${id}`)}
                  className="w-full mt-3"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Event
                </Button>
              )}

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-2">
                  What's included:
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <Award className="h-4 w-4 text-green-500 mr-2" />
                    Event participation
                  </li>
                  <li className="flex items-center">
                    <Clock className="h-4 w-4 text-green-500 mr-2" />
                    Timing chip (for timed events)
                  </li>
                  <li className="flex items-center">
                    <Ticket className="h-4 w-4 text-green-500 mr-2" />
                    Digital certificate
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
