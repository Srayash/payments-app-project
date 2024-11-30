import { useSearchParams } from 'react-router-dom';
import axios from "axios";
import { useState } from 'react';
import { Heading } from '../components/Heading';
import { InputBox } from '../components/InputBox';
import { Button } from '../components/Button';

export const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);

    return <div className="flex justify-center h-screen bg-gray-100">
        <div className="h-full flex flex-col justify-center">
            <div
                className="border h-min text-center text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg"
            >
                <Heading label={"Send Money"} />
                <div className="p-2">
                <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-slate-500 flex items-center justify-center">
                    <span className="text-2xl text-white">{name[0].toUpperCase()}</span>
                    </div>
                    <h3 className="text-2xl font-semibold">{name}</h3>
                </div>
                <InputBox label={"Amount (in Rs)"} placeholder={"Enter Amount"} onChange={e=>{
                    setAmount(e.target.value);
                }}/>
                <Button label={"Initiate Transfer"} onClick={()=>{
                    axios.put("http://localhost:3000/api/v1/account/transfer", {
                        amount: Number(amount),
                        to: id
                    }, {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token")
                        }
                    })
                }}/>
                </div>
        </div>
      </div>
    </div>
}


{/* <button onClick={() => {
                        axios.put("http://localhost:3000/api/v1/account/transfer", {
                            amount: Number(amount),
                            to: id,
                        }, {
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("token")
                            }
                        })
                    }} className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
                        Initiate Transfer
                    </button> */}