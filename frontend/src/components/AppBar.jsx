import { Avatar } from "./Avatar";

export function AppBar() {
    const firstname = localStorage.getItem("name");
    return <div className="shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4">
            Payments App
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">
                Hello {firstname}
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <Avatar />
            </div>
        </div>
    </div>
}