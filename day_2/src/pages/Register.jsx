import { NavLink, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { toast } from "react-toastify";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();

  const [isError, setIsError] = useState("");
  const [success, setSuccess] = useState("");
  const [eye, setEye] = useState(true);

  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const uppercaseLetter = /(?=.*[A-Z])/;
  const lowercaseLetter = /(?=.*[a-z])/;
  const digitLetter = /(?=.*[0-9])/;
  const specialLetter = /(?=.*[\W])/;

  const handelRegister = async (e) => {
    setIsError("");
    setSuccess("");
    setUser({
      fullName: "",
      email: "",
      password: "",
    });
    try {
      e.preventDefault();

      const accept = e.target.terms.checked;

      const fullName = e.target.fullName.value;
      const email = e.target.email.value;
      const passwordField = e.target.password.value;

      if (!fullName) return setUser({ fullName: "Full Name is required!" });
      if (!email) return setUser({ email: "Email is required!" });
      if (!passwordField) return setUser({ password: "Password is required!" });

      const validatePassword = (password, accept) => {
        if (password.length < 6)
          return "Password should be at least 6 characters!";
        if (!uppercaseLetter.test(password))
          return "Password must add at least one Uppercase letter!";
        if (!lowercaseLetter.test(password))
          return "Password must be at least one Lowercase letter!";
        if (!digitLetter.test(password))
          return "You must be provide at least one Number!";
        if (!specialLetter.test(password))
          return "Special character must be provided!";
        if (!accept)
          return "You must accept the terms and conditions to register!";

        return ""; // No error if all validations pass
      };

      const errorMessage = validatePassword(e.target.password.value, accept);
      if (errorMessage) {
        // toast.error(errorMessage);
        setIsError(errorMessage);
        return;
      }

      const userData = await createUserWithEmailAndPassword(
        auth,
        e.target.email.value,
        e.target.password.value
      );

      if (userData) {
        navigate("/login");
        console.log(userData);
        setSuccess("User Created Successfully!");
        toast.success(success);
        await sendEmailVerification(auth.currentUser);
      }

      return;
    } catch (error) {
      console.log(error.code);
      console.log(error.message);
      // toast.error(error.message);
      setIsError(error.message);
    }
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
      // toast.error(error.message);
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
          <h1 className="text-5xl font-bold">Register now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handelRegister} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                placeholder="Your Name"
                name="fullName"
                className="input input-bordered"
              />
              {user && (
                <label className={`label ${user.fullName ? "" : "hidden"}`}>
                  <span className="label-text text-red-600 font-semibold">
                    {user.fullName}
                  </span>
                </label>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                name="email"
                className="input input-bordered"
              />
              {user && (
                <label className={`label ${user.email ? "" : "hidden"}`}>
                  <span className="label-text text-red-600 font-semibold">
                    {user.email}
                  </span>
                </label>
              )}
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
              {user && (
                <label className={`label ${user.password ? "" : "hidden"}`}>
                  <span className="label-text text-red-600 font-semibold">
                    {user.password}
                  </span>
                </label>
              )}

              {isError && (
                <label className={`label ${isError ? "" : "hidden"}`}>
                  <span className="label-text text-red-600 font-semibold">
                    {isError}
                  </span>
                </label>
              )}
            </div>
            <div className="form-control mt-1">
              <button className="btn btn-primary">Register</button>
              <label className="label float-right">
                <NavLink
                  to={"/login"}
                  className="label-text-alt link link-hover"
                >
                  Already have an account?
                </NavLink>
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Accept Terms and Conditions</span>
                <input
                  type="checkbox"
                  name="terms"
                  className="checkbox checkbox-primary"
                />
              </label>
            </div>
            {/* {isError && (
              <div className="alert alert-error">
                <div>
                  <span>{isError}</span>
                </div>
              </div>
            )} */}
            <div className="flex  justify-center items-center gap-2">
              <button className="btn bg-green-400" onClick={handelGoogleSignIn}>
                Google SinUp
              </button>
              <button onClick={handelGithubSignIn} className="btn bg-gray-400">
                Github SinUp
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
