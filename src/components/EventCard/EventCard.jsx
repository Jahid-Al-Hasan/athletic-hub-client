import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { CalendarDays, MapPin } from "lucide-react";
import { Link } from "react-router";

const EventCard = ({ event }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div>
      <Card
        key={event._id}
        className="group hover:shadow-xl transition-all duration-300 overflow-hidden border border-border/50 hover:border-primary/30 h-full pt-0"
      >
        <CardHeader className="relative p-0">
          {/* Image with overlay effect */}
          <div className="relative overflow-hidden">
            <img
              src={event?.pictureUrl === "" ? null : event.pictureUrl}
              alt={event?.name}
              className="w-full h-48 object-cover object-center"
            />
            {/* Gradient overlay */}
            {/* <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" /> */}
          </div>

          {/* Category badge */}
          <span className="absolute top-3 right-3 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full shadow-sm">
            {event?.category}
          </span>
        </CardHeader>

        <CardContent className="pt-4 px-5">
          <div className="flex justify-between items-start mb-1">
            <h3 className="text-xl font-bold tracking-tight line-clamp-1">
              {event?.name}
            </h3>
            <span className="text-lg font-semibold text-primary whitespace-nowrap">
              ${event?.registrationFee}
            </span>
          </div>

          {/* <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {event?.description}
          </p> */}

          <div className="space-y-3 mt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-secondary">
                <CalendarDays className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Date</p>
                <p className="font-medium">{formatDate(event?.date)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-secondary">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Location</p>
                <p className="font-medium line-clamp-1">{event?.location}</p>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="px-5 pb-5">
          <Button
            asChild
            className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary transition-all shadow-lg hover:shadow-primary/20"
          >
            <Link to={`/event/${event?._id}`}>View Details</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EventCard;
