import { Outlet } from "react-router-dom";
import Navbar from "../shard/Navbar";
import Footer from "../shard/Footer";

const MainLayout = () => {
  return (
    <div className="">
      <Navbar />
      <div className="mt-[68px]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
