import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { AuthContext } from "../../provider/AuthContext";
import { format } from "date-fns";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import PageTitle from "../../utils/PageTitle/PageTitle";

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

export default function CreateEvent() {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(undefined);
  const axiosSecure = useAxiosSecure();

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const newEvent = Object.fromEntries(formData.entries());

    newEvent.registrationFee = Number(newEvent.registrationFee);
    newEvent.capacity = Number(newEvent.capacity);

    if (!date || !newEvent.time) {
      Swal.fire({
        title: "Please select date and time",
        icon: "error",
        draggable: true,
      });
    } else {
      newEvent.date = `${format(date, "yyyy-MM-dd")}T${newEvent.time}Z`;
      delete newEvent.time;
      axiosSecure
        .post(`/createEvent?email=${user?.email}`, newEvent)
        .then((res) => {
          if (res.data.insertedId) {
            Swal.fire({
              title: res?.data?.message,
              icon: "success",
              draggable: true,
            });
          } else {
            Swal.fire({
              title: res?.data?.message,
              icon: "error",
              draggable: true,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md my-4">
      <PageTitle title="Create Event" />
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Create New Event
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Event Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Event Name *
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            className="w-full"
            placeholder="Enter event name"
            required
          />
        </div>

        {/* Event Type */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Category *
          </label>
          <Select name="category" required>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an event type" />
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-800">
              {eventTypes.map((type) => (
                <SelectItem
                  key={type}
                  value={type}
                  className="dark:hover:bg-gray-700"
                >
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Event Date */}
        <div className="flex gap-4">
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Event Date *
            </label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="date"
                  className="w-48 justify-between font-normal"
                >
                  {date ? date.toLocaleDateString() : "Select date"}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={date}
                  captionLayout="dropdown"
                  onSelect={(date) => {
                    setDate(date);
                    setOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <label
              htmlFor="time"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Event Time *
            </label>
            <Input
              name="time"
              type="time"
              id="time"
              // value={time}
              // onChange={(e) => setTime(e.target.value)}
              step="1"
              defaultValue="10:30:00"
              className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
            />
          </div>
        </div>

        {/* location */}
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Location *
          </label>
          <Input
            id="location"
            name="location"
            type="text"
            className="w-full md:w-1/2 bg-gray-100 dark:bg-gray-700"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Description *
          </label>
          <Textarea
            id="description"
            name="description"
            className="w-full min-h-[100px]"
            placeholder="Enter event description"
            required
          />
        </div>

        {/* Image URL */}
        <div>
          <label
            htmlFor="pictureUrl"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Event Image URL
          </label>
          <Input
            id="pictureUrl"
            name="pictureUrl"
            type="url"
            className="w-full"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        {/* registration fee and capacity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="registrationFee"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Registration Fee *
            </label>
            <Input
              id="registrationFee"
              name="registrationFee"
              type="number"
              className="w-full bg-gray-100 dark:bg-gray-700"
              required
            />
          </div>

          <div>
            <label
              htmlFor="capacity"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Capacity *
            </label>
            <Input
              id="capacity"
              name="capacity"
              type="number"
              className="w-full bg-gray-100 dark:bg-gray-700"
              required
            />
          </div>
        </div>

        {/* organizer */}
        <div>
          <label
            htmlFor="organizer"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Organizer *
          </label>
          <Input
            id="organizer"
            name="organizer"
            type="text"
            className="w-full bg-gray-100 dark:bg-gray-700"
            required
          />
        </div>

        {/* Creator Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="creatorEmail"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Creator Email
            </label>
            <Input
              id="creatorEmail"
              name="creatorEmail"
              type="email"
              value={user?.email}
              className="w-full bg-gray-100 dark:bg-gray-700"
              readOnly
            />
          </div>

          <div>
            <label
              htmlFor="creatorName"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Creator Name
            </label>
            <Input
              id="creatorName"
              name="creatorName"
              type="text"
              value={user?.displayName}
              className="w-full bg-gray-100 dark:bg-gray-700"
              readOnly
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white cursor-pointer"
          >
            Create Event
          </Button>
        </div>
      </form>
    </div>
  );
}
