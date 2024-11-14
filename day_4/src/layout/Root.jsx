import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Root = () => {
  return (
    <div>
      <div className="container mx-auto">
        <Navbar />
        <div className="min-h-[calc(100vh-308px)] py-6 px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Root;
