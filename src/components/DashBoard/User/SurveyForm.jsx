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
  const { id } = useParams();
  const { data: survey = {} } = useQuery({
    queryKey: ["userSurvey", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/userSurvey/${id}`);
      return res.data;
    },
  });
  const { data: role = {} } = useQuery({
    queryKey: ["pro-user", user?.uid],
    queryFn: async () => {
      const res = await axiosPublic.get(`/pro-user/${user?.uid}`);
      return res.data;
    },
  });

  const [votes, setVotes] = useState({
    question1: null,
    question2: null,
    question3: null,
  });

  const handleOptionChange = (event, question) => {
    const value = event.target.value;
    setVotes((prevVotes) => ({
      ...prevVotes,
      [question]: value,
    }));
  };

  const calculateVoteCount = () => {
    return Object.values(votes).reduce((acc, vote) => {
      if (vote === "Yes") {
        return acc + 1;
      } else if (vote === "No") {
        return acc - 1;
      }
      return acc;
    }, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const values = Object.values(votes);
    if (values.includes(null)) {
      return toast.error("Please answer all questions");
    }
    //----------------
    const answers = {
      yesAnswers: [],
      noAnswers: [],
    };

    for (const [question, answer] of Object.entries(votes)) {
      if (answer === "Yes") {
        answers.yesAnswers.push(question);
      } else if (answer === "No") {
        answers.noAnswers.push(question);
      }
    }
    //----------------
    const count = calculateVoteCount();
    console.log(count);
    const { data } = await axiosPublic.patch(`/userVote/${survey?._id}`, {
      vote: count,
    });
    await axiosPublic.post(`/userVotePost/${survey?._id}`, answers);
    if (data.modifiedCount > 0) {
      toast.success("Update successful");
    }

    const userSurvey = {
      survey,
      voteId: survey?._id,
      email: user?.email,
      uid: user?.uid,
      name: user?.displayName,
      vote: count,
      answers: answers,
    };

    const res = await axiosPublic.post(
      `/userSurveyPost/${user?.uid}`,
      userSurvey
    );

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
    const reportData = {
      report,
      email: user?.email,
      name: user?.displayName,
      image: user?.photoURL,
      uid: user?.uid,
    };

    const { data } = await axiosPublic.post("/report", reportData);
    if (data.insertedId) {
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Your report is posted",
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
        title: "Your comment is posted",
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
    <div className="bg-gray-100 flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="p-8 rounded-lg bg-[#F0EBF8] shadow-lg w-full max-w-md">
        <div className="flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <IoMdArrowRoundBack size={30} /> Back
          </button>
          <div className="flex items-center gap-5">
            <div className="tooltip tooltip-left" data-tip="Comment">
              {role?.role === "Pro-User" ? (
                <button onClick={() => commentRef.current.showModal()}>
                  <FaTelegramPlane size={30} />
                </button>
              ) : (
                <Link to="/pricing">
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
                    placeholder="Text your comment here..."
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
                  placeholder="Text your report here..."
                  name="report"
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
        </div>
        <form onSubmit={handleSubmit}>
          <div className="bg-white p-4">
            <h1 className="text-xl font-bold mb-1 text-center text-gray-700">
              Please Answer the Question
            </h1>
            <h1 className="text-xl font-bold mb-6 text-center text-rose-500">
              ({survey?.category})
            </h1>

            <h2 className="text-3xl font-bold mb-4 text-gray-700">
              .{survey?.title}
            </h2>
            <p className="text-lg mb-6 text-gray-600">
              {" "}
              <strong> Q.</strong> {survey?.description}?
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="question1"
                  value="Yes"
                  onChange={(e) => handleOptionChange(e, "question1")}
                  className="radio radio-secondary"
                />{" "}
                <span>{survey?.options?.Yes}</span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="question1"
                  value="No"
                  onChange={(e) => handleOptionChange(e, "question1")}
                  className="radio radio-secondary"
                />{" "}
                <span>{survey?.options?.No}</span>
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-4 mt-7 text-gray-700">
              .{survey?.title1}
            </h2>
            <p className="text-lg mb-6 text-gray-600">
              <strong> Q. </strong>
              {survey?.description1}?
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="question2"
                  value="Yes"
                  onChange={(e) => handleOptionChange(e, "question2")}
                  className="radio radio-secondary"
                />{" "}
                <span>{survey?.options?.Yes}</span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="question2"
                  value="No"
                  onChange={(e) => handleOptionChange(e, "question2")}
                  className="radio radio-secondary"
                />{" "}
                <span>{survey?.options?.No}</span>
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-4 mt-5 text-gray-700">
              .{survey?.title2}
            </h2>
            <p className="text-lg mb-6 text-gray-600">
              <strong> Q. </strong>
              {survey?.description2}?
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="question3"
                  value="Yes"
                  onChange={(e) => handleOptionChange(e, "question3")}
                  className="radio radio-secondary"
                />{" "}
                <span>{survey?.options?.Yes}</span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="question3"
                  value="No"
                  onChange={(e) => handleOptionChange(e, "question3")}
                  className="radio radio-secondary"
                />{" "}
                <span>{survey?.options?.No}</span>
              </div>
              <div className="flex justify-end w-full">
                <button className="bg-rose-500 hover:bg-rose-500 text-white font-semibold btn">
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
