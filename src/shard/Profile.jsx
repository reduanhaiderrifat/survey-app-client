import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import usePublic from "../hooks/usePublic";
import wave from "../../public/wave.svg";
import { useRef } from "react";
const Profile = () => {
  const { user } = useAuth();
  const modalRef = useRef();
  const axiosPublic = usePublic();
  const { data: former = {} } = useQuery({
    queryKey: ["user", user?.uid],
    enabled: !!user?.uid,
    queryFn: async () => {
      const res = await axiosPublic.get(`users/${user?.uid}`);
      return res.data;
    },
  });
  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };
  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };
  console.log(user);
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-lg rounded-2xl w-3/5">
        <img
          alt="profile"
          src={wave}
          className="w-full mb-4 rounded-t-lg h-44 object-cover bg-cover bg-center"
        />
        <div className="flex flex-col items-center justify-center p-4 -mt-16">
          <div className="relative block">
            <img
              alt="profile"
              src={user?.photoURL}
              className="mx-auto object-cover rounded-full h-24 w-24  border-2 border-white "
            />
          </div>

          <p className="p-2 px-4 text-xs text-white bg-pink-500 rounded-full ">
            {former?.role[0].toUpperCase() + former?.role.slice(1)}
          </p>

          <div className="w-full flex p-2 mt-4 rounded-lg justify-between">
            <div className="flex flex-wrap flex-col gap-4 text-sm text-gray-600 ">
              <p className="flex flex-col">
                Name
                <span className="font-bold text-black ">
                  {user?.displayName}
                </span>
              </p>
              <p className="flex flex-col">
                Email
                <span className="font-bold text-black ">{user?.email}</span>
              </p>
            </div>
            <div className=" mt-8">
              <button
                onClick={openModal}
                className="bg-[#F43F5E] px-4 flex justify-center py-1 rounded-lg text-white cursor-pointer hover:bg-[#af4053]  mb-1"
              >
                Update Profile
              </button>

              <dialog
                ref={modalRef}
                id="my_modal_5"
                className="modal modal-bottom sm:modal-middle"
              >
                <div className="modal-box">
                  <h3 className="font-bold text-lg">Hello!</h3>
                  <p className="py-4">
                    Press ESC key or click the button below to close
                  </p>
                  <div className="modal-action">
                    <button
                      onClick={closeModal}
                      className="btn btn-sm btn-circle btn-ghost absolute right-2 top-0"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
