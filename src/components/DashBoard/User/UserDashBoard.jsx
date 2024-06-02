import { FaBars, FaUserGraduate } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import Survey from "./Survey";
import Report from "./Report";
import { useState } from "react";
import ProUser from "./ProUser";


const UserDashBoard = () => {
    const [activeSection, setActiveSection] = useState("Survey");

    const renderContent = () => {
      switch (activeSection) {
        case "Survey":
          return <Survey />;
        case "report":
          return <Report />;
        case "Pro-user":
          return <ProUser />;
        case "profile":
          return <div>Profile</div>;
        default:
          return <Survey />;
      }
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
                    activeSection === "Survey"
                      ? "bg-rose-500 text-white focus:bg-rose-500 focus:text-white hover:bg-rose-500 hover:text-white"
                      : "border-rose-500 border-[1px] hover:bg-transparent text-rose-500"
                  }
                  onClick={() => setActiveSection("Survey")}
                >
                  <span className="text-lg font-bold">Survey manage</span>
                </button>
              </li>
              <li>
                <button
                  className={
                    activeSection === "report"
                      ? "bg-rose-500 text-white focus:bg-rose-500 focus:text-white hover:bg-rose-500 hover:text-white"
                      : "border-rose-500 border-[1px] hover:bg-transparent text-rose-500"
                  }
                  onClick={() => setActiveSection("report")}
                >
                  <span className="text-lg font-bold">My Report</span>
                </button>
              </li>
              <li>
                <button
                  className={
                    activeSection === "Survey create"
                      ? "bg-rose-500 text-white focus:bg-rose-500 focus:text-white hover:bg-rose-500 hover:text-white"
                      : "border-rose-500 border-[1px] hover:bg-transparent text-rose-500"
                  }
                  onClick={() => setActiveSection("Pro-user")}
                >
                  <span className="text-lg font-bold">Pro-User</span>
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
                <button className="btn hover:bg-rose-500 text-rose-500 border-rose-500 text-lg font-bold  hover:text-white">
                  <LuLogOut size={30} /> Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
};

export default UserDashBoard;