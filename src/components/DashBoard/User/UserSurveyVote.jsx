import { useQuery } from "@tanstack/react-query";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { FaTelegramPlane } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import Loader from "../../loader/Loader";

const UserSurveyVote = () => {
  const axiosSecure = useAxiosSecure();
  const modalRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const location = useLocation();
  const commentRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: survey = {}, isLoading } = useQuery({
    queryKey: ["userSurvey", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/userSurvey/${id}`);
      return res.data;
    },
  });
  const { data: role = {} } = useQuery({
    queryKey: ["pro-user", user?.uid],
    queryFn: async () => {
      const res = await axiosSecure.get(`/pro-user/${user?.uid}`);
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
    setLoading(true);
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
    const voteResponse = await axiosSecure.get(`/userSurvey/${survey._id}`);
    const currentVote = parseInt(voteResponse.data.options.vote);
    const { data } = await axiosSecure.patch(`/userVote/${survey?._id}`, {
      vote: currentVote + 1,
    });
    await axiosSecure.post(`/userVotePost/${survey?._id}`, answers);
    if (data.modifiedCount > 0) {
      toast.success("Vote count sent successfully");
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

    const res = await axiosSecure.post(`/userSurveyPost`, userSurvey);

    if (res.data.insertedId) {
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Your survey response is done",
        showConfirmButton: false,
        timer: 1500,
      });
      setLoading(false);
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

    const { data } = await axiosSecure.post("/report", reportData);
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

    const { data } = await axiosSecure.post("/comment", commentData);
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
  const { data: likes = [], refetch } = useQuery({
    queryKey: ["like", survey._id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/like/${survey._id}`);
      return data;
    },
  });
  const { data: dislikes = [], refetch: dislikeRefetch } = useQuery({
    queryKey: ["dislike", survey._id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/dislike/${survey._id}`);
      return data;
    },
  });
  useEffect(() => {
    refetch();
    dislikeRefetch();
  }, [refetch, dislikeRefetch]);
  const handleLike = async () => {
    const likeData = {
      uid: user?.uid,
      itemId: survey?._id,
    };
    try {
      const { data } = await axiosSecure.post(`/like/${survey?._id}`, likeData);

      if (data && data.insertedId) {
        toast.success("Your like has been posted");
        refetch();
      } else {
        throw new Error("You already like or disLike");
      }
    } catch (error) {
      toast.error("You already like or disLike");
    }
  };
  const handleDisLike = async () => {
    const likeData = {
      uid: user?.uid,
      itemId: survey?._id,
    };
    try {
      const { data } = await axiosSecure.post(
        `/dislike/${survey?._id}`,
        likeData
      );

      if (data && data.insertedId) {
        toast.success("Your like has been posted");
        dislikeRefetch();
      } else {
        throw new Error("You already like or disLike");
      }
    } catch (error) {
      toast.error("You already like or disLike");
    }
  };
  if (isLoading) return <Loader />;

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div>
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
              <div className="flex gap-1">
                <button onClick={handleLike} className="focus:text-orange-500">
                  <AiFillLike size={25} />
                </button>{" "}
                ({likes?.length})
                <button onClick={handleDisLike} className="focus:text-orange-500">
                  <AiFillDislike size={25} />
                </button>{" "}
                ({dislikes?.length})
              </div>
              <div className="tooltip tooltip-left" data-tip="Comment">
                {role?.role === "Pro-User" ? (
                  <button onClick={() => commentRef.current.showModal()}>
                    <FaTelegramPlane size={30} />
                  </button>
                ) : (
                  <Link to="/pricing" state={location.pathname} replace={true}>
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
                    <button className="btn  bg-rose-500 text-white hover:bg-rose-500">
                      Submit
                    </button>
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
                  <button className="btn  bg-rose-500 text-white hover:bg-rose-500">
                    Submit
                  </button>
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

              <h2 className="text-2xl font-bold mb-4 text-gray-700">
                .{survey?.title}
              </h2>
              <p className="text-lg mb-6 text-gray-600">
                {" "}
                <strong>Q1.</strong> {survey?.description}?
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
              <h2 className="text-2xl font-bold mb-4 mt-7 text-gray-700">
                .{survey?.title1}
              </h2>
              <p className="text-lg mb-6 text-gray-600">
                <strong> Q2. </strong>
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
              <h2 className="text-2xl font-bold mb-4 mt-5 text-gray-700">
                .{survey?.title2}
              </h2>
              <p className="text-lg mb-6 text-gray-600">
                <strong> Q3. </strong>
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
                    {loading ? (
                      <span className="loading loading-spinner loading-md"></span>
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserSurveyVote;
