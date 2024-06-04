import { useQuery } from "@tanstack/react-query";
import usePublic from "../../hooks/usePublic";

const RecentSurvey = () => {
  const axiosPublic = usePublic();
  const { data: votes = [] } = useQuery({
    queryKey: ["homeRecent"],
    queryFn: async () => {
      const res = await axiosPublic.get("/homeRecent");
      return res.data;
    },
  });
  return (
    <div className="md:my-24 md:mx-14">
      <h2 className="text-3xl text-center font-bold">
        Check Out the <span className="text-rose-500">Most Recent</span> Surveys
        Here
      </h2>
      <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 ">
        {votes?.map((vote) => (
          <div key={vote._id} className="border rounded-md hover:shadow-2xl">
            <h1 className="text-center">
              <strong>category:</strong>{" "}
              <span className="font-semibold">{vote?.category}</span>
            </h1>
            <p className="bg-rose-500 text-center text-white px-3 rounded-full">
                  {new Date(vote?.timestamp).toLocaleString()}
                </p>
            <div className="px-4 py-2 space-y-3">
              
                <h2>
                  <strong>{vote?.title}</strong>
                </h2>
               
             
              <p className="break-all">
                <strong>Q.</strong> {vote?.description}?
              </p>
              <div className="flex items-center justify-between">
                <p className="bg-rose-500 text-white px-3 rounded-full">
                  {" "}
                  Vote ({vote?.options?.vote})
                </p>
                <p className="bg-rose-500 text-white px-3 rounded-full">
                  Status: {vote?.status}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentSurvey;
