import { useNavigate } from "react-router-dom";
import { Avatar } from "./Avatar";

export function AppBar() {
    const firstname = localStorage.getItem("name");
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        navigate("/signin");
    }

    return (
        <div className="shadow h-14 flex justify-between items-center px-4">
            <div className="text-lg font-semibold">
                Payments App
            </div>
            <div className="flex items-center space-x-4">
                <div className="text-sm">Hello {firstname}</div>
                <div className="rounded-full h-10 w-10 bg-slate-200 flex justify-center items-center">
                    <Avatar />
                </div>
                <button onClick={handleLogout} className="w-24 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                    logout
                </button>
            </div>
        </div>
    );
}