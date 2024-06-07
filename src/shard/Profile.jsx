import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import wave from "../../public/wave.svg";
import { useRef } from "react";
import { imageUpload } from "../utils";
import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";
const Profile = () => {
  const { user, updateUser } = useAuth();
  const modalRef = useRef();
  const axiosSecure = useAxiosSecure();
  const { data: former = {}, refetch } = useQuery({
    queryKey: ["user", user?.uid],
    enabled: !!user?.uid,
    queryFn: async () => {
      const res = await axiosSecure.get(`users/${user?.uid}`);
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
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.name.value;
    const image = e.target.image.files[0];
    const formData = new FormData();
    formData.append("image", image);

    const imageUrl = await imageUpload(image);
    if (!username || !image) {
      toast.error("Please fill in all fields.");
      return;
    }
    await updateUser(username, imageUrl).then(async () => {
      await axiosSecure.patch(`/updateName/${user?.uid}`, { username });
      console.log(username);
      toast.success("Profile update successfully");
      closeModal();
    });
    refetch();
  };
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
          <h2>
            You connected :{" "}
            {new Date(user?.metadata?.creationTime).toLocaleDateString(
              "en-US",
              {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "2-digit",
              }
            )}
          </h2>
          <h2>
            You Last active :{" "}
            {new Date(user?.metadata?.lastSignInTime).toLocaleDateString(
              "en-US",
              {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "2-digit",
              }
            )}
          </h2>
          <div className="w-full grid grid-cols-1 md:flex p-2 mt-4 rounded-lg justify-between ">
            <div className="flex flex-wrap flex-col gap-4 text-sm text-gray-600 ">
              <p className="flex flex-col">
                Name
                <span className="font-bold text-black ">
                  {user?.displayName}
                </span>
              </p>
              <p className="flex flex-col">
                Email
                <span className="font-bold text-black ">
                  {user?.email || "E-Mail not added"}
                </span>
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
                  <h3 className="font-bold text-lg">Update Profile</h3>
                  <form onSubmit={handleFormSubmit} className="py-4">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Profile Image
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        name="image"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      />
                    </div>
                    <div className="modal-action">
                      <button
                        onClick={closeModal}
                        type="submit"
                        className="btn bg-rose-500 hover:bg-rose-500 text-white"
                      >
                        Save
                      </button>
                    </div>
                  </form>
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
