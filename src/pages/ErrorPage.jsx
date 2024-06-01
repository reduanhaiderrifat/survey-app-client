import { Helmet } from "react-helmet-async";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <div>
      <Helmet>
        <title>Survey-Page-Not-Found</title>
      </Helmet>
      <div className="  grid grid-cols-1">
        <div className=" h-screen  flex gap-3 flex-col text-center -mt-9 justify-center items-center">
          <div className="w-96 space-y-4 bg-white p-5 rounded-lg">
            <h1 className="text-[100px]"> {error.status}</h1>
            <h1 className="text-3xl text-red-500 font-bold">
              Page {error.statusText}
            </h1>
            <p className="text-red-500">{error.data || error.message}</p>
            <p className=" text-black">
              Looks like you have followed a broken link or entered a URL that
              does not exist on this site.
            </p>
            <Link
              to="/"
              className="relative p-0.5 inline-flex items-center text-green-900 hover:underline justify-center font-bold overflow-hidden group rounded-md"
            >
              <FaArrowLeft /> Back to home
            </Link>
            <hr className="my-5 " />
            <p className="text-black">
              If this is your site, and you were not expecting a {""}
              {error.status}
              {""} for this path, please visit to firebase{" "}
              <span className="hover:underline font-medium text-[#054861]">
                <Link
                  target="_blank"
                  to="https://cloud.google.com/terms/tssg/firebase"
                >
                  {" "}
                  “page not found support guide ”
                </Link>{" "}
              </span>
              for troubleshooting tips.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
