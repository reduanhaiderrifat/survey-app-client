import { Outlet } from "react-router-dom";
import Navbar from "../shard/Navbar";
import Footer from "../shard/Footer";

const MainLayout = () => {
  return (
    <div className="px-2"> 
     <Navbar />
      <div className="mt-[68px] min-h-[calc(100vh-252px)]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
