import { useState } from "react";
import usePublic from "../../../hooks/usePublic";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { IoArrowBack } from "react-icons/io5";
import useAuth from "../../../hooks/useAuth";

const UpdateForm = () => {
  const navigate = useNavigate();
  const {user} = useAuth()
  const { id } = useParams();
  console.log(id);
  const [Yes, setYes] = useState("Yes");
  const [No, setNo] = useState("NO");
  const axiosPublic = usePublic();
  const categories = [
    "Customer Satisfaction",
    "Product Feedback",
    "Market Research",
    "Employee Engagement",
    "Event Feedback",
  ];
  const { data: survey = {} } = useQuery({
    queryKey: ["surveyUpdate", id],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/surveyUpdate/${id}`);
      return data;
    },
  });
  console.log(survey);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const category = form.category.value;
    const deadline = form.deadline.value;
    const vote = parseInt(0);
    const surveyData = {
      title,
      description,
      category,
      deadline,
      options: { Yes, No, vote },
      useruid: user?.uid,
    };
    console.log(surveyData);
    try {
      const response = await axiosPublic.put(`/survey/${survey?._id}`, surveyData);
      console.log("Survey Update:", response.data);

      if (response.data.modifiedCount>0) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Your survey has been publish",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error creating survey:", error);
    }
  };
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div className="max-w-lg mx-auto mt-10 p-4 bg-[#F0EBF8] rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold mb-6">Update Your Survey</h2>
        <button
          onClick={handleBack}
          className="btn hover:bg-rose-500 bg-rose-500 text-white"
        >
        <IoArrowBack size={25} />  Back
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            required
            defaultValue={survey?.title}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            required
            defaultValue={survey?.description}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-3 text-gray-700">Options</label>
          <div className="flex items-center gap-9">
            <div className="flex items-center gap-1">
              <input
                type="radio"
                name="radio-2"
                value="Yes"
                className="radio  radio-secondary"
                onChange={(e) => setYes(e.target.value)}
                checked
              />
              <p>Yes </p>
            </div>
            <div className="flex items-center gap-1">
              <input
                type="radio"
                name="radio-3"
                value="No"
                className="radio  radio-secondary"
                onChange={(e) => setNo(e.target.value)}
                checked
              />
              <p>No </p>
            </div>

            <div className=""></div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <select
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            name="category"
            defaultValue={survey?.category}
            required
          >
            <option value="" disabled>
              Select category
            </option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Deadline</label>
          <input
            type="date"
            defaultValue={survey?.deadline}
            name="deadline"
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-rose-500 text-white p-2 rounded hover:bg-rose-600"
        >
          Update Survey
        </button>
      </form>
    </div>
  );
};

export default UpdateForm;
