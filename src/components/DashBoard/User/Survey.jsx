import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const Survey = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {user} = useAuth()
  const { data: surveys = [] } = useQuery({
    queryKey: ["allSurvey"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allSurvey");
      return res.data;
    },
  });

  const handleParticipateClick = async(survey) => {
    const currentDate = new Date();
    const deadlineDate = new Date(survey?.deadline);

    if (deadlineDate < currentDate) {
      Swal.fire({
        icon: "error",
        title: "Deadline Over",
        text: "The deadline for this survey has passed.",
      });
      return;
    }

    const res = await axiosSecure.get(`/userMatch/${survey._id}`);
    const userMatch = res.data;
    if (Array.isArray(userMatch)) {
      const userAlreadyParticipated = userMatch.some(match => match.uid === user.uid);

      if (userAlreadyParticipated) {
        Swal.fire({
          icon: "error",
          title: "Already Participated",
          text: "You have already participated in this survey.",
        });
      } else {
        navigate(`/uservote/${survey._id}`);
      }
    } else {
      console.error("Unexpected userMatch response format", userMatch);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There was an error retrieving your participation status. Please try again later.",
      });
    }
  };
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="text-white bg-rose-500">
            <tr className="">
              <th className="border border-gray-200 p-2">#</th>
              <th className="border border-gray-200 p-2">Title</th>
              <th className="border border-gray-200 p-2">Category</th>
              <th className="border border-gray-200 p-2">Vote</th>
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
                <td className="border border-gray-200 p-2">{survey?.options?.vote}</td>
                <td className="border border-gray-200 p-2 text-center">
                {user?.uid ? (
                      <button
                        onClick={() => handleParticipateClick(survey)}
                        className="bg-rose-500 text-white hover:bg-rose-500 active:scale-95 px-3 py-1 rounded-lg"
                      >
                        Participate
                      </button>
                    ) : (
                      <Link
                        to="/login"
                        state={location.pathname}
                        replace={true}
                        className="bg-rose-500 text-white hover:bg-rose-500 active:scale-95 px-3 py-1 rounded-lg"
                      >
                        Participate
                      </Link>
                    )}
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


