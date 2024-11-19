import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Profile = () => {
  const { logoutController } = useContext(AuthContext);
  const navigate = useNavigate();
  const handelLogoutSubmit = async (e) => {
    e.preventDefault();
    console.log("submit");
    logoutController();
    navigate("/");
  };
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <h1>Welcome to my profile!</h1>
        <p>This is my profile page</p>
        <p>I am a developer</p>
        <button className="btn btn-error" onClick={handelLogoutSubmit}>
          Logout
        </button>
      </div>
    </>
  );
};

export default Profile;
