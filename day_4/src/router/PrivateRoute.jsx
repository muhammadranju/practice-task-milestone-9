/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading)
    return (
      <div className="flex justify-center items-center mt-52">
        <span className="loading loading-ball loading-lg"></span>
      </div>
    );

  if (!user) {
    return <Navigate to="/login" replace={true} />;
  }

  return <div>{children}</div>;
};

export default PrivateRoute;
