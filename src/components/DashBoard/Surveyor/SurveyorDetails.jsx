import { useQuery } from "@tanstack/react-query";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { PieChart, Pie, Cell, Legend } from "recharts";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { IoArrowBack } from "react-icons/io5";
import { useState } from "react";
import Swal from "sweetalert2";
import Loader from "../../loader/Loader";
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const SurveyorDetails = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
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
  const { data: votes, isPending } = useQuery({
    queryKey: ["voteGet", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/voteGet/${id}`);
      return data;
    },
  });
  console.log(votes);
  const totalYesLength = votes?.reduce((acc, currentVote) => {
    return acc + (currentVote.answer?.yesAnswers.length || 0);
  }, 0);
  const totalNoLength = votes?.reduce((acc, currentVote) => {
    return acc + (currentVote.answer?.noAnswers.length || 0);
  }, 0);
  console.log(matchIds);
  const handleBack = () => {
    navigate(-1);
  };
  if (isLoading || isPending) return <Loader/>;

  //custom shape chart

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  const pieChartData = [
    { name: "Yes", value: totalYesLength },
    { name: "No", value: totalNoLength },
  ];

  const handleSee = async (uid) => {
    console.log(uid);
    const { data } = await axiosSecure.get(`/userComments/${uid}`);
    console.log(data);
    setComments(data);
    if (!data.length == 0) {
      document.getElementById("my_modal_5").showModal();
    }else{
      Swal.fire({
        position: "top-center",
        icon: "info",
        title: "Sorry no comments from here",
        showConfirmButton: false,
        timer: 1500,
      });
    }
   
  };
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
      <Tabs>
        <TabList>
          <Tab>Table</Tab>
          <Tab>Chart</Tab>
        </TabList>

        <TabPanel>
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border  border-gray-200">
              {/* head */}
              <thead className="bg-rose-500 text-white">
                <tr>
                  <th className="border border-gray-200 p-2">Serial No</th>
                  <th className="border border-gray-200 p-2">Name</th>
                  <th className="border border-gray-200 p-2">Email</th>
                  <th className="border border-gray-200 p-2">User Feedback</th>
                  <th className="border border-gray-200 p-2">Vote</th>
                </tr>
              </thead>

              <tbody>
                {!matchIds || matchIds.length === 0 ? (
                  <tr className="flex items-center">
                    <th> No data available </th>
                  </tr>
                ) : (
                  matchIds.map((info, idx) => (
                    <tr key={info._id} className="hover:bg-gray-50">
                      <th className="border border-gray-200 p-2 text-center">
                        {idx + 1}
                      </th>
                      <td className="border border-gray-200 p-2">
                        {info?.name}
                      </td>
                      <td className="border border-gray-200 p-2">
                        {info?.email}
                      </td>
                      <td className="border border-gray-200 p-2 text-center">
                        <button
                          className="bg-rose-500 text-white hover:bg-rose-500 active:scale-95 px-3 py-1 rounded-lg"
                          onClick={() => handleSee(info?.uid)}
                        >
                          see
                        </button>{" "}
                      </td>
                      <td className="border border-gray-200 p-2">
                        Yes({info?.answers?.yesAnswers.length}) NO(
                        {info?.answers?.noAnswers.length})
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="flex  flex-col items-center">
            <p className="text-2xl font-bold mb-2">
              Total <span className="text-rose-500">Yes</span> Answers:{" "}
              {totalYesLength}
            </p>
            <p className="text-2xl font-bold ">
              Total <span className="text-rose-500">No</span> Answers:{" "}
              {totalNoLength}
            </p>

            <PieChart width={400} height={400}>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieChartData?.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend></Legend>
            </PieChart>
          </div>
        </TabPanel>
      </Tabs>

      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box overflow-scroll">
          {comments?.map((comment) => (
            <p key={comment._id} className="p-2 border my-2 break-all">
              {comment?.comment}
            </p>
          ))}

          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2  top-0">
                ✕
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default SurveyorDetails;
