import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import "animate.css";

export const Banner = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    axios
      .get("https://athletichubserver.vercel.app/api/v1/events")
      .then((res) => setEvents(res.data.slice(0, 4)))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay, EffectFade]}
      effect="fade"
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      loop={true}
      navigation
      pagination={{
        clickable: true,
        bulletClass: "swiper-pagination-bullet bg-primary",
      }}
      className="h-[calc(100vh-80px)] w-full relative"
    >
      {events.length !== 0 &&
        events.map((event) => (
          <SwiperSlide key={event.id}>
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${event?.pictureUrl})` }}
            >
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/60" />

              {/* Content container */}
              <div className="mx-auto relative z-10 h-full flex items-center justify-center text-center">
                <div className="max-w-2xl space-y-6 text-white">
                  {/* Title */}
                  <h1 className="animate__animated animate__fadeInDownBig text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
                    {event?.name}
                  </h1>

                  {/* Subtitle */}
                  <Badge
                    variant="outline"
                    className="animate__animated animate__fadeInDownBig h-7 lg:h-8 text-sm lg:text-base border-2 border-primary"
                  >
                    <p className="text-sm md:text-base lg:text-xl text-white">
                      {event?.category}
                    </p>
                  </Badge>

                  {/* Description */}
                  <p className="animate__animated animate__fadeInUpBig text-base lg:text-lg">
                    {event?.description}
                  </p>

                  {/* Meta info */}
                  <div className="animate__animated animate__fadeInUpBig flex flex-wrap justify-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{event?.date.split("T")[0]}</span>
                    </div>
                    {/* <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{event?.date.slice("T")[1]}</span>
                    </div> */}
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{event?.location}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <Button
                    size="lg"
                    className="animate__animated animate__fadeInUpBig mt-4"
                    asChild
                  >
                    <Link to={`/event/${event?._id}`}>Book Now</Link>
                  </Button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default Banner;
