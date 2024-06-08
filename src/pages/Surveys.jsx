import Swal from "sweetalert2";
import usePublic from "../hooks/usePublic";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaArrowDownAZ } from "react-icons/fa6";
import Loader from "../components/loader/Loader";
import { FaSortAmountDownAlt } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Surveys = () => {
  const axiosPublic = usePublic();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortByVotes, setSortByVotes] = useState(false);
  const navigate = useNavigate();
  const categories = [
    "Customer Satisfaction",
    "Product Feedback",
    "Market Research",
    "Employee Engagement",
    "Event Feedback",
  ];

  const {
    data: surveys = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["surveyorsData", selectedCategory, sortByVotes],
    queryFn: async () => {
      const queryParam = `?category=${selectedCategory}&sortByVotes=${sortByVotes}`;
      const res = await axiosPublic.get(`/surveyorsData${queryParam}`);
      return res.data;
    },
  });
  const handleCategorySelect = async (category) => {
    setSelectedCategory(category);
    await refetch();
  };

  const handleSortByVotes = async () => {
    setSortByVotes((prev) => !prev);
    await refetch();
  };

  const handleParticipateClick = async (survey) => {
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

  if (isLoading) return <Loader />;

  return (
    <div>
      <div>
        <div className="flex justify-center my-4">
          <details className="dropdown mt-6">
            <summary className="m-1 btn bg-rose-500 hover:text-rose-500 text-white hover:bg-transparent hover:border-rose-500">
              Filter By Category <FaArrowDownAZ />
            </summary>
            <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
              <li key="all">
                <button onClick={() => handleCategorySelect("")}>All</button>
              </li>
              {categories?.map((cat, idx) => (
                <li key={idx}>
                  <button onClick={() => handleCategorySelect(cat)}>
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </details>
          <button
            className=" btn mt-7 ml-2 bg-blue-500 hover:text-blue-500 text-white hover:bg-transparent hover:border-blue-500"
            onClick={handleSortByVotes}
          >
            Sort By Votes <FaSortAmountDownAlt />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            {/* head */}
            <thead className="bg-rose-500 text-white">
              <tr>
                <th className="py-3 px-5 border">#</th>
                <th className="py-3 px-5 border">Title</th>
                <th className="py-3 px-5 border">Description</th>
                <th className="py-3 px-5 border">Category</th>
                <th className="py-3 px-5 border">Vote</th>
                <th className="py-3 px-5 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {surveys.map((survey, idx) => (
                <tr key={survey._id} className="border-b border-gray-200">
                  <th className="py-3 px-5 text-center">{idx + 1}</th>
                  <td className="py-3 px-5 ">{survey?.title}</td>
                  <td className="py-3 px-5 ">{survey?.description}</td>
                  <td className="py-3 px-5 ">{survey?.category}</td>
                  <td className="py-3 px-5 text-center">
                    {survey?.options?.vote}
                  </td>
                  <td className="py-3 px-5 text-center">
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
    </div>
  );
};

export default Surveys;
