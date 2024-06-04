import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";

const SurveyResponse = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const modalRef = useRef(null);
  const [id, setId] = useState("");
  const [feedback, setFeedback] = useState("");
  const [preStatus, setPreStatus] = useState("");
  const { data: responses = [], refetch } = useQuery({
    queryKey: ["adminSurveyResponse"],
    queryFn: async () => {
      const response = await axiosSecure.get("/adminSurveyResponse");
      return response.data;
    },
  });

  const handleStatus = (id, preStatus) => {
    setId(id);
    setPreStatus(preStatus);
    showModal();
  };

  const handleSendFeedback = async (e) => {
    e.preventDefault();
    const status = preStatus === "publish" ? "unpublish" : "publish";
    const feedbackData = {
      feedback: feedback,
      email: user?.email,
      surveyPostId: id,
    };
    try {
      const { data } = await axiosSecure.post("/feedbackPost", feedbackData);
      if (data.insertedId) {
        const response = await axiosSecure.patch(`/adminStatusUpdate/${id}`, {
          status,
        });
        setFeedback("");
        toast.success("Feedback sent successfully");
        modalRef.current.close();
        if (response.data.modifiedCount > 0) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: `Status changed to <span class='text-rose-500'>${status}</span>`,
            showConfirmButton: false,
            timer: 1500,
          });
          await refetch();
        }
      }
    } catch (error) {
      toast.error("Error submitting feedback or updating status");
    }
  };

  const showModal = () => {
    modalRef.current.showModal();
  };

  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 p-2">#</th>
              <th className="border border-gray-200 p-2">Name</th>
              <th className="border border-gray-200 p-2">Category</th>
              <th className="border border-gray-200 p-2">Vote</th>
              <th className="border border-gray-200 p-2">Deadline</th>
              <th className="border border-gray-200 p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {responses?.map((response, idx) => (
              <tr key={response._id} className="hover:bg-gray-50">
                <td className="border border-gray-200 p-2 text-center">
                  {idx + 1}
                </td>
                <td className="border border-gray-200 p-2">
                  {response?.title}
                </td>
                <td className="border border-gray-200 p-2">
                  {response?.category}
                </td>
                <td className="border border-gray-200 p-2">
                  {response?.options?.vote}
                </td>
                <td className="border border-gray-200 p-2">
                  {response?.deadline}
                </td>
                <td className="border border-gray-200 p-2 text-center">
                  <button
                    className="text-white bg-rose-500 hover:bg-rose-600 px-4 py-2 rounded-md active:scale-95"
                    onClick={() => handleStatus(response._id, response.status)}
                  >
                    {response?.status}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <dialog
        ref={modalRef}
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <form onSubmit={handleSendFeedback}>
            <h3 className="font-bold text-lg mb-4">Provide your feedback</h3>
            <textarea
              placeholder="Give a feedback"
              className="textarea textarea-bordered mb-4 w-full h-32"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
            ></textarea>
            <div className="modal-action">
              <button
                type="submit"
                className="bg-rose-500 text-white hover:bg-rose-700 px-4 py-2 rounded-md"
              >
                Send
              </button>
              <button
                type="button"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={() => modalRef.current.close()}
              >
                ✕
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default SurveyResponse;
