import { useState } from "react";
import axios from "axios";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign Up"} />
                <SubHeading label={"Enter Your Information to Create an Account"} />
                <InputBox onChange={e=>{
                    setFirstname(e.target.value);
                }} label={"First Name"} placeholder={"eg: John"} />
                <InputBox onChange={e=>{
                    setLastname(e.target.value);
                }} label={"Last Name"} placeholder={"eg: Doe"} />
                <InputBox onChange={e=>{
                    setUsername(e.target.value);
                }} label={"Email"} placeholder={"eg: Johndoe@gmail.com"} />
                <InputBox onChange={e=>{
                    setPassword(e.target.value);
                }} label={"Password"} placeholder={"eg: ********"} />
                <Button label={"Sign Up"} onClick={async ()=>{
                    const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                        username,
                        password,
                        firstname,
                        lastname
                    });
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("name", response.data.name);
                    navigate("/");
                }}/>
                <BottomWarning label={"Already have an Account?"} hyperlink={"Sign in"} to={"/signin"}/>
            </div>
        </div>
    </div>
}