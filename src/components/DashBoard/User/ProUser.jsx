import { MdEmail } from "react-icons/md";

const ProUser = () => {
  return (
    <div>
      <div className=" p-8 sm:flex sm:space-x-6 border-2">
        <div className="flex-shrink-0 w-full mb-6 h-44 sm:h-32 sm:w-32 sm:mb-0">
          <img
            src="https://source.unsplash.com/100x100/?portrait?1"
            alt=""
            className="object-cover object-center w-full h-full rounded dark:bg-gray-500"
          />
        </div>
        <div className="flex flex-col space-y-4">
          <div>
            <h2 className="text-2xl font-semibold">Leroy Jenkins</h2>
            <span className="flex items-center space-x-2">
              <MdEmail />
              <span className="dark:text-gray-600">
                leroy.jenkins@company.com
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProUser;
