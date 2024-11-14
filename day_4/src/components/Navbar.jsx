import { Link, NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const Navbar = () => {
  const { user, loading } = useContext(AuthContext);
  const Links = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink to={`/profile`}>Profile</NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard"}>Dashboard</NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink to={"/team"}>Team</NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar mt-5">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {Links}
          </ul>
        </div>
        <NavLink to={"/"} className="btn btn-ghost text-4xl font-black">
          PrivateRoute
        </NavLink>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{Links}</ul>
      </div>
      <div className="navbar-end">
        {loading ? (
          <div className="flex gap-3 ">
            <div className="loading loading-ball loading-lg"></div>
          </div>
        ) : (
          <>
            {!user && (
              <div className="flex gap-3 ">
                <Link to={"/login"} className="btn btn-accent">
                  Login
                </Link>
                <Link to={"/register"} className="btn btn-outline">
                  Register
                </Link>
              </div>
            )}
          </>
        )}

        {user && (
          <Link to={"/profile"} className="text-4xl ">
            <div className="flex gap-1 justify-center items-center">
              <FaUserCircle />
              <span className="text-lg font-semibold">{user?.displayName}</span>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
