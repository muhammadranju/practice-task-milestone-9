import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

const Login = () => {
  const navigate = useNavigate();
  const { loginController, user } = useContext(AuthContext);
  if (user) return navigate("/");
  const handelLoginSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    await loginController(email, password);
    e.preventDefault();
    // navigate("/");
    console.log("submit");
  };

  return (
    <form onSubmit={handelLoginSubmit} className="mt-20">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-xl xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <p className="text-xl font-bold leading-tight text-center tracking-tight text-gray-900 md:text-3xl">
              Login your account
            </p>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Email address
              </label>
              <input
                placeholder="JohnDoe"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded block w-full p-3.5"
                id="email"
                name="email"
                type="text"
              />
            </div>
            <div>
              <div className="text-sm  flex items-center justify-between">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Password
                </label>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  <Link
                    to="/forgot-password"
                    className="font-medium text-primary-600 hover:underline text-primary-500"
                  >
                    Forgot password?
                  </Link>
                </label>
              </div>

              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded block w-full p-3.5"
                placeholder="••••••••"
                id="password"
                name="password"
                type="password"
              />
            </div>

            <button className="w-full btn btn-neutral   rounded" type="submit">
              Login
            </button>
            <div className="ml-3 text-sm text-center">
              <label className=" text-gray-500 ">
                Don&rsquo;t have an account? &nbsp;
                <Link
                  to="/signup"
                  className="font-medium text-primary-600 hover:underline text-primary-500"
                >
                  Sign up here
                </Link>
              </label>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
