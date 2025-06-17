import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router";
import EventCard from "../../components/EventCard/EventCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import PageTitle from "../../utils/PageTitle/PageTitle";

const AllEvents = () => {
  const allEvents = useLoaderData();
  const [events, setEvents] = useState(allEvents);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setEvents(allEvents);
    } else {
      const filtered = allEvents.filter(
        (event) =>
          event?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event?.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setEvents(filtered);
    }
  }, [searchTerm, allEvents]);

  return (
    <div className="px-4 py-8">
      <PageTitle title="Events" />
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <h2 className="text-3xl font-bold tracking-tight">All Events</h2>

          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search events..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {events?.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {searchTerm.trim() === ""
                ? "No events available"
                : `No events found for "${searchTerm}"`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event?._id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllEvents;
