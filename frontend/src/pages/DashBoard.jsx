import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar } from "../components/AppBAr";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";

export const DashBoard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        console.log("useEffect running");

        async function fetchUserOrRedirect() {
            const token = localStorage.getItem("token");
            console.log("Token in localStorage:", token);

            if (!token || token === "null" || token === "undefined") {
                navigate("/signin");
                return;
            }

            try {
                const res = await fetch("http://localhost:3000/api/v1/user/get-user", {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                });

                if (res.status === 403) {
                    navigate("/signin"); 
                    return;
                }

                const data = await res.json();
                console.log("User:", data.user);
            } catch (err) {
                console.error("Error fetching user", err);
                navigate("/signin");
            }
        }

        fetchUserOrRedirect();
    }, [navigate]);


    return (
        <>
            <AppBar />
            <div className="m-8">
                <Balance value={"10,000"} />
                <Users />
            </div>
        </>
    );
};
