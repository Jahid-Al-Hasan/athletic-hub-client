import hero_image from "/illustration-people-jogging.jpg";
import { Button } from "@/components/ui/button";
import sports_1 from "../../assets/heroSports/pexels-gonchifacello-1432039-min.jpg";
import sports_2 from "../../assets/heroSports/pexels-pixabay-47356-min.jpg";
import sports_3 from "../../assets/heroSports/pexels-pixabay-163491-min.jpg";
import sports_4 from "../../assets/heroSports/pexels-pixabay-358042-min.jpg";
import { Link } from "react-router";

const Banner = () => {
  return (
    <div className="h-[100vh] relative">
      {/* Hero image*/}
      <img
        src={hero_image}
        alt="Athletes playing basketball"
        className="h-[100vh] w-full absolute top-0 z-0 object-cover"
      />

      {/* Dark overlay*/}
      <div className="absolute inset-0 bg-black/40 z-1"></div>

      {/* Hero content */}
      <div className="relative z-10 h-[100vh] flex items-center p-4 md:p-6 lg:p-12 text-white">
        <div className="flex flex-col-reverse lg:flex-row items-center lg:justify-evenly w-full pt-20 lg:pt-0">
          {/* left */}
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4 lg:mb-6 drop-shadow-2xl text-center">
              Your Athletic Journey <br className="lg:hidden" />{" "}
              <span className="text-chart-5">Starts Here</span>
            </h1>
            <p className="text-sm md:text-base mb-4 md:mb-8 max-w-3xl text-center lg:text-left">
              Join, create, and manage sports events effortlessly. <br />{" "}
              Whether you're looking to play or organize, <br /> AthleticHub
              connects athletes and brings communities together.
            </p>

            <div className="flex flex-col lg:flex-row items-center gap-4 mb-8 w-full">
              <Link to="/events">
                <Button size="lg" className="w-fit cursor-pointer">
                  Find Events Near You
                </Button>
              </Link>
              <Link to="/create-event">
                <Button
                  size="lg"
                  className="w-fit text-black bg-white cursor-pointer"
                >
                  Create Your Event
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex justify-center lg:justify-start gap-8 mt-8 text-sm md:text-base">
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-blue-300">
                  500+
                </div>
                <div>Active Events</div>
              </div>
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-green-300">
                  10K+
                </div>
                <div>Registered Athletes</div>
              </div>
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-yellow-300">
                  50+
                </div>
                <div>Sports Categories</div>
              </div>
            </div>
          </div>

          {/* right */}
          <div className="flex justify-center items-center mb-8 lg:mb-0">
            <div className="grid grid-rows-3 gap-1 md:gap-2 lg:gap-3 -rotate-45 lg:-rotate-30 w-full max-w-[280px] md:max-w-[350px] lg:max-w-[400px]">
              {/* Top row */}
              <div className="place-self-center w-24 h-16 md:w-32 md:h-20 lg:w-48 lg:h-32 border-2 border-white/30 rounded-lg md:rounded-xl flex justify-center items-center overflow-hidden shadow-2xl hover:shadow-white/20 transition-all duration-300 transform hover:scale-105 bg-white/10 backdrop-blur-sm cursor-pointer">
                <img
                  src={sports_1}
                  alt="Sports activity 1"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Middle row (2 columns) */}
              <div className="grid grid-cols-2 gap-1 md:gap-2 lg:gap-3 place-self-center">
                <div className="w-24 h-16 md:w-32 md:h-20 lg:w-48 lg:h-32 border-2 border-white/30 rounded-lg md:rounded-xl flex justify-center items-center overflow-hidden shadow-2xl hover:shadow-white/20 transition-all duration-300 transform hover:scale-105 bg-white/10 backdrop-blur-sm cursor-pointer">
                  <img
                    src={sports_2}
                    alt="Sports activity 2"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="w-24 h-16 md:w-32 md:h-20 lg:w-48 lg:h-32 border-2 border-white/30 rounded-lg md:rounded-xl flex justify-center items-center overflow-hidden shadow-2xl hover:shadow-white/20 transition-all duration-300 transform hover:scale-105 bg-white/10 backdrop-blur-sm cursor-pointer">
                  <img
                    src={sports_3}
                    alt="Sports activity 3"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Bottom row */}
              <div className="place-self-center w-24 h-16 md:w-32 md:h-20 lg:w-48 lg:h-32 border-2 border-white/30 rounded-lg md:rounded-xl flex justify-center items-center overflow-hidden shadow-2xl hover:shadow-white/20 transition-all duration-300 transform hover:scale-105 bg-white/10 backdrop-blur-sm cursor-pointer">
                <img
                  src={sports_4}
                  alt="Sports activity 4"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
