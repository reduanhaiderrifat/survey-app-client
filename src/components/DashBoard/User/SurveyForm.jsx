import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import usePublic from "../../../hooks/usePublic";
import { useState } from "react";
import toast from "react-hot-toast";

const SurveyForm = () => {
  const axiosPublic = usePublic();
  const [count, setCount] = useState(0);
  const { id } = useParams();
  const { data: survey = {} } = useQuery({
    queryKey: ["userSurvey", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/userSurvey/${id}`);
      return res.data;
    },
  });
  console.log(survey);
  const handleOptionChange = (event) => {
    const value = event.target.value;
    if (value === "Yes") {
      setCount(1);
    } else if (value === "No") {
      setCount(-1);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateVote = parseInt(survey?.options?.vote + count);

    const { data } = await axiosPublic.patch(
      `/userVote/${survey?._id}`,
      { vote: updateVote }
    );
    console.log(data);
    if (data.modifiedCount > 0) {
      toast.success("update successfully");
    }
  };

  return (
    <div className="bg-gray-100  flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className=" p-8 rounded-lg bg-[#F0EBF8] shadow-lg w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <div className="bg-white p-4">
            <h1 className="text-xl font-bold mb-6 text-center text-gray-700">
              Please Answer the Question
            </h1>
            <p className="text-lg font-bold">Count: {count}</p>
            <h2 className="text-3xl font-bold mb-4 text-gray-700">
              {survey?.title}
            </h2>
            <p className="text-lg mb-6  text-gray-600">
              {survey?.description}?
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="radio-3"
                  value="Yes"
                  onChange={handleOptionChange}
                  className="radio radio-secondary"
                />{" "}
                <span>{survey?.options?.Yes}</span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="radio-3"
                  value="No"
                  onChange={handleOptionChange}
                  className="radio radio-secondary"
                />{" "}
                <span>{survey?.options?.No}</span>
              </div>
              <div className="flex justify-end w-full">
                <button className="bg-rose-500 hover:bg-rose-500 text-white font-semibold btn ">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SurveyForm;
