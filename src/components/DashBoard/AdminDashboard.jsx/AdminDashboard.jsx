import { useState } from "react";
import { FaBars, FaUserGraduate } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import ManageUser from "./ManageUser";
import AdminPayment from "./AdminPayment";
import SurveyResponse from "./SurveyResponse";
import Profile from "../../../shard/Profile";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";

const AdminDashboard = () => {
    const [activeSection, setActiveSection] = useState("Manage user");
    const { logOut } = useAuth();
    const renderContent = () => {
      switch (activeSection) {
        case "Manage user":
          return <ManageUser />;
        case "Payment":
          return <AdminPayment />;
        case "survey responses":
          return <SurveyResponse />;
        case "profile":
          return <Profile/>;
        default:
          return <ManageUser />;
      }
    };
    const handleLogout = () => {
      logOut().then(() => {
        toast.success("Logout successfully");
      });
    };
    return (
        <div>
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content ">
            {/* Page content here */}
            <label
              htmlFor="my-drawer-2"
              className="btn bg-rose-500 text-white hover:bg-rose-500 mt-8 drawer-button lg:hidden"
            >
              <FaBars size={25} />
            </label>
            <div className=" w-full p-4">{renderContent()}</div>
          </div>
          <div className="drawer-side mt-24 lg:mt-0">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu p-4 w-80  space-y-3 min-h-[calc(100vh-283px)] lg:min-h-screen bg-base-200 text-base-content">
              {/* Sidebar content here */}
              <li>
                <button
                  className={
                    activeSection === "Manage user"
                      ? "bg-rose-500 text-white focus:bg-rose-500 focus:text-white hover:bg-rose-500 hover:text-white"
                      : "border-rose-500 border-[1px] hover:bg-transparent text-rose-500"
                  }
                  onClick={() => setActiveSection("Manage user")}
                >
                  <span className="text-lg font-bold">Manage user role</span>
                </button>
              </li>
              <li>
                <button
                  className={
                    activeSection === "Payment"
                      ? "bg-rose-500 text-white focus:bg-rose-500 focus:text-white hover:bg-rose-500 hover:text-white"
                      : "border-rose-500 border-[1px] hover:bg-transparent text-rose-500"
                  }
                  onClick={() => setActiveSection("Payment")}
                >
                  <span className="text-lg font-bold">User Payments</span>
                </button>
              </li>
              <li>
                <button
                  className={
                    activeSection === "survey responses"
                      ? "bg-rose-500 text-white focus:bg-rose-500 focus:text-white hover:bg-rose-500 hover:text-white"
                      : "border-rose-500 border-[1px] hover:bg-transparent text-rose-500"
                  }
                  onClick={() => setActiveSection("survey responses")}
                >
                  <span className="text-lg font-bold">Survey Responses</span>
                </button>
              </li>
  
              <div className="flex-grow"></div>
              <li>
                <button
                  className={
                    activeSection === "profile"
                      ? "bg-rose-500 text-white  focus:bg-rose-500 focus:text-white hover:bg-rose-500 hover:text-white"
                      : "border-rose-500 border-[1px] hover:bg-transparent text-rose-500"
                  }
                  onClick={() => setActiveSection("profile")}
                >
                  <FaUserGraduate size={20} />{" "}
                  <span className="text-lg font-bold">Profile</span>
                </button>
              </li>
              <li>
                <button onClick={handleLogout} className="btn hover:bg-rose-500 text-rose-500 border-rose-500 text-lg font-bold  hover:text-white">
                  <LuLogOut size={30} /> Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
};

export default AdminDashboard;