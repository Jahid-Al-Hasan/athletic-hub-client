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
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AuthContext } from "../../provider/AuthContext";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import PageTitle from "../../utils/PageTitle/PageTitle";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [disableBooking, setDisableBooking] = useState(false);
  const event = useLoaderData();
  const axiosSecure = useAxiosSecure();

  const participantCount = event?.participants?.length || 0;

  const handleBookEvent = async () => {
    try {
      axiosSecure
        .patch(`/update-eventParticipants/${event?._id}?email=${user?.email}`)
        .then((res) => {
          setDisableBooking(true);
          if (res?.data?.result?.modifiedCount > 0) {
            Swal.fire("Event booked successfully!");
            navigate("/my-bookings");
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
    <div className="max-w-7xl mx-auto px-4 py-24">
      <PageTitle title="Event Details" />
      <Button
        variant="outline"
        onClick={() => navigate("/events")}
        className="mb-6 border-2 dark:border-secondary"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Events
      </Button>

      <Card className="pt-0">
        {/* Event Header */}
        <div className="relative ">
          <img
            src={event?.pictureUrl}
            alt={event?.name}
            className="w-full h-96 object-cover object-center rounded-t-2xl"
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
            <Separator className="my-4" />
            <p className="mb-6">{event?.description}</p>

            <div className="space-y-4">
              <div className="flex items-start">
                <Calendar className="h-5 w-5 mt-0.5 mr-3 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">Date & Time</h3>
                  <p>
                    {format(new Date(event.date), "EEEE, MMMM do, yyyy")}
                    <br />
                    {format(new Date(event?.date), "h:mm a")}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="h-5 w-5 mt-0.5 mr-3 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold ">Location</h3>
                  <p>{event.location}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Users className="h-5 w-5 mt-0.5 mr-3 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">Participants</h3>
                  <p className="font-medium">
                    {participantCount} registered (
                    {event?.capacity - participantCount} spots remaining)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="rounded-lg p-6 border border-gray-200 dark:border-black/30 sticky top-6">
              <h3 className="text-xl font-semibold mb-4">Event Registration</h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="">Registration Fee:</span>
                  <span className="font-medium">${event.registrationFee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="">Capacity:</span>
                  <span className="font-medium">
                    {event.capacity} participants
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="">Date:</span>
                  <span className="font-medium">
                    {format(new Date(event.date), "MMM do")}
                  </span>
                </div>
              </div>

              <Button
                onClick={() => handleBookEvent()}
                disabled={
                  disableBooking ||
                  participantCount >= event.capacity ||
                  new Date(event.date) < new Date()
                }
                className="w-full cursor-pointer"
              >
                {disableBooking ? (
                  "Already Booked!"
                ) : participantCount >= event?.capacity ? (
                  "Event Full"
                ) : new Date(event.date) < new Date() ? (
                  "Event Ended"
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
                <h4 className="font-medium mb-2">What's included:</h4>
                <ul className="space-y-2 text-sm ">
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
      </Card>
    </div>
  );
};

export default EventDetails;
