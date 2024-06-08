import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
const SurveyorManage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: surveys = [] } = useQuery({
    queryKey: ["survey", user?.uid],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/survey/${user?.uid}`);
      return data;
    },
  });

  if (surveys.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-24px)]">
        <h1 className="text-2xl font-bold">No survey responses available.</h1>
      </div>
    );
  }
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          {/* head */}
          <thead className="bg-rose-500 text-white">
            <tr>
              <th className="py-3 px-5 text-left">#</th>
              
              <th className="py-3 px-5 text-left">Category</th>
              <th className="py-3 px-5 text-left">Status</th>
              <th className="py-3 px-5 text-left">Creation Time</th>
              <th className="py-3 px-5 text-left">Deadline</th>
              <th className="py-3 px-5 text-center">Responses</th>
              <th className="py-3 px-5 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {surveys?.map((survey, idx) => (
              <tr key={survey._id} className="border-b border-gray-200">
                <th className="py-3 px-5 border"> {idx + 1}</th>

                <td className="py-3 px-5 border">{survey?.category}</td>
                <td className="py-3 px-5 border">{survey?.status}</td>
                <td className="py-3 px-5 border">{new Date(survey.timestamp).toLocaleString()}</td>
                <td className="py-3 px-3 border">{survey?.deadline}</td>
                <td className="py-1 px-2 border text-center">
                  <Link
                    to={`details/${survey?._id}`}
                    className="px-2 py-1  rounded-lg text-white bg-rose-500 active:scale-95"
                  >
                    Details
                  </Link>
                </td>
                <td className="py-3 px-2 border">
                  <Link
                    to={`update/${survey._id}`}
                    className="px-2 py-1 rounded-lg text-white bg-rose-500 active:scale-95"
                  >
                    Update
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SurveyorManage;
