import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { format, parseISO } from "date-fns";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const eventTypes = [
  "Swimming",
  "Sprinting",
  "Long Jump",
  "High Jump",
  "Hurdle Race",
  "Marathon",
  "Relay Race",
  "Pole Vault",
  "Discus Throw",
  "Javelin Throw",
  "Shot Put",
  "Other",
];

const UpdateEventModal = ({ event, open, onOpenChange, onSuccess }) => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const updatedEvent = Object.fromEntries(formData.entries());

    updatedEvent.date = `${updatedEvent?.date}T${updatedEvent?.time}Z`;

    delete updatedEvent.time;

    // Convert number fields
    updatedEvent.registrationFee = Number(updatedEvent.registrationFee);
    updatedEvent.capacity = Number(updatedEvent.capacity);

    try {
      const response = await axiosSecure.patch(
        `/update-event/${event?._id}?email=${user?.email}`,
        updatedEvent
      );
      if (response?.data?.modifiedCount > 0) {
        Swal.fire("Event updated successfully");
        // Close modal and refresh
        onOpenChange(false);
        onSuccess();
      } else {
        Swal.fire("Event not updated");
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Something went wrong");
    }
  };

  if (!event) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px] max-h-[calc(100vh-20px)] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Event</DialogTitle>
          <DialogDescription>
            Make changes to your event here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleUpdate} className="space-y-6">
          {/* Event Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Event Name
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              defaultValue={event?.name ?? ""}
              required
            />
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium mb-1"
            >
              Category
            </label>
            <Select
              name="category"
              defaultValue={event?.category ?? ""}
              required
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select an event type" />
              </SelectTrigger>
              <SelectContent>
                {eventTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date and Time */}
          <div className="flex gap-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium mb-1">
                Event Date *
              </label>
              <Input
                name="date"
                id="date"
                type="date"
                defaultValue={event?.date.split("T")[0]}
              />
            </div>
            <div>
              <label htmlFor="time" className="block text-sm font-medium mb-1">
                Event Time *
              </label>
              <Input
                name="time"
                type="time"
                id="time"
                step="1"
                defaultValue={
                  event?.date ? format(parseISO(event.date), "HH:mm:ss") : ""
                }
                className="bg-background"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium mb-1"
            >
              Location *
            </label>
            <Input
              id="location"
              name="location"
              type="text"
              defaultValue={event?.location ?? ""}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium mb-1"
            >
              Description *
            </label>
            <Textarea
              id="description"
              name="description"
              defaultValue={event?.description ?? ""}
              placeholder="Enter event description"
              required
            />
          </div>

          {/* Image URL */}
          <div>
            <label
              htmlFor="pictureUrl"
              className="block text-sm font-medium mb-1"
            >
              Event Image URL
            </label>
            <Input
              id="pictureUrl"
              name="pictureUrl"
              type="url"
              defaultValue={event?.pictureUrl ?? ""}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Registration Fee and Capacity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="registrationFee"
                className="block text-sm font-medium mb-1"
              >
                Registration Fee *
              </label>
              <Input
                id="registrationFee"
                name="registrationFee"
                type="number"
                defaultValue={event?.registrationFee ?? ""}
                required
              />
            </div>
            <div>
              <label
                htmlFor="capacity"
                className="block text-sm font-medium mb-1"
              >
                Capacity *
              </label>
              <Input
                id="capacity"
                name="capacity"
                type="number"
                defaultValue={event?.capacity ?? ""}
                required
              />
            </div>
          </div>

          {/* Organizer */}
          <div>
            <label
              htmlFor="organizer"
              className="block text-sm font-medium mb-1"
            >
              Organizer *
            </label>
            <Input
              id="organizer"
              name="organizer"
              type="text"
              defaultValue={event?.organizer ?? ""}
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              type="button"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Update Event
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateEventModal;
