import Swal from "sweetalert2";
import usePublic from "../hooks/usePublic";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const Surveys = () => {
  const axiosPublic = usePublic();
  const navigate = useNavigate();
  const { data: surveys = [] } = useQuery({
    queryKey: ["surveyorsData"],
    queryFn: async () => {
      const res = await axiosPublic.get("/surveyorsData");
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
  const categories = [
    "Customer Satisfaction",
    "Product Feedback",
    "Market Research",
    "Employee Engagement",
    "Event Feedback",
  ];
  return (
    <div>
      <div>
        <details className="dropdown">
          <summary className="m-1 btn">open or close</summary>
          <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
         <li>jjjjjjjjjj</li>
         <li>jjjjjjjjjj</li>
         <li>jjjjjjjjjj</li>
         <li>jjjjjjjjjj</li>
          </ul>
        </details>

        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Title</th>
                <th>Description</th>
                <th>Vote</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {surveys.map((survey, idx) => (
                <tr key={survey._id}>
                  <th>{idx + 1}</th>
                  <td>{survey?.title}</td>
                  <td>{survey?.description}</td>
                  <td>{survey?.options?.vote}</td>
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
    </div>
  );
};

export default Surveys;
