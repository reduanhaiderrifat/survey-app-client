import { FaTwitter } from "react-icons/fa";


const Twitter = () => {
    return (
        <button className="btn bg-transparent hover:bg-transparent hover:shadow-lg border"> 
        <div className="flex items-center gap-3">
        <FaTwitter size={25} className="text-sky-500"/> <h1>Twitter Login</h1>
        </div>
    </button>
    );
};

export default Twitter;