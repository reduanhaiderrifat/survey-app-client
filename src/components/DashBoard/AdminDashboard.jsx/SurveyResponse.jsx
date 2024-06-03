import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const SurveyResponse = () => {
  const axiosSecure = useAxiosSecure();
  const { data: responses = [] ,refetch} = useQuery({
    queryKey: ["adminSurveyResponse"],
    queryFn: async () => {
      const response = await axiosSecure.get("/adminSurveyResponse");
      return response.data;
    },
  });
  console.log(responses);
  const handleStatus = async (id, preStatus) => {
    console.log(id,preStatus);
    const status = preStatus === 'publish' ? 'unpublish' : 'publish';
      const response = await axiosSecure.patch(`/adminStatusUpdate/${id}`, {
        status,
      });
      if (response.data.modifiedCount > 0) {
        Swal.fire({
            position: "top-center",
            icon: "success",
            title: `Status change into <span class='text-rose-500'>${status}</span>`,
            showConfirmButton: false,
            timer: 1500
          });
       await refetch();
      }
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Category</th>
              <th>Vote</th>
              <th>Deadline</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {responses?.map((response, idx) => (
              <tr key={response._id}>
                <th>{idx + 1}</th>
                <td>{response?.title}</td>
                <td>{response?.category}</td>
                <td>{response?.options?.vote}</td>
                <td>{response?.deadline}</td>
                <td>
                  <button className="text-white bg-rose-500 hover:bg-rose-500 px-2 rounded-md active:scale-95"
                    onClick={() => handleStatus(response._id, response.status)}
                  >
                    {response?.status}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SurveyResponse;
