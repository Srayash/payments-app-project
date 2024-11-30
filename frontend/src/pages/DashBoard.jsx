import { AppBar } from "../components/AppBAr"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"

export const DashBoard = () =>{
   return<>
    <AppBar/>
    <div className="m-8">
        <Balance value={"10,000"} />
        <Users />
    </div>
   </> 
}