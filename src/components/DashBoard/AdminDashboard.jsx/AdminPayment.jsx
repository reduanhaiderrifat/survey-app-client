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
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border  border-gray-200">
          <thead className="bg-rose-500 text-white">
            <tr className="">
              <th className="border border-gray-200 p-2">#</th>
              <th className="border border-gray-200 p-2">Name</th>
              <th className="border border-gray-200 p-2">E-Mail</th>
              <th className="border border-gray-200 p-2">Payment</th>
              <th className="border border-gray-200 p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((pay, idx) => (
              <tr key={pay._id} className="hover:bg-gray-50">
                <td className="border border-gray-200 p-2 text-center">
                  {idx + 1}
                </td>
                <td className="border border-gray-200 p-2">{pay.name}</td>
                <td className="border border-gray-200 p-2">{pay.email}</td>
                <td className="border border-gray-200 p-2">$ {pay.price}</td>
                <td className="border border-gray-200 p-2">
                  {new Date(pay.date).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPayment;
