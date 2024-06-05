import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const SurveyResponse = () => {
  const axiosSecure = useAxiosSecure();

  const { data: feedbacks = [] } = useQuery({
    queryKey: ["surveyResponse"],
    queryFn: async () => {
      const response = await axiosSecure.get("/surveyResponse");
      return response.data;
    },
  });
  const feedIds = feedbacks?.map((f) => f.surveyPostId);
  const feedId = feedIds.join(", ");
  const { data: survey = {} } = useQuery({
    queryKey: ["surveyFeedBackItem", feedId],
    enabled: !!feedId,
    queryFn: async () => {
      const response = await axiosSecure.get(`/surveyFeedBackItem/${feedId}`);
      return response.data;
    },
  });
  console.log(survey);
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Survey Responses</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          {/* head */}
          <thead className="bg-rose-500 text-white">
            <tr>
              <th className="py-3 px-5 text-left">#</th>
              <th className="py-3 px-5 text-left">Email</th>
              <th className="py-3 px-5 text-left">Feedback</th>
              <th className="py-3 px-5 text-left">Title</th>
              <th className="py-3 px-5 text-left">Category</th>
              <th className="py-3 px-5 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {feedbacks?.map((feedback, idx) => (
              <tr
                key={feedback.surveyPostId}
                className="border-b border-gray-200"
              >
                <th className="py-3 px-2 border">{idx + 1}</th>
                <td className="py-3 px-2 border">{feedback?.email}</td>
                <td className="py-3 px-3 w-1/3 border">{feedback?.feedback}</td>
                <td className="py-3 px-1 border">{survey?.title}</td>
                <td className="py-3 px-1 border">{survey?.category}</td>
                <td className="py-3 px-2 border">{survey?.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SurveyResponse;
