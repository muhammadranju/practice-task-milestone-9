import toast from "react-hot-toast";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { useNavigate } from "react-router-dom";
const ResetPassword = () => {
  const navigate = useNavigate();
  const handelResetPassword = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    try {
      await sendPasswordResetEmail(auth, email);
      console.log("reset password");
      toast.success("Reset Password Successful");
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };
  return (
    <div className="hero  min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Rest Password now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handelResetPassword} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email Address</span>
              </label>
              <input
                type="email"
                placeholder="email "
                name="email"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-primary">Send Reset Link</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
