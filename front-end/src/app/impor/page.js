"use client"
import { useState, useEffect } from "react";
import axios, { isCancel, AxiosError } from "axios";
import { useSearchParams } from "next/navigation";
export default function impor() {
    const [genderstat, setGenderstat] = useState(false)
    const [mobile, setMobile] = useState(false)
    const [gendervalue, setGendervalue] = useState("")
    const [numbervalue, setNumbervalue] = useState("")
    const [users, setUsers] = useState([])
    const params = useSearchParams()
    const id = params.get("Id")

    async function Fetchdata() {
        const url = "http://localhost:8000/users"
        const fetchData = await fetch(url,
        ).then((fetchData) => fetchData.json());

        setUsers(fetchData.data)
        console.log("user", users)
    }
    const profileUser = users.filter(
        (e) => e.id === id
    );
    console.log("lll", profileUser)
    if (profileUser.length === 1) {
        console.log("aaa", profileUser);
    }


    const gender = () => {
        setGenderstat(!genderstat)
    };
    const numberMobile = () => {
        setMobile(!mobile)
    }
    console.log("id", id)
    const edith = async () => {
        await axios.put(`http://localhost:8000/users/`, {
            id: id,
            name: profileUser[0]?.username,
            age: profileUser[0]?.age,
            work: profileUser[0]?.work,
            // hemo_address: upname,
            // mobile_phone: 
            // if(numbervalue){
            //     mobile_phone: 
            // },
            gender: gendervalue,
        });
        setGendervalue("")
        setNumbervalue("")
    }
    useEffect(() => {
        Fetchdata();
    }, [])
    return (
        <div className="flex flex-col items-center gap-3 ">
            <div className="flex flex-row-reverse w-full">
                <h1 onClick={() => edith()} className="text-2xl text-[blue] px-10">Edit</h1>
            </div>
            <h1 onClick={() => homeAddress()} className="text-[blue] text-2xl w-5/12">
                Home address
            </h1>
            {
                genderstat ? (
                    <div className="flex flex-col items-center gap-4 w-full">
                        <h1 onClick={() => gender()} className="text-[blue] text-2xl w-5/12">Gender</h1>
                        <div className="flex  w-5/12">
                            <input
                                onChange={(e) => setGendervalue(e.target.value)}
                                value={gendervalue}
                                className="border-2 border-black rounded-xl px-3 " placeholder="..your gender" />
                        </div>


                    </div>
                ) : (<h1 onClick={() => gender()} className="text-[blue] w-5/12 text-2xl">Gender</h1>)
            }
            {
                mobile ? (<div className="flex flex-col items-center gap-4 w-full">
                    <h1 onClick={() => numberMobile()} className="text-[blue] text-2xl w-5/12">Mobile number</h1>
                    <div className="flex  w-5/12">
                        <input
                            onChange={(e) => setNumbervalue(e.target.value)}
                            value={numbervalue}
                            className="border-2 border-black rounded-xl px-3 " placeholder="..your mobile number" />
                    </div>


                </div>) : (<h1 onClick={() => numberMobile()} className="text-[blue] text-2xl w-5/12">
                    Mobile number
                </h1>)
            }

        </div>
    )
}