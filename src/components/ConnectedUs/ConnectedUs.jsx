import React from "react";
import { motion } from "framer-motion";
import club_1 from "../../assets/clubLogos/club-1.png";
import club_2 from "../../assets/clubLogos/club-2.png";
import club_3 from "../../assets/clubLogos/club-3.png";
import club_4 from "../../assets/clubLogos/club-4.png";
import club_5 from "../../assets/clubLogos/club-5.png";
import club_6 from "../../assets/clubLogos/club-6.png";
import club_7 from "../../assets/clubLogos/club-7.png";
import club_8 from "../../assets/clubLogos/club-8.png";
import club_9 from "../../assets/clubLogos/club-9.png";
import club_10 from "../../assets/clubLogos/club-10.png";

const clubs = [
  { id: 1, logo: club_1, name: "Club 1" },
  { id: 2, logo: club_2, name: "Club 2" },
  { id: 3, logo: club_3, name: "Club 3" },
  { id: 4, logo: club_4, name: "Club 4" },
  { id: 5, logo: club_5, name: "Club 5" },
  { id: 6, logo: club_6, name: "Club 6" },
  { id: 7, logo: club_7, name: "Club 7" },
  { id: 8, logo: club_8, name: "Club 8" },
  { id: 9, logo: club_9, name: "Club 9" },
  { id: 10, logo: club_10, name: "Club 10" },
];

const duplicatedClubs = [...clubs, ...clubs];

const ConnectedUs = () => {
  return (
    <div className="my-12 overflow-hidden px-4">
      <h1 className="text-center text-2xl lg:text-3xl font-bold mb-8">
        Connected with Us
      </h1>

      <div className="relative h-40 w-full overflow-hidden">
        <motion.div
          className="flex absolute left-0 gap-8 h-full items-center"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {duplicatedClubs.map((club, index) => (
            <div
              key={`${club.id}-${index}`}
              className="flex-shrink-0 h-24 w-24 flex justify-center items-center"
            >
              <img
                src={club.logo}
                alt={`${club.name} logo`}
                className="object-cover h-full w-full"
                title={club.name}
              />
            </div>
          ))}
        </motion.div>

        <div className="pointer-events-none absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-background to-transparent"></div>
        <div className="pointer-events-none absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-background to-transparent"></div>
      </div>
    </div>
  );
};

export default ConnectedUs;
