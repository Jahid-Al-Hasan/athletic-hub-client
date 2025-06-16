import React from "react";
import { useLoaderData } from "react-router";
import EventCard from "../../components/EventCard/EventCard";

const AllEvents = () => {
  const events = useLoaderData();
  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight">All Events</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events &&
            events?.length !== 0 &&
            events.map((event) => <EventCard key={event?._id} event={event} />)}
        </div>
      </div>
    </div>
  );
};

export default AllEvents;
