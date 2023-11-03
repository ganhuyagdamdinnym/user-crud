"use client"
import { useSearchParams } from "next/navigation"
import { useState } from "react";
export default function Login() {
    // const params = useSearchParams();
    // const userId = params.get("UserId")
    const [uservalue, setUservalue] = useState("");
    const [passwordvalue, setPasswordvalue] = useState("");
    const [passwordDone, setPasswordDone] = useState(false)
    const login = async () => {
        const url = `http://localhost:8000/users/${passwordvalue}/${uservalue}`;
        const fetchData = await fetch(url).then((fetchData) => fetchData.json());
        const passData = fetchData.data;
        console.log("aaa", passData);
        if (passData) {
            setPasswordDone(true)
        } else {
            alert('password is wrong')
        }
    }
    return (
        <div>
            {
                passwordDone ? (<div className="bg-white w-screen"></div>) :
                    (<div className="bg-white w-screen h-screen flex  items-center justify-center ">
                        <div className="flex flex-col items-center h-96 gap-5">

                            <div className="flex flex-col gap-2">
                                <input
                                    className="border-solid border-2 w-48 rounded-xl text-[#494b4d]"
                                    onChange={(e) => setUservalue(e.target.value)}
                                    value={uservalue}
                                    placeholder="Username"
                                />
                                <input
                                    className="border-solid border-2 w-48 rounded-xl text-[#494b4d]"
                                    onChange={(e) => setPasswordvalue(e.target.value)}
                                    value={passwordvalue}
                                    placeholder="Password"
                                />
                            </div>
                            <h1
                                onClick={() => login()}
                                className="mt-4 bg-white w-28 px-2 rounded-xl border-black border-2 flex justify-center"
                            >
                                {" "}
                                LOG IN
                            </h1>
                        </div>
                    </div>
                    )
            }


        </div>
    )
}

// yerunhii login => user list => password shalgana => login
// yerunhii login => user list => login