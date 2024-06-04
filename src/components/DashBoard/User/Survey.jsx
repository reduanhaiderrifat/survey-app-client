import { useQuery } from "@tanstack/react-query";
// import usePublic from "../../../hooks/usePublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Survey = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { data: surveys = [] } = useQuery({
    queryKey: ["allSurvey"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allSurvey");
      return res.data;
    },
  });
  console.log(surveys);
  const handleParticipateClick = (survey) => {
    const currentDate = new Date();
    const deadlineDate = new Date(survey?.deadline);

    if (deadlineDate < currentDate) {
      Swal.fire({
        icon: "error",
        title: "Deadline Over",
        text: "The deadline for this survey has passed.",
      });
    } else {
      navigate(`survey/${survey._id}`);
    }
  };
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 p-2">#</th>
              <th className="border border-gray-200 p-2">Title</th>
              <th className="border border-gray-200 p-2">Category</th>
              <th className="border border-gray-200 p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {surveys.map((survey, idx) => (
              <tr key={survey._id} className="hover:bg-gray-50">
                <th className="border border-gray-200 p-2 text-center">{idx + 1}</th>
                <td className="border border-gray-200 p-2">{survey?.title}</td>
                <td className="border border-gray-200 p-2">{survey?.category}</td>
                <td className="border border-gray-200 p-2 text-center">
                  <button
                    onClick={() => handleParticipateClick(survey)}
                    className="bg-rose-500 text-white hover:bg-rose-500 active:scale-95 px-3 py-1 rounded-lg"
                  >
                    Participate
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

export default Survey;
