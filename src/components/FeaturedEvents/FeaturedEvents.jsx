import { Button } from "@/components/ui/button";

import { useEffect, useState } from "react";
import { Link } from "react-router";
import EventCard from "../EventCard/EventCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const FeaturedEvents = () => {
  const [events, setEvents] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get("/events")
      .then((res) => setEvents(res.data))
      .catch((err) => console.error("Failed to load events:", err));
  }, [axiosSecure]);
  // Sort events by date (ascending)
  const sortedEvents = [...events]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 6); // Take first 6 events

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Featured Events</h2>
          <Button asChild variant="outline">
            <Link to="/events">See All Events</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedEvents.map((event) => (
            <EventCard key={event?._id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;
