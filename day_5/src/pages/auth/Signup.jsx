import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

const Signup = () => {
  const { signupController, user } = useContext(AuthContext);
  const navigate = useNavigate();
  if (user) return navigate("/profile");

  const handelSignupSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    console.log("submit", email, password, name, photo);
    try {
      await signupController(email, password, name, photo);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handelSignupSubmit} className="mt-20">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-xl xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <p className="text-xl font-bold leading-tight text-center tracking-tight text-gray-900 md:text-3xl">
              Signup your account
            </p>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Your Name
              </label>
              <input
                placeholder="Enter your name"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded block w-full p-3.5"
                id="name"
                name="name"
                type="text"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Photo URL
              </label>
              <input
                placeholder="Enter your photo url"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded block w-full p-3.5"
                id="photo"
                type="text"
                name="photo"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Email address
              </label>
              <input
                placeholder="Enter your email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded block w-full p-3.5"
                id="email"
                name="email"
                type="text"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Password
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded block w-full p-3.5"
                placeholder="••••••••"
                id="password"
                name="password"
                type="password"
              />
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  className="w-4 h-4 border border-gray-300 rounded  focus:ring-3 focus:ring-primary-300 bg-gray-700  focus:ring-primary-600 ring-offset-gray-800"
                  type="checkbox"
                  aria-describedby="terms"
                  id="terms"
                />
              </div>
              <div className="ml-3 text-sm">
                <label className="font-light text-gray-500 ">
                  I accept the
                  <a
                    href="#"
                    className="font-medium text-primary-600 hover:underline text-primary-500"
                  >
                    Terms and Conditions
                  </a>
                </label>
              </div>
            </div>
            <button className="w-full btn btn-neutral   rounded" type="submit">
              Sign up
            </button>
            <div className="ml-3 text-sm text-center">
              <label className=" text-gray-500 ">
                Don&rsquo;t have an account? &nbsp;
                <Link
                  to="/login"
                  className="font-medium text-primary-600 hover:underline text-primary-500"
                >
                  Login here
                </Link>
              </label>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Signup;
