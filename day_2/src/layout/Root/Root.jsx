import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Root = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <div className="min-h-[calc(100vh-288px)]">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Root;
