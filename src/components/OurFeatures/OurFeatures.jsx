import React from "react";
import event from "/event.png";
import management from "/management.png";
import booking from "/booking.png";
import payment from "/payment.png";

const OurFeatures = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {/* Create Event Card */}
      <div className="border border-accent-foreground dark:border-gray-800 p-8 flex flex-col items-center text-center hover:bg-accent transition-colors duration-300 h-full">
        <div className="mb-6">
          <img
            src={event}
            alt="Calendar icon representing event creation"
            className="h-16 w-16"
          />
        </div>
        <h2 className="text-lg font-bold mb-3">Create Event</h2>
        <p className="text-sm text-muted-foreground">
          Quickly set up new events with our intuitive creation tool. Customize
          event details, dates, and requirements to match your specific needs.
        </p>
      </div>

      {/* Manage Event Card */}
      <div className="border border-accent-foreground dark:border-gray-800 p-8 flex flex-col items-center text-center hover:bg-accent transition-colors duration-300 h-full">
        <div className="mb-6">
          <img
            src={management}
            alt="Gear icon representing event management"
            className="h-16 w-16"
          />
        </div>
        <h2 className="text-lg font-bold mb-3">Manage Event</h2>
        <p className="text-sm text-muted-foreground">
          Easily update and organize all your events in one place. Modify
          details, track registrations, and make real-time adjustments as
          needed.
        </p>
      </div>

      {/* Booking Card */}
      <div className="border border-accent-foreground dark:border-gray-800 p-8 flex flex-col items-center text-center hover:bg-accent transition-colors duration-300 h-full">
        <div className="mb-6">
          <img
            src={booking}
            alt="Ticket icon representing booking"
            className="h-16 w-16"
          />
        </div>
        <h2 className="text-lg font-bold mb-3">Convenient Booking</h2>
        <p className="text-sm text-muted-foreground">
          Attendees can register with just a few clicks. Our streamlined booking
          process ensures a smooth experience for all participants.
        </p>
      </div>

      {/* Payment Card */}
      <div className="border border-accent-foreground dark:border-gray-800 p-8 flex flex-col items-center text-center hover:bg-accent transition-colors duration-300 h-full">
        <div className="mb-6">
          <img
            src={payment}
            alt="Dollar sign icon representing payments"
            className="h-16 w-16"
          />
        </div>
        <h2 className="text-lg font-bold mb-3">Secure Payments</h2>
        <p className="text-sm text-muted-foreground">
          Handle registration fees effortlessly with our integrated payment
          system. Supports multiple payment methods for attendee convenience.
        </p>
      </div>
    </div>
  );
};

export default OurFeatures;
