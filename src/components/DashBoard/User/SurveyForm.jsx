import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import usePublic from "../../../hooks/usePublic";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaTelegramPlane } from "react-icons/fa";

const SurveyForm = () => {
  const axiosPublic = usePublic();
  const modalRef = useRef(null);
  const commentRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [count, setCount] = useState(0);
  const { id } = useParams();
  const { data: survey = {} } = useQuery({
    queryKey: ["userSurvey", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/userSurvey/${id}`);
      return res.data;
    },
  });
  console.log(survey);
  const { data: role = {} } = useQuery({
    queryKey: ["pro-user", user?.uid],
    queryFn: async () => {
      const res = await axiosPublic.get(`/pro-user/${user?.uid}`);
      return res.data;
    },
  });
  const handleOptionChange = (event) => {
    const value = event.target.value;
    if (value === "Yes") {
      setCount(1);
    } else if (value === "No") {
      setCount(-1);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (count === 0) {
      return toast.error("Please! Give your answer");
    }
    const { data } = await axiosPublic.patch(`/userVote/${survey?._id}`, {
      vote: count,
    });
    console.log(data);
    if (data.modifiedCount > 0) {
      toast.success("update successfully");
    }
    //post user survey
    const userSurvey = {
      survey,
      voteId:survey?._id,
      email: user?.email,
      name: user?.displayName,
      vote: count,
    };
    const res = await axiosPublic.post("/userSurveyPost", userSurvey);
    console.log(res.data);
    if (res.data.insertedId) {
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Your survey response is done",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  const handleReport = async (e) => {
    e.preventDefault();
    const report = e.target.report.value;
    const repotData = {
      report,
      email: user?.email,
      name: user?.displayName,
      image: user?.photoURL,
      uid: user?.uid,
    };

    const { data } = await axiosPublic.post("/report", repotData);
    if (data.insertedId) {
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Your report is post",
        showConfirmButton: false,
        timer: 1500,
      });
      if (modalRef.current) {
        modalRef.current.close();
      }
    }
  };
  const handleComment = async (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;
    const commentData = {
      comment,
      email: user?.email,
      name: user?.displayName,
      image: user?.photoURL,
      uid: user?.uid,
    };

    const { data } = await axiosPublic.post("/comment", commentData);
    if (data.insertedId) {
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Your comment is post",
        showConfirmButton: false,
        timer: 1500,
      });
      if (commentRef.current) {
        commentRef.current.close();
      }
    }
  };
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div className="bg-gray-100  flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className=" p-8 rounded-lg bg-[#F0EBF8] shadow-lg w-full max-w-md">
        <div className="flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <IoMdArrowRoundBack size={30} /> back
          </button>
          <div className="flex items-center gap-5">
            <div className="tooltip tooltip-left" data-tip="Comment">
              {role?.role === "Pro-User" ? (
                <button onClick={() => commentRef.current.showModal()}>
                  <FaTelegramPlane size={30} />
                </button>
              ) : (
                <Link to='/pricing'>
                  {" "}
                  <FaTelegramPlane size={30} />
                </Link>
              )}
            </div>
            <dialog
              id="my_modal_5"
              ref={commentRef}
              className="modal modal-bottom sm:modal-middle"
            >
              <div className="modal-box">
                <form onSubmit={handleComment}>
                  <textarea
                    placeholder="text your comment here..."
                    name="comment"
                    required
                    className="textarea textarea-bordered textarea-lg mt-3 w-full"
                  ></textarea>
                  <button className="btn">Submit</button>
                </form>

                <div className="modal-action">
                  <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-0">
                      ✕
                    </button>
                  </form>
                </div>
              </div>
            </dialog>
            <button className="" onClick={() => modalRef.current.showModal()}>
              <div className="tooltip tooltip-left" data-tip="Report">
                <button className="">
                  <MdOutlineReportGmailerrorred size={30} />
                </button>
              </div>
            </button>
          </div>
          <dialog
            id="my_modal_5"
            ref={modalRef}
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <form onSubmit={handleReport}>
                <textarea
                  placeholder="text your report here..."
                  name="report"
                  required
                  className="textarea textarea-bordered textarea-lg mt-3 w-full"
                ></textarea>
                <button className="btn">Submit</button>
              </form>

              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-0">
                    ✕
                  </button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="bg-white p-4">
            <h1 className="text-xl font-bold mb-1 text-center text-gray-700">
              Please Answer the Question
            </h1>
            <h1 className="text-xl font-bold mb-6 text-center text-rose-500">
              ( {survey?.category} )
            </h1>

            <h2 className="text-3xl font-bold mb-4 text-gray-700">
              {survey?.title}
            </h2>
            <p className="text-lg mb-6  text-gray-600">
              {survey?.description}?
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="radio-3"
                  value="Yes"
                  onChange={handleOptionChange}
                  className="radio radio-secondary"
                />{" "}
                <span>{survey?.options?.Yes}</span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="radio-3"
                  value="No"
                  onChange={handleOptionChange}
                  className="radio radio-secondary"
                />{" "}
                <span>{survey?.options?.No}</span>
              </div>
              <div className="flex justify-end w-full">
                <button className="bg-rose-500 hover:bg-rose-500 text-white font-semibold btn ">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SurveyForm;
