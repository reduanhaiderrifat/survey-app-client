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
  console.log(surveys);
  const handleCategorySelect = async (category) => {
    setSelectedCategory(category);
    await refetch();
  };
  const handleSortByVotes = async () => {
    setSortByVotes((prev) => !prev);
    await refetch();
  };
  const { data: match = {} } = useQuery({
    queryKey: ["userMatch", user?.uid],
    enabled: !!user?.uid,
    queryFn: async () => {
      const res = await axiosSecure.get(`/userMatch/${user?.uid}`);
      return res.data;
    },
  });
  console.log(match?.uid);
  const handleParticipateClick = (survey) => {
    const currentDate = new Date();
    const deadlineDate = new Date(survey?.deadline);

    if (deadlineDate < currentDate) {
      Swal.fire({
        icon: "error",
        title: "Deadline Over",
        text: "The deadline for this survey has passed.",
      });
    } else {
      if (match?.uid === user?.uid) {
        Swal.fire({
          icon: "error",
          title: "Already participate",
          text: "You can't participate the survey.",
        });
      } else {
        navigate(`/uservote/${survey._id}`);
      }
    }
  };
  if (isLoading) return <Loader />;

  return (
    <div>
      <div>
        <div className="flex justify-center my-4">
          <details className="dropdown ">
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
            className="m-1 btn bg-blue-500 hover:text-blue-500 text-white hover:bg-transparent hover:border-blue-500"
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
                  <td className="py-3 px-5 text-center">
                    {survey?.options?.vote}
                  </td>
                  <td className="py-3 px-5 text-center">
                    {user?.uid ? (
                      <>
                        <button
                          onClick={() => handleParticipateClick(survey)}
                          className="bg-rose-500 text-white hover:bg-rose-500 active:scale-95 px-3 py-1 rounded-lg"
                        >
                          Participate
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          state={location.pathname}
                          replace={true}
                          className="bg-rose-500 text-white hover:bg-rose-500 active:scale-95 px-3 py-1 rounded-lg"
                        >
                          Participate
                        </Link>
                      </>
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
