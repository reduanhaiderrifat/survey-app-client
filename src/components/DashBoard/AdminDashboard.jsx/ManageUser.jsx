import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { FaArrowDown } from "react-icons/fa";

const ManageUser = () => {
  const axiosSecure = useAxiosSecure();
  const [sortRole, setSortRole] = useState("");
  const modalRef = useRef(null);
  const [userId, setUserId] = useState(null);
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users", sortRole],
    queryFn: async () => {
      const response = await axiosSecure.get(`/adminUsers?role=${sortRole}`);
      return response.data;
    },
  });

  useEffect(() => {
    refetch();
  }, [sortRole, refetch]);

  console.log(users);
  const showModal = (id) => {
    modalRef.current.showModal();
    setUserId(id);
  };
  console.log(userId);
  const handlerolesort = (sort) => {
    setSortRole(sort);
  };
  const handleButtonClick = async (role) => {
    console.log(`Promoted to ${role}`);
      const res = await axiosSecure.patch(`/adminUpdate/${userId}`, { role });
      if (res.data?.modifiedCount > 0) {
        await refetch();
        modalRef.current.close();
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: `User status is <span class='text-rose-500'>${role}</span> now`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
   
  };
  return (
    <div className=" ">
      <div className="flex justify-end mb-4">
        <div className="dropdown dropdown-hover dropdown-left">
          <div
            tabIndex={0}
            role="button"
            className="btn m-1 bg-transparent text-rose-500 border-rose-500 hover:bg-rose-500 hover:text-white flex items-center"
          >
            Sort by Role <FaArrowDown className="ml-2" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li className="hover:bg-rose-500 hover:text-white">
              <button onClick={() => handlerolesort("")}>All</button>
            </li>
            <li className="hover:bg-rose-500 hover:text-white">
              <button onClick={() => handlerolesort("user")}>User</button>
            </li>
            <li className="hover:bg-rose-500 hover:text-white">
              <button onClick={() => handlerolesort("surveyor")}>
                Surveyor
              </button>
            </li>
            <li className="hover:bg-rose-500 hover:text-white">
              <button onClick={() => handlerolesort("Pro-User")}>
                Pro-User
              </button>
            </li>
            <li className="hover:bg-rose-500 hover:text-white">
              <button onClick={() => handlerolesort("admin")}>Admin</button>
            </li>
          </ul>
        </div>
      </div>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white">
          {/* head */}
          <thead className="bg-rose-500 text-white">
            <tr>
              <th className="py-3 px-5 text-left">Name</th>
              <th className="py-3 px-5 text-left">E-Mail</th>
              <th className="py-3 px-5 text-left">Role</th>
              <th className="py-3 px-5 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {users?.map((user) => (
              <tr key={user._id} className="border-b border-gray-200">
                <td className="py-3 px-5 font-semibold border">{user?.name}</td>
                <td className="py-3 px-5">
                  <span className="badge badge-ghost border badge-sm">
                    {user?.email}
                  </span>
                </td>
                <td className="py-3 px-5 border">{user?.role}</td>
                <td className="py-3 px-5 text-center">
                  {user?.role !== "admin" && (
                    <button
                      className="bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-rose-600"
                      onClick={() => showModal(user?._id)}
                    >
                      Promote
                    </button>
                  )}
                  <dialog
                    ref={modalRef}
                    id="my_modal_5"
                    className="modal modal-bottom sm:modal-middle"
                  >
                    <div className="modal-box">
                      <div className="flex justify-around mb-4">
                        <button
                          className="btn bg-rose-500 text-white hover:bg-rose-600"
                          onClick={() => handleButtonClick("surveyor")}
                        >
                          Surveyor
                        </button>
                        <button
                          className="btn bg-rose-500 text-white hover:bg-rose-600"
                          onClick={() => handleButtonClick("admin")}
                        >
                          Admin
                        </button>
                        <button
                          className="btn bg-rose-500 text-white hover:bg-rose-600"
                          onClick={() => handleButtonClick("user")}
                        >
                          User
                        </button>
                        <button
                          className="btn bg-rose-500 text-white hover:bg-rose-600"
                          onClick={() => handleButtonClick("Pro-User")}
                        >
                          Pro-User
                        </button>
                      </div>
                      <div className="modal-action">
                        <form method="dialog">
                          <button className="btn btn-ghost rounded-full">
                            X
                          </button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUser;
