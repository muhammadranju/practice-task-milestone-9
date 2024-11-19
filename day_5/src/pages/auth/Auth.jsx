import { Outlet } from "react-router-dom";
import AuthNavbar from "../../components/auth/AuthNavbar";

const Auth = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto ">
        <AuthNavbar />
        <Outlet />
      </div>
    </div>
  );
};

export default Auth;
