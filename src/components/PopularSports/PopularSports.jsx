import { Badge } from "@/components/ui/badge";
import { Dumbbell, Footprints, Trophy, WavesLadder } from "lucide-react";

export const PopularSports = () => {
  const sports = [
    {
      id: 1,
      name: "Running",
      icon: <Footprints className="h-8 w-8" />,
      events: 42,
      category: "Track",
    },
    {
      id: 2,
      name: "Swimming",
      icon: <WavesLadder className="h-8 w-8" />,
      events: 28,
      category: "Aquatics",
    },
    {
      id: 3,
      name: "Weightlifting",
      icon: <Dumbbell className="h-8 w-8" />,
      events: 15,
      category: "Strength",
    },
    {
      id: 4,
      name: "Competitions",
      icon: <Trophy className="h-8 w-8" />,
      events: 36,
      category: "Multi-sport",
    },
  ];

  return (
    <section className="py-12 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 dark:text-white">
          Popular Sports Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sports.map((sport) => (
            <div
              key={sport.id}
              className="border rounded-lg p-6 hover:shadow-md transition-shadow dark:border-gray-700"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 mx-auto dark:bg-blue-900/50">
                {sport.icon}
              </div>
              <h3 className="text-xl font-semibold text-center mb-2 dark:text-white">
                {sport.name}
              </h3>
              <div className="flex justify-center mb-3">
                <Badge
                  variant="outline"
                  className="dark:border-gray-600 dark:text-gray-300"
                >
                  {sport.category}
                </Badge>
              </div>
              <p className="text-center text-gray-600 dark:text-gray-400">
                {sport.events}+ upcoming events
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
