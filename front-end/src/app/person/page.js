"use client"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";
import Image from "next/image";
import { Impormation } from "../components/Impormation";
export default function User() {
    const params = useSearchParams();
    const userId = params.get("UserId")
    const [users, setUsers] = useState([]);
    const [photo, setPhoto] = useState(false)
    const [impormation, setImpormation] = useState(true)
    console.log(userId)
    async function fetchAlldata() {
        const url = "http://localhost:8000/users"
        const fetchData = await fetch(url,
        ).then((fetchData) => fetchData.json());

        setUsers(fetchData.data)
        console.log("user", users)
    }

    const profileUser = users.filter(
        (e) => e.id === userId
    );
    console.log("lll", profileUser)
    if (profileUser.length === 1) {
        console.log("aaa", profileUser);
    }
    const profilePhoto = () => {
        setPhoto(!photo)
    }
    const summaryImpormation = () => {
        setImpormation(!impormation)

    }
    useEffect(() => {
        fetchAlldata();
        setPhoto(true)


    }, [])
    return (
        <div className="h-full w-full flex gap-5 flex-col">

            <div className="bg-white  flex items-center flex-col">
                <div style={{ backgroundImage: "url(user.png)" }} className="w-80 h-80 border-black border-8 rounded-[50%] flex justify-center items-center bg-no-repeat bg-center">
                    {/* <img src="user.png" className="w-52" /> */}
                </div>
                <div className="flex flex-col">
                    <Image onClick={() => profilePhoto()} src="camera.svg" height={24} width={24} className="ml-[50px]" />

                </div>
                <h1 className="text-black text-3xl">{profileUser[0]?.username}</h1>

                {
                    photo ? (<div></div>) : (<div className="rounded-xl border-black border-4 w-7/12 h-32 flex justify-center">
                        <h1>Choose profile</h1>
                    </div>)
                }
            </div>

            {
                impormation ? (<div className="bg-white flex justify-center gap-1">

                    <h1 className="text-3xl ">...</h1>
                    <h1 onClick={() => summaryImpormation()} className="text-2xl mt-[10px]">Summary inpormation</h1>
                </div>) : (<div className="flex flex-col items-center text-xl">
                    <Impormation />
                </div>)
            }


        </div>
    )
}
