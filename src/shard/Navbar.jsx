import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { FaBars } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import usePublic from "../hooks/usePublic";

const Navbar = () => {
  const { user } = useAuth();
  const [theme, setTheme] = useState("light");
  const axiosPublic = usePublic();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const {
    data: formars = {},
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", user?.uid],
    enabled: !!user?.uid,
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/${user?.uid}`);
      return res.data;
    },
  });
  useEffect(() => {
    if (user && !formars?.role) {
      refetch();
    }
  }, [user, formars, refetch]);

  const links = (
    <>
      <li>
        <NavLink
          className="hover:bg-base-200 p-2 font-bold   hover:rounded-lg"
          style={({ isActive, isTransiTion }) => {
            return {
              fontWeight: isActive ? "bold" : "",
              color: isActive ? "#F53F5E" : "",
              background: isActive ? "transparent" : "",
              borderBottom: isActive ? "4px solid #F53F5E" : "",
              viewTimelineName: isTransiTion ? "silder" : "",
            };
          }}
          to="/"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className="hover:bg-base-200 p-2 font-bold   hover:rounded-lg"
          style={({ isActive, isTransiTion }) => {
            return {
              fontWeight: isActive ? "bold" : "",
              color: isActive ? "#F53F5E" : "",
              background: isActive ? "transparent" : "",
              borderBottom: isActive ? "4px solid #F53F5E" : "",
              viewTimelineName: isTransiTion ? "silder" : "",
            };
          }}
          to="/surveys"
        >
          Surveys
        </NavLink>
      </li>

      <li>
        <NavLink
          className="hover:bg-base-200 p-2 font-bold   hover:rounded-lg"
          style={({ isActive, isTransiTion }) => {
            return {
              fontWeight: isActive ? "bold" : "",
              color: isActive ? "#F53F5E" : "",
              background: isActive ? "transparent" : "",
              borderBottom: isActive ? "4px solid #F53F5E" : "",
              viewTimelineName: isTransiTion ? "silder" : "",
            };
          }}
          to="/pricing"
        >
          Pro-Membership
        </NavLink>
      </li>
    </>
  );
  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    setTheme(localTheme);
    if (localTheme) {
      document.querySelector("html").setAttribute("data-theme", localTheme);
    }
  }, [theme]);
  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
      document.querySelector("html").setAttribute("data-theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
      document.querySelector("html").setAttribute("data-theme", "light");
      setTheme("light");
    }
  };

  const handleDropdownToggle = () => {
    setDropdownOpen((prev) => !prev);
  };
  if (error) {
    console.log(error);
  }
  return (
    <div>
      <div className="navbar bg-base-200 fixed z-50 top-0 shadow-lg">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              onClick={handleDropdownToggle}
              className="btn btn-ghost lg:hidden"
            >
              <FaBars size={25} />
            </div>
            {dropdownOpen && (
              <ul
                tabIndex={0}
                className="menu  dropdown-content mt-3 space-y-5 z-50 p-2 shadow bg-base-100 rounded-box w-[400px]"
              >
                {links}
              </ul>
            )}
          </div>
          <p className="text-xl md:text-4xl font-bold">
            Survey<span className="text-rose-500">Sense</span>{" "}
          </p>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-bold text-lg space-x-7">
            {links}
          </ul>
        </div>
        <div className="navbar-end space-x-2 md:space-x-5">
          <label className="cursor-pointer grid place-items-center">
            <input
              type="checkbox"
              onChange={handleToggle}
              checked={theme === "dark"}
              className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2"
            />
            <svg
              className="col-start-1 row-start-1 stroke-base-100 fill-base-100"
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
            </svg>
            <svg
              className="col-start-2 row-start-1 stroke-base-100 fill-base-100"
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </label>
          {/* user drop down */}
          <details className="dropdown  dropdown-end">
            <summary className="m-1 btn space-x-2 rounded-full hover:shadow-xl hover:bg-transparent bg-transparent">
              <FaBars size={20} />
              <img
                className="w-10 h-10 rounded-full"
                src={user?.photoURL || "https://i.ibb.co/kqv0XFH/user.png"}
                alt=""
              />
            </summary>

            <ul className="p-2 shadow menu dropdown-content z-10 bg-base-100 rounded-box w-52">
              {user ? (
                <>
                  {isLoading && !formars.role && user ? (
                   <div className="flex justify-center"> <span className="loading loading-spinner loading-md"></span></div>
                  ) : (
                    <Link
                      to={`/dashboard/${formars?.role}`}
                      className="btn mb-2 text-rose-500 border-rose-500 bg-transparent hover:bg-rose-500 hover:text-white"
                    >
                      Dashboard
                    </Link>
                  )}
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="btn mb-2 text-rose-500 border-rose-500 bg-transparent hover:bg-rose-500 hover:text-white"
                  >
                    Login
                  </Link>
                  <Link
                    to="/singup"
                    className="btn text-rose-500 border-rose-500 bg-transparent hover:bg-rose-500 hover:text-white"
                  >
                    SingUp
                  </Link>
                </>
              )}
            </ul>
          </details>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
