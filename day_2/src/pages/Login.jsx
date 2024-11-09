import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase.config";
// import { toast } from "react-toastify";
import toast from "react-hot-toast";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [eye, setEye] = useState(true);
  const navigate = useNavigate();
  const handelLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      if (!user.user.emailVerified) {
        toast.error("Please verify your email");
        return;
      }
      console.log(user);
      if (user) {
        toast.success("Login Successful");
        navigate("/");
        return;
      } else {
        toast.error("Invalid Credentials");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
    console.log("login");
  };

  const handelGoogleSignIn = async (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    try {
      const user = await signInWithPopup(auth, provider);
      console.log(user);
      toast.success("Login Successful");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handelGithubSignIn = async (e) => {
    e.preventDefault();
    const provider = new GithubAuthProvider();
    try {
      const user = await signInWithPopup(auth, provider);
      console.log(user);
      toast.success("Login Successful");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <div className="hero  min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handelLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>

              <label className="input input-bordered flex items-center gap-2 text-gray-600">
                <input
                  type={eye ? "text" : "password"}
                  name="password"
                  placeholder="password"
                  className="grow"
                />
                {eye ? (
                  <FaEyeSlash
                    className="cursor-pointer"
                    onClick={() => setEye(!eye)}
                  />
                ) : (
                  <FaEye
                    className="cursor-pointer"
                    onClick={() => setEye(!eye)}
                  />
                )}
              </label>
              <label className="label float-right">
                <NavLink
                  to={"/reset-password"}
                  className="label-text-alt link link-hover"
                >
                  Forgot Password?
                </NavLink>
              </label>
            </div>
            <div className="form-control">
              <button className="btn btn-primary">Login</button>
              <label className="label float-right">
                <NavLink
                  to={"/register"}
                  className="label-text-alt link link-hover"
                >
                  Don&apos;t have an account?
                </NavLink>
              </label>
            </div>
            <div className="flex  justify-center items-center gap-2">
              <button className="btn bg-green-400" onClick={handelGoogleSignIn}>
                Google Login
              </button>
              <button onClick={handelGithubSignIn} className="btn bg-gray-400">
                Github Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
