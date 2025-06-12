import { Menu, Moon, Sun, User } from "lucide-react";
import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { ThemeContext } from "../../provider/ThemeContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AuthContext } from "../../provider/AuthContext";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const { theme, setTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const links = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `text-sm font-medium transition-colors hover:text-primary ${
            isActive ? "text-primary" : "text-muted-foreground"
          }`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/events"
        className={({ isActive }) =>
          `text-sm font-medium transition-colors hover:text-primary ${
            isActive ? "text-primary" : "text-muted-foreground"
          }`
        }
      >
        Events
      </NavLink>
      {user && (
        <>
          <NavLink
            to="/book-event"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors hover:text-primary ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`
            }
          >
            Book Event
          </NavLink>
          <NavLink
            to="/my-bookings"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors hover:text-primary ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`
            }
          >
            My Bookings
          </NavLink>
          {user?.role === "organizer" && (
            <NavLink
              to="/manage-events"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`
              }
            >
              Manage Events
            </NavLink>
          )}
        </>
      )}
    </>
  );

  const handleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLogout = () => {
    logOut().then(() => {
      Swal.fire({
        title: "Logout successfully",
        icon: "success",
        draggable: true,
      });
      navigate(location?.state || "/");
    });
  };

  return (
    <nav className="sticky top-0 z-50 w-full dark:bg-black dark:text-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          {/* Mobile menu button */}
          <div className="flex items-center gap-4 lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="flex flex-col gap-4 pt-10 w-44 pl-3"
              >
                {links}
              </SheetContent>
            </Sheet>
          </div>

          {/* nav logo */}
          <div>
            <Link to="/" className="flex items-center">
              <h2 className="text-xl font-bold">
                <span className="text-primary">Athletic</span>Hub
              </h2>
            </Link>
          </div>
        </div>

        {/* Desktop menu */}
        <div className="hidden items-center gap-6 lg:flex">
          <div className="flex items-center gap-6">{links}</div>
        </div>

        {/* User section */}
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleTheme}
            className="h-9 w-9"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-full"
                    >
                      {user?.profilePic ? (
                        <img
                          src={user.profilePic}
                          alt="User profile"
                          className="h-full w-full rounded-full"
                        />
                      ) : (
                        <User className="h-5 w-5" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className=" text-xl text-amber-300">
                      {user?.displayName}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/book-event">Book Event</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/my-bookings">My Bookings</Link>
                </DropdownMenuItem>
                {user?.role === "organizer" && (
                  <DropdownMenuItem asChild>
                    <Link to="/manage-events">Manage Events</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild>
              <Link to="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
