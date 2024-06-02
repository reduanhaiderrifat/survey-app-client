import { useQuery } from "@tanstack/react-query";
import usePublic from "../../../hooks/usePublic";
import { useNavigate, useParams } from "react-router-dom";

const SurveyorDetails = () => {
  const axiosPublic = usePublic();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: survey = {} } = useQuery({
    queryKey: ["surveyUpdate", id],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/surveyUpdate/${id}`);
      return data;
    },
  });
  console.log(survey);
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div className="">
      <button
        onClick={handleBack}
        className="mt-4 ml-7 bg-rose-500  px-3 py-1 rounded-2xl text-white"
      >
        Back
      </button>
      <div className="flex justify-center items-center min-h-[calc(100vh-242px)]">
        <div className="space-y-4 border-2 p-4 rounded-lg">
            <p className="bg-rose-500  px-3 py-1 rounded-2xl text-white">Create Time: {survey?.timestamp?.split('T')[0]}</p>
          <h1 className="text-4xl font-bold">{survey?.category}</h1>
          <h1 className="text-2xl font-medium">Title: {survey?.title}:</h1>
          <p className="text-lg">{survey?.description}?</p>
          <div className="flex items-center justify-between mt-3">
            <h1 className="bg-rose-500  px-3 py-1 rounded-2xl text-white">
              Deadline : {survey?.deadline}
            </h1>
            <h3 className="bg-rose-500  px-3 py-1 rounded-2xl text-white"> {survey?.status}</h3>
            <h1 className="bg-rose-500  px-3 py-1 rounded-2xl text-white">
              Vote: {survey?.options?.vote}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyorDetails;
