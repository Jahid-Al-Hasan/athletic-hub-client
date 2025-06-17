import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate, useLoaderData } from "react-router";
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
  Edit,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AuthContext } from "../../provider/AuthContext";
import Swal from "sweetalert2";
import axios from "axios";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [disableBooking, setDisableBooking] = useState(false);
  const event = useLoaderData();

  const participantCount = event?.participants?.length || 0;

  const handleBookEvent = async () => {
    try {
      axios
        .patch(
          `http://localhost:3000/api/v1/update-eventParticipants/${event?._id}?email=${user?.email}`
        )
        .then((res) => {
          setDisableBooking(true);
          if (res?.data?.result?.modifiedCount > 0) {
            Swal.fire("Event booked successfully!");
          } else {
            Swal.fire("Event not updated");
          }
        });
    } catch (error) {
      Swal.fire("Failed to book event");

      console.error(error);
    }
  };

  useEffect(() => {
    if (event?.participants?.includes(user?.email)) {
      setDisableBooking(true);
    }
  }, [event?.participants, user]);

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

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="outline"
        onClick={() => navigate("/events")}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Events
      </Button>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Event Header */}
        <div className="relative">
          <img
            src={event?.pictureUrl || "https://via.placeholder.com/800x400"}
            alt={event?.name}
            className="w-full h-96 object-cover object-center"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <h1 className="text-3xl font-bold text-white">{event?.name}</h1>
            <div className="flex items-center mt-2">
              <Badge className="bg-gray-100 text-gray-800 mr-2">
                {event?.category}
              </Badge>
              <span className="text-white/90 text-sm">
                Organized by {event?.organizer}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-4">Event Details</h2>
            <p className="text-gray-700 mb-6">{event?.description}</p>

            <div className="space-y-4">
              <div className="flex items-start">
                <Calendar className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">Date & Time</h3>
                  <p className="text-gray-600">
                    {format(new Date(event.date), "EEEE, MMMM do, yyyy")}
                    <br />
                    {format(new Date(event?.date), "h:mm a")}
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
                    {event?.capacity - participantCount} spots remaining)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
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
                onClick={() => handleBookEvent()}
                disabled={disableBooking || participantCount >= event.capacity}
                className="w-full cursor-pointer"
              >
                {disableBooking ? (
                  "Already Booked!"
                ) : participantCount >= event?.capacity ? (
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
