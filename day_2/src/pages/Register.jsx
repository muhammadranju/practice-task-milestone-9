import { NavLink } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [isError, setIsError] = useState("");
  const [success, setSuccess] = useState("");
  const [eye, setEye] = useState(true);
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handelRegister = async (e) => {
    setSuccess("");
    setIsError("");
    try {
      e.preventDefault();
      if (e.target.password.value.length === 0 || e.target.email.value === "") {
        return setIsError("All fields are required");
      }
      if (e.target.password.value.length < 6) {
        return setIsError("Password should be at least 6 characters");
      } else if (!passwordRegex.test(e.target.password.value)) {
        return setIsError(
          "Password should contain at least one uppercase letter, one lowercase letter, one number and one special character"
        );
      }

      const userData = await createUserWithEmailAndPassword(
        auth,
        e.target.email.value,
        e.target.password.value
      );
      console.log(userData);
      setSuccess("User Created Successfully!");
    } catch (error) {
      console.log(error.code);
      console.log(error.message);
      setIsError(error.message);
    }
  };
  const handelEyeOpen = () => {
    setEye(!eye);
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
            {isError && (
              <div className="alert alert-error">
                <div>
                  <span>{isError}</span>
                </div>
              </div>
            )}
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
                    onClick={handelEyeOpen}
                  />
                ) : (
                  <FaEye className="cursor-pointer" onClick={handelEyeOpen} />
                )}
              </label>
            </div>
            <div className="form-control mt-6">
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
            {success && (
              <div className="alert alert-success shadow-lg">
                <div>
                  <span>{success}</span>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
