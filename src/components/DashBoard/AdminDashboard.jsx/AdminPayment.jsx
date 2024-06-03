import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminPayment = () => {
  const axiosSecure = useAxiosSecure();
  const { data: payments = [] } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const response = await axiosSecure.get("payments");
      return response.data;
    },
  });
  console.log(payments);
  if (payments.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-bold">No Payments Found</h1>
      </div>
    );
  }
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>E-Mail</th>
              <th>Payment</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {payments?.map((pay, idx) => (
              <tr key={pay._id} className="bg-base-200">
                <th>{idx + 1}</th>
                <td>{pay?.name}</td>
                <td>{pay?.email}</td>
                <td>$ {pay?.price}</td>
                <td>{pay?.date?.split("T")[0]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPayment;
