import { useQuery } from "@tanstack/react-query";
import usePublic from "../../hooks/usePublic";
import { Vortex } from "react-loader-spinner";

const RecentSurvey = () => {
  const axiosPublic = usePublic();
  const { data: votes = [], isLoading } = useQuery({
    queryKey: ["homeRecent"],
    queryFn: async () => {
      const res = await axiosPublic.get("/homeRecent");
      return res.data;
    },
  });
  return (
    <div className="mt-14 md:my-24 md:mx-14">
      <h2 className="text-3xl text-center font-bold">
        Check Out the <span className="text-rose-500">Most Recent</span> Surveys
        Here
      </h2>
      {isLoading ? (
        <div className="flex justify-center">
          <Vortex
            visible={true}
            height="80"
            width="80"
            ariaLabel="vortex-loading"
            wrapperStyle={{}}
            wrapperClass="vortex-wrapper"
            colors={["red", "green", "blue", "yellow", "orange", "purple"]}
          />
        </div>
      ) : (
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 ">
          {votes?.map((vote) => (
            <div
              key={vote._id}
              className="border rounded-md shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform lg:hover:scale-105 my-4"
            >
              <h1 className="text-center mb-3 text-[16px]">
                <strong>Category:</strong>{" "}
                <span className="font-semibold">{vote?.category}</span>
              </h1>
              <p className="bg-rose-500 text-center border-2 w-full text-white px-3 py-1 rounded-full inline-block mb-4">
                {new Date(vote?.timestamp).toLocaleString()}
              </p>
              <div className="px-4 py-2 space-y-4">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h2 className="text-xl font-bold text-gray-800">
                    {vote?.title}
                  </h2>
                  <p className="break-all text-gray-700 mt-2">
                    <strong>Q.</strong> {vote?.description}?
                  </p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h2 className="text-xl font-bold text-gray-800">
                    {vote?.title1}
                  </h2>
                  <p className="break-all text-gray-700 mt-2">
                    <strong>Q.</strong> {vote?.description1}?
                  </p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h2 className="text-xl font-bold text-gray-800">
                    {vote?.title2}
                  </h2>
                  <p className="break-all text-gray-700 mt-2">
                    <strong>Q.</strong> {vote?.description2}?
                  </p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <p className="bg-rose-500 text-white px-3 py-1 rounded-full">
                    Vote ({vote?.options?.vote})
                  </p>
                  <p className="bg-rose-500 text-white px-3 py-1 rounded-full">
                    Status: {vote?.status}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentSurvey;
