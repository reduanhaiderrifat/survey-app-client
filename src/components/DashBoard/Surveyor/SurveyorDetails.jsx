import { useQuery } from "@tanstack/react-query";

import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { IoArrowBack } from "react-icons/io5";

const SurveyorDetails = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  const { data: matchIds = [], isLoading } = useQuery({
    queryKey: ["ids", id],
    enabled: !!id,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/ids/${id}`);
      return data;
    },
  });
  console.log(matchIds);
  const handleBack = () => {
    navigate(-1);
  };
  if (isLoading) return "loading";
  return (
    <div className="">
      <button
        onClick={handleBack}
        className="my-3 ml-7  bg-rose-500  px-3 py-1 rounded-2xl text-white"
      >
        <span className="flex items-center gap-1">
          <IoArrowBack /> Back
        </span>
      </button>
      <h2 className="text-center uppercase font-bold text-2xl">
        individual survey <span className="text-rose-500">responses</span>
      </h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead className="text-xl">
            <tr>
              <th>Serial No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Vote</th>
            </tr>
          </thead>

          <tbody>
            {!matchIds || matchIds.length === 0 ? (
              <tr className="flex items-center">
                <th> No data available </th>
              </tr>
            ) : (
              matchIds.map((info, idx) => (
                <tr key={info._id}>
                  <th>{idx + 1}</th>
                  <td>{info?.name}</td>
                  <td>{info?.email}</td>
                  <td>
                    {info?.vote === 1 ? "Yes" : "No"} ({info?.vote})
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SurveyorDetails;
