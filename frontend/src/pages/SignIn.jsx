import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const SignIn = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 px-4 h-max">
                <Heading label={"Sign In"} />
                <SubHeading label={"Enter Your Credentials to Access Your Account"} />
                <InputBox onChange={e=>{
                    setUsername(e.target.value);
                }} label={"Email"} placeholder={"eg: Johndoe@gmail.com"} />
                <InputBox onChange={e=>{
                    setPassword(e.target.value);
                }} label={"Password"} placeholder={"eg: ********"} />
                <Button label={"Sign In"} onClick={async ()=>{
                    const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                        username,
                        password
                    })
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("name", response.data.name);
                    navigate("/");

                }} />
                <BottomWarning label={"Don't have an Account?"} hyperlink={"Sign Up"} to={"/signup"} />
            </div>
        </div>
    </div>
}