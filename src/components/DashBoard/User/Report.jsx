import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";

import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Report = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: reports = [], refetch } = useQuery({
    queryKey: ["report"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/report/${user?.uid}`);
      return data;
    },
  });

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axiosSecure.delete(`/report/${id}`);
        if (data.deletedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: "Your Report has been deleted.",
            icon: "success",
          });
          await refetch();
        }
      }
    });
  };
  if (reports?.length === 0) {
    return (
      <div className="min-h-[calc(100vh-242px)] flex items-center justify-center">
      <div className="text-center">
        <h3 className="text-2xl font-bold">OPPS!!</h3>
      <h2 className="text-2xl font-bold">No Data available</h2>
      </div>
      </div>
    );
  }
  return (
    <div>
      {reports.map((report) => (
        <div
          key={report._id}
          className="p-6 sm:p-12 dark:bg-gray-50 text-black border-2 bg-rose-500 rounded-lg"
        >
          <div className="flex flex-col justify-center border-2 p-2 bg-white rounded-lg shadow-lg space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
            <img
              src={report?.image}
              alt=""
              className="self-center flex-shrink-0 w-24 h-24 border rounded-full md:justify-self-start dark:bg-gray-500 dark:border-gray-300"
            />
            <div className="flex flex-col">
              <h4 className="text-lg font-semibold text-center md:text-left">
                {report?.name}
              </h4>
              <h4 className="text-lg font-semibold text-center md:text-left">
                {report?.email}
              </h4>
              <p className="dark:text-gray-600 mt-3">
                <strong>Report :</strong> Sed non nibh iaculis, posuere diam
                vitae, consectetur neque. Integer velit ligula, semper sed nisl
                in, cursus commodo elit. Pellentesque sit amet mi luctus ligula
                euismod lobortis ultricies et nibh.
              </p>
            </div>
          </div>
          <div className=" flex justify-end w-full">
            <button
              onClick={() => handleDelete(report._id)}
              className=" text-rose-500 active:scale-95 font-semibold py-1 px-3 bg-white rounded-lg mt-2"
            >
              delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Report;
