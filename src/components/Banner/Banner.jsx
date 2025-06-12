import React from "react";

import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    title: "Slide One",
    image:
      "https://i.postimg.cc/zBqwkCFh/sophie-dupau-t-CQ-0qem-Wy-Q-unsplash.jpg",
  },
  {
    id: 2,
    title: "Slide Two",
    image:
      "https://i.postimg.cc/FRfWMt6v/mollie-sivaram-yub-Cn-XAA3-H8-unsplash.jpg",
  },
  {
    id: 3,
    title: "Slide Three",
    image: "https://i.postimg.cc/pXxNFT7n/sumup-7pake-tt89-A-unsplash.jpg",
  },
];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const getSlideClass = (index) => {
    if (index === currentIndex) return "z-20 scale-100 opacity-100";
    if (
      index === (currentIndex + 1) % slides.length ||
      index === (currentIndex - 1 + slides.length) % slides.length
    )
      return "z-10 scale-90 opacity-100";
    return "hidden";
  };
  return (
    <div>
      <div className="min-h-[calc(100vh-65px)]">
        {/* slider */}
        <div className="relative w-full flex items-center justify-center py-16">
          {/* Carousel Container */}
          <div className="relative flex items-center justify-center w-full max-w-7xl h-[600px]">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute transition-all duration-700 ease-in-out transform ${getSlideClass(
                  index
                )}`}
                style={{
                  width: index === currentIndex ? "60%" : "40%",
                  height: index === currentIndex ? "100%" : "80%",
                  left:
                    index === currentIndex
                      ? "20%"
                      : index === (currentIndex + 1) % slides.length
                      ? "65%"
                      : "0%",
                }}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover rounded-2xl shadow-lg"
                />
                <div className="absolute bottom-4 left-4 text-white text-xl font-semibold">
                  {slide.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
