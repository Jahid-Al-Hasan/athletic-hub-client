import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  UsersIcon,
  TrophyIcon,
  SettingsIcon,
  UserPlusIcon,
  CreditCardIcon,
  BookOpenIcon,
  UserPlus2Icon,
  UserIcon,
} from "lucide-react";
import { Link } from "react-router";

export default function AboutPage() {
  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4">
        {/*  */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              Complete Event Management Solution
            </h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              Everything you need to create, manage, and monetize athletic
              events
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-6">
            <Card className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <CalendarIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Event Creation</h3>
                  <p className="text-muted-foreground">
                    Set up events with custom rules, schedules, and registration
                    options
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <UserPlus2Icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">User Profiles</h3>
                  <p className="text-muted-foreground">
                    Athletes create profiles with performance history and
                    credentials
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <CreditCardIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    Registration & Payments
                  </h3>
                  <p className="text-muted-foreground">
                    Secure payment processing with flexible fee structures
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <SettingsIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    Event Dashboard
                  </h3>
                  <p className="text-muted-foreground">
                    Real-time management of participants, schedules, and
                    communications
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <TrophyIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    Results & Analytics
                  </h3>
                  <p className="text-muted-foreground">
                    Live scoring, standings, and post-event reports
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <BookOpenIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Easy Booking</h3>
                  <p className="text-muted-foreground">
                    One-click registration for participants with automatic
                    confirmations
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Athletichub team */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              Meet the AthleticHub <br className="md:hidden" /> Team
            </h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              Passionate sports enthusiasts and technology experts
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 lg:gap-6">
            {TEAM_MEMBERS.map((member) => (
              <Card
                key={member.id}
                className="text-center p-2 lg:p-6 hover:shadow-md transition-shadow"
              >
                <div className="w-20 h-20 mx-auto mb-1 lg:mb-4 rounded-full bg-primary/10 overflow-hidden flex items-center justify-center">
                  <UserIcon className="h-10 w-10 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-muted-foreground lg:mb-2">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* organize your next event card */}
        <section className="text-center">
          <Card className="p-8">
            <h2 className="text-xl lg:text-2xl font-bold">
              Ready to Organize Your Next Event?
            </h2>
            <p className="text-sm lg:text-base text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join hundreds of event organizers using AthleticHub for seamless
              competition management
            </p>
            <Link to="/create-event">
              <Button className="cursor-pointer">
                Create Your First Event
              </Button>
            </Link>
          </Card>
        </section>
      </div>
    </div>
  );
}

const TEAM_MEMBERS = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Founder & CEO",
    bio: "Former NCAA athlete and event organizer",
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "CTO",
    bio: "Sports tech specialist with 8+ years experience",
  },
  {
    id: 3,
    name: "Jamal Williams",
    role: "Head of Product",
    bio: "Created tournament systems for major leagues",
  },
  {
    id: 4,
    name: "Emily Park",
    role: "Customer Success",
    bio: "Ensures seamless event experiences",
  },
];
