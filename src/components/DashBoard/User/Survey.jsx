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
            <tr>
              <th></th>
              <th>Title</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {surveys.map((survey, idx) => (
              <tr key={survey._id}>
                <th>{idx + 1}</th>
                <td>{survey?.title}</td>
                <td>{survey?.category}</td>
                <td>
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
