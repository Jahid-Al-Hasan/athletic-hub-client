import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router";
import EventCard from "../../components/EventCard/EventCard";
import { Input } from "@/components/ui/input";
import { ArrowDownUp, Search } from "lucide-react";
import PageTitle from "../../utils/PageTitle/PageTitle";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AllEvents = () => {
  const allEvents = useLoaderData();
  const [events, setEvents] = useState(allEvents);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortby, setSortby] = useState("Date");

  useEffect(() => {
    let filteredEvents = [...allEvents];

    if (searchTerm.trim() !== "") {
      filteredEvents = filteredEvents.filter(
        (event) =>
          event?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event?.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortby === "newest") {
      filteredEvents.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortby === "oldest") {
      filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortby === "priceLowHigh") {
      filteredEvents.sort((a, b) => a.registrationFee - b.registrationFee);
    } else if (sortby === "priceHighLow") {
      filteredEvents.sort((a, b) => b.registrationFee - a.registrationFee);
    } else if (sortby === "nameAZ") {
      filteredEvents.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortby === "nameZA") {
      filteredEvents.sort((a, b) => b.name.localeCompare(a.name));
    }

    setEvents(filteredEvents);
  }, [allEvents, searchTerm, sortby]);

  return (
    <div className="px-4 py-8">
      <PageTitle title="Events" />
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <h2 className="text-2xl font-bold tracking-tight">All Events</h2>

          <div className="flex flex-col-reverse md:flex-row gap-2">
            <div className="relative max-w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4  text-primary" />
              <Input
                type="text"
                placeholder="Search events..."
                className="pl-10 border-primary border rounded-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <Select onValueChange={(value) => setSortby(value)}>
                <SelectTrigger className="border border-primary rounded-none">
                  <ArrowDownUp />
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="newest">Date (Newest First)</SelectItem>
                    <SelectItem value="oldest">Date (Oldest First)</SelectItem>
                    <SelectItem value="priceLowHigh">
                      Registration Fee (Low → High)
                    </SelectItem>
                    <SelectItem value="priceHighLow">
                      Registration Fee (High → Low)
                    </SelectItem>
                    <SelectItem value="nameAZ">Name (A → Z)</SelectItem>
                    <SelectItem value="nameZA">Name (Z → A)</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
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
