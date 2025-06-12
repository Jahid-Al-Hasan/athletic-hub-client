import { Menu, Moon, Sun, User } from "lucide-react";
import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { ThemeContext } from "../../provider/ThemeContext";

const Navbar = () => {
  const user = true;
  const { theme, setTheme } = useContext(ThemeContext);

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/events">Events</NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/book-event">Book Event</NavLink>
          </li>
          <li>
            <NavLink to="/my-bookings">My Bookings</NavLink>
          </li>
          {user?.role === "organizer" && (
            <li>
              <NavLink to="/manage-events">Manage Events</NavLink>
            </li>
          )}
        </>
      )}
    </>
  );

  const handleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <nav>
      <div className="navbar px-2 sm:px-8">
        {/* Mobile menu button */}
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <Menu />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {links}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost normal-case text-xl px-0">
            <div className="flex items-center">
              <h2 className="text-2xl font-bold flex items-center">
                <span className="text-primary">Athletic</span>Hub
              </h2>
            </div>
          </Link>
        </div>

        {/* Desktop menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>

        {/* User section */}
        <div className="navbar-end space-x-3">
          <div>
            {user ? (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    {user?.profilePic ? (
                      <img
                        src={user?.profilePic}
                        alt="User profile"
                        title={user?.name}
                      />
                    ) : (
                      <div className="flex justify-center items-center">
                        <User className="mt-1" />
                      </div>
                    )}
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link className="justify-between">Profile</Link>
                  </li>
                  <li>
                    <Link to="/book-event">Book Event</Link>
                  </li>
                  <li>
                    <Link to="/my-bookings">My Bookings</Link>
                  </li>
                  {user?.role === "organizer" && (
                    <li>
                      <Link to="/manage-events">Manage Events</Link>
                    </li>
                  )}
                  <li>
                    <button>Logout</button>
                  </li>
                </ul>
              </div>
            ) : (
              <button className="btn btn-primary">Login</button>
            )}
          </div>
          <div onClick={() => handleTheme()}>
            {theme !== "light" ? <Sun /> : <Moon />}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
