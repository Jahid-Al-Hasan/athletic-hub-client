import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../provider/AuthContext";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Plus, Calendar, MapPin, Users } from "lucide-react";
import { format } from "date-fns";
import Swal from "sweetalert2";
import DeleteConfirmationDialog from "../../components/DeleteConfirmationDialog/DeleteConfirmationDialog";
import UpdateEventModal from "../../components/UpdateEventModal/UpdateEventModal";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import PageTitle from "../../utils/PageTitle/PageTitle";

const ManageEvents = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [refreshEvents, setRefreshEvents] = useState(false);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (!user?.email) return;

    const fetchEvents = async () => {
      try {
        const res = await axiosSecure.get(
          `/creator-events?email=${user?.email}`
        );
        setEvents(res.data);
      } catch (err) {
        Swal.fire("Failed to load events");
        console.error(err);
      }
    };

    fetchEvents();
  }, [user?.email, refreshEvents, axiosSecure]);

  const handleDeleteEvent = async () => {
    if (!eventToDelete) return;

    try {
      const result = await axiosSecure.delete(
        `/delete-event/${eventToDelete}?email=${user?.email}`
      );
      if (!result) {
        Swal.fire("Event is not deleted");
      }
      if (result) {
        setEvents(events.filter((event) => event._id !== eventToDelete));
        Swal.fire("Event deleted successfully");
      }
    } catch (err) {
      Swal.fire("Failed to delete event");
      console.error(err);
    } finally {
      setDeleteDialogOpen(false);
      setEventToDelete(null);
    }
  };

  const handleUpdateEvent = (event) => {
    setSelectedEvent(event);
    setUpdateModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <PageTitle title="Manage Events" />
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 justify-between items-center mb-6">
        <h1 className="text-xl lg:text-2xl font-bold">Manage Your Events</h1>
        <Button onClick={() => navigate("/create-event")}>
          <Plus className="h-4 w-4 mr-2" />
          Create New Event
        </Button>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-12 border rounded-lg">
          <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h2 className="text-xl font-medium text-gray-600">
            No Events Created Yet
          </h2>
          <p className="text-gray-500 mt-2">
            You haven't created any events. Click the button below to create
            your first event.
          </p>
          <Button className="mt-4" onClick={() => navigate("/create-event")}>
            Create Event
          </Button>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden shadow-sm">
          <Table>
            <TableCaption className="text-left px-6 py-2 bg-secondary">
              Events you've created
            </TableCaption>
            <TableHeader className="bg-secondary">
              <TableRow>
                <TableHead className="w-[200px]">Event Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Participants</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event._id}>
                  <TableCell className="font-medium">{event?.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      {format(new Date(event?.date), "MMM dd, yyyy")}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                      {event?.location}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                      {event?.category}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-gray-500" />
                      {event?.participants?.length || 0}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleUpdateEvent(event)}
                        className="cursor-pointer dark:border-secondary"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Update
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          setEventToDelete(event?._id);
                          setDeleteDialogOpen(true);
                        }}
                        className="cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteEvent}
        title="Delete Event"
        description="Are you sure you want to delete this event? This action cannot be undone."
      />

      <UpdateEventModal
        event={selectedEvent}
        open={updateModalOpen}
        onOpenChange={setUpdateModalOpen}
        onSuccess={() => {
          setRefreshEvents(!refreshEvents);
        }}
      />
    </div>
  );
};

export default ManageEvents;
