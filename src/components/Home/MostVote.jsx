import { useQuery } from "@tanstack/react-query";
import usePublic from "../../hooks/usePublic";

const MostVote = () => {
  const axiosPublic = usePublic();
  const { data: votes = [] } = useQuery({
    queryKey: ["homeSort"],
    queryFn: async () => {
      const res = await axiosPublic.get("/homeSort");
      return res.data;
    },
  });
  console.log(votes);
  return (
    <div className="md:my-24 md:mx-14">
      <h2 className="text-3xl text-center font-bold">
        Check Out the Most Voted Surveys Here
      </h2>
      <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 ">
        {votes?.map((vote) => (
          <div key={vote._id} className="border rounded-md hover:shadow-2xl">
            <h1 className="text-center"><strong>category:</strong> <span className="font-semibold">{vote?.category}</span></h1>
            <div className="px-4 py-2 space-y-3">
              <h2><strong>{vote?.title}</strong></h2>
              <p className="break-all">
                <strong>Q.</strong> {vote?.description}?
              </p>
              <div className="flex items-center justify-between">
                <p className="bg-rose-500 text-white px-3 rounded-full">Vote (9)</p>
                <p className="bg-rose-500 text-white px-3 rounded-full">Status: publish</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostVote;
