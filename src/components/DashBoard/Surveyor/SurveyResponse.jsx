import {useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loader from "../../loader/Loader";

const SurveyResponse = () => {
  const axiosSecure = useAxiosSecure();
const {user} = useAuth()
  const { data: feedbacks = [] } = useQuery({
    queryKey: ["surveyResponse"],
    queryFn: async () => {
      const response = await axiosSecure.get(`/surveyResponse/${user?.uid}`);
      return response.data;
    },
  });
  // Fetch survey data for each feedback item
  const { data: surveys = [], isLoading: isSurveyLoading } = useQuery({
    queryKey: ["surveyFeedBackItems", feedbacks.map(f => f.surveyPostId)],
    queryFn: async () => {
      const surveyRequests = feedbacks.map(feedback =>
        axiosSecure.get(`/surveyFeedBackItem/${feedback.surveyPostId}`)
      );
      const surveyResponses = await Promise.all(surveyRequests);
      return surveyResponses.map(response => response.data);
    },
    enabled: feedbacks.length > 0,
  });
  const combinedData = feedbacks.map(feedback => ({
    feedback,
    survey: surveys.find(survey => survey._id === feedback.surveyPostId),
  }));
  if (isSurveyLoading) {
    return <Loader/>;
  }

  if (combinedData.length === 0) {
    return <div className="flex justify-center items-center min-h-[calc(100vh-24px)]"><h1 className="text-2xl font-bold">No survey responses available.</h1></div>;
  }
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
              <th className="py-3 px-5 text-left">Category</th>
              <th className="py-3 px-5 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {combinedData.map(({ feedback, survey }, idx) => (
              <tr key={`${feedback.surveyPostId}-${idx}`} className="border-b border-gray-200">
                <th className="py-3 px-2 border">{idx + 1}</th>
                <td className="py-3 px-2 border">{feedback?.email}</td>
                <td className="py-3 px-3 w-1/3 border">{feedback?.feedback}</td>
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
