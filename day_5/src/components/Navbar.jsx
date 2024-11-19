import { Link } from "react-router-dom";
import userIcon from "../assets/user.png";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
const Navbar = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="flex justify-between items-center">
      <div className=""></div>
      <div className="nav space-x-5">
        <Link to="/">Home</Link>
        <Link to="/career">Career</Link>
        <Link to="/about">About</Link>
      </div>
      <div className="login flex gap-2 items-center">
        <div className=" ">
          {user ? (
            <div className="flex w-14 items-center ">
              <img src={user?.photoURL} className="rounded-full" alt="" />
            </div>
          ) : (
            <img src={userIcon} alt="" />
          )}
        </div>
        {user ? (
          <Link to="/profile">
            <button className="btn btn-neutral rounded-none px-8">
              {user.displayName}
            </button>
          </Link>
        ) : (
          <Link to="/login">
            <button className="btn btn-neutral rounded-none px-8">Login</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
