import { Outlet } from "react-router-dom";
import Navbar from "../shard/Navbar";
import Footer from "../shard/Footer";


const DashBoard = () => {
    return (
        <div className="">
        <Navbar />
        <div className="mt-[68px] min-h-[calc(100vh-252px)]">
          <Outlet />
        </div>
        <Footer />
      </div>
    );
};

export default DashBoard;