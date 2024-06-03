import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { FaArrowDown } from "react-icons/fa";

const ManageUser = () => {
  const axiosSecure = useAxiosSecure();
  const [sortRole,setSortRole] = useState('')
  const modalRef = useRef(null);
  const [userId, setUserId] = useState(null);
const { data: users = [], refetch } = useQuery({
    queryKey: ["users", sortRole], 
    queryFn: async () => {
      const response = await axiosSecure.get(`/adminUsers?status=${sortRole}`);
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
const handlerolesort=(sort)=>{
    setSortRole(sort)
}
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
    <div>
        <div className="flex justify-end">
      <div className="dropdown dropdown-hover dropdown-left">
        <div tabIndex={0} role="button" className="btn m-1 bg-transparent text-rose-500 border-rose-500 hover:bg-rose-500 hover:text-white">
          Sort by Role <FaArrowDown />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li className="hover:bg-rose-500 hover:text-white">
            <button onClick={()=>handlerolesort('user')}>User</button>
          </li>
          <li className="hover:bg-rose-500 hover:text-white"> 
            <button onClick={()=>handlerolesort('surveyor')}>Surveyor</button>
          </li>
          <li className="hover:bg-rose-500 hover:text-white">
            <button onClick={()=>handlerolesort('Pro-User')}>Pro-User</button>
          </li>
          <li className="hover:bg-rose-500 hover:text-white">
            <button onClick={()=>handlerolesort('admin')}>Admin</button>
          </li>
        </ul>
      </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>E-Mail</th>
              <th>Role</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users?.map((user) => (
              <tr key={user._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={
                            user?.photo || "https://i.ibb.co/fxdn1T9/user1.png"
                          }
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user?.name}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="badge badge-ghost badge-sm">
                    {user?.email}
                  </span>
                </td>
                <td>{user?.role}</td>
                <th>
                  <button className="btn" onClick={() => showModal(user?._id)}>
                    Promote
                  </button>
                  <dialog
                    ref={modalRef}
                    id="my_modal_5"
                    className="modal modal-bottom sm:modal-middle"
                  >
                    <div className="modal-box">
                      <div className="flex justify-around">
                        <button
                          className="btn"
                          onClick={() => handleButtonClick("surveyor")}
                        >
                          Surveyor
                        </button>
                        <button
                          className="btn"
                          onClick={() => handleButtonClick("admin")}
                        >
                          Admin
                        </button>
                        <button
                          className="btn"
                          onClick={() => handleButtonClick("user")}
                        >
                          User
                        </button>
                        <button
                          className="btn"
                          onClick={() => handleButtonClick("Pro-User")}
                        >
                          Pro-User
                        </button>
                      </div>
                      <div className="modal-action">
                        <form method="dialog">
                          <button className="btn">Close</button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUser;
