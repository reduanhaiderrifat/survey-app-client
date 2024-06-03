import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import { Link, } from "react-router-dom";
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
  console.log(surveys);
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
              <th>Deadline</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {surveys?.map((survey, idx) => (
              <tr key={survey._id} className="bg-base-200">
                <th>{idx + 1}</th>
                <td>{survey?.title}</td>
                <td>{survey?.category}</td>
                <td>{survey?.deadline}</td>
                <td>
                  <Link
                  to={`details/${survey?._id}`}
                    className="px-2 py-1  rounded-lg text-white bg-rose-500 active:scale-95"
                  >
                    Details
                  </Link>
                </td>
                <td>
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
