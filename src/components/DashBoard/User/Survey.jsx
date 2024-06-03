import { useQuery } from "@tanstack/react-query";
// import usePublic from "../../../hooks/usePublic";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Survey = () => {
  const axiosSecure = useAxiosSecure();
  const { data: surveys = [] } = useQuery({
    queryKey: ["allSurvey"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allSurvey");
      return res.data;
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
                  <Link
                    to={`survey/${survey._id}`}
                    className="bg-rose-500 text-white hover:bg-rose-500 active:scale-95 px-3 py-1 rounded-lg"
                  >
                    Participate
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

export default Survey;
