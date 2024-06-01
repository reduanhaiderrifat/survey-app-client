
import { FcGoogle } from "react-icons/fc";


const Google = () => {
    return (
        <button className="btn bg-transparent hover:bg-transparent hover:shadow-lg border"> 
            <div className="flex items-center gap-3">
            <FcGoogle size={25} /> <h1>Google Login</h1>
            </div>
        </button>
    );
};

export default Google;