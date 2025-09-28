import { Menu, Moon, Sun, User } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
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
  const location = useLocation();

  const isHome = location.pathname === "/";

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!isHome) return;

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const links = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `text-base font-medium transition-colors hover:text-white/70 ${
            isActive ? "text-white/70" : "text-white"
          }`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/events"
        className={({ isActive }) =>
          `text-base font-medium transition-colors hover:text-white/70 ${
            isActive ? "text-white/70" : "text-white"
          }`
        }
      >
        Events
      </NavLink>
      {user && (
        <>
          <NavLink
            to="/create-event"
            className={({ isActive }) =>
              `text-base font-medium transition-colors hover:text-white/70 ${
                isActive ? "text-white/70" : "text-white"
              }`
            }
          >
            Create Event
          </NavLink>
          <NavLink
            to="/manage-events"
            className={({ isActive }) =>
              `text-base font-medium transition-colors hover:text-white/70 ${
                isActive ? "text-white/70" : "text-white"
              }`
            }
          >
            Manage Events
          </NavLink>
          <NavLink
            to="/my-bookings"
            className={({ isActive }) =>
              `text-base font-medium transition-colors hover:text-white/70 ${
                isActive ? "text-white/70" : "text-white"
              }`
            }
          >
            My Bookings
          </NavLink>
        </>
      )}
      <NavLink
        to="/About"
        className={({ isActive }) =>
          `text-base font-medium transition-colors hover:text-white/70 ${
            isActive ? "text-white/70" : "text-white"
          }`
        }
      >
        About
      </NavLink>
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
    <nav
      className={`fixed top-0 z-50 w-full backdrop-blur-2xl ${
        isHome
          ? scrolled
            ? "bg-primary dark:bg-black/30 shadow-md"
            : "bg-transparent"
          : "bg-primary dark:bg-black/30"
      }`}
    >
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          {/* Mobile menu button */}
          <div className="flex items-center gap-4 lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="flex flex-col gap-4 bg-black/60 pt-10 w-44 pl-3"
              >
                {links}
              </SheetContent>
            </Sheet>
          </div>

          {/* nav logo */}
          <div>
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="logo" className="w-6 lg:w-7" />
              <h4 className="text-xl lg:text-2xl font-bold text-chart-5">
                AthleticHub
              </h4>
            </Link>
          </div>
        </div>

        {/* Desktop menu */}
        <div className="hidden items-center gap-6 lg:flex">
          <div className="flex items-center gap-6">{links}</div>
        </div>

        {/* User section */}
        <div className="flex items-center gap-2 lg:gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleTheme}
            className="h-9 w-9 border-white border text-white hover:bg-primary cursor-pointer rounded-sm"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>

          {user ? (
            <DropdownMenu>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-full border-white border cursor-pointer"
                    >
                      {user.photoURL || user.photoURL !== null ? (
                        <img
                          src={user.photoURL}
                          alt="User profile"
                          className="h-full w-full rounded-full object-cover"
                        />
                      ) : (
                        <User className="h-5 w-5" />
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-base ">{user?.displayName || "Profile"}</p>
                </TooltipContent>
              </Tooltip>

              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/my-profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild className="bg-white text-black hover:bg-white/90">
              <Link to="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
