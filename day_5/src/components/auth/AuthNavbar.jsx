import { Link } from "react-router-dom";
import userIcon from "../../assets/user.png";
const AuthNavbar = () => {
  return (
    <div className="navbar font-medium text-gray-600">
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
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <a>About</a>
            </li>

            <li>
              <a>Career</a>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl"></a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <a>About</a>
          </li>

          <li>
            <a>Career</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end gap-2">
        <img src={userIcon} alt="" />
        <Link to="/login">
          <button className="btn btn-neutral rounded-none px-8">Login</button>
        </Link>
      </div>
    </div>
  );
};

export default AuthNavbar;
