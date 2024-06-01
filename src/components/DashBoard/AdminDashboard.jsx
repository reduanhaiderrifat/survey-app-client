import { NavLink } from "react-router-dom";


const AdminDashboard = () => {
    return (
        <div className="">
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-center justify-center">
            {/* Page content here */}
            <label
              htmlFor="my-drawer-2"
              className="btn btn-primary mt-24 drawer-button lg:hidden"
            >
              Open Dashboard
            </label>
          </div>
          <div className="drawer-side mt-24 lg:mt-0">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
              {/* Sidebar content here */}
              <li>
                <NavLink to="/">Admin</NavLink>
              </li>
              <li>
                <NavLink to="/">My Report</NavLink>
              </li>
              <li>
                <NavLink to="/">Pro-User</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
};

export default AdminDashboard;