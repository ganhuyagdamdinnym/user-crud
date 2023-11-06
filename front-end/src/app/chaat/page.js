"use client"

import axios from "axios"
import { useState } from "react"

export default function Chaat() {
    const [namevalue, setNamevalue] = useState("")
    const [chatvalue, setChatvalue] = useState("")
    const send = async () => {
        await axios.post("http://localhost:8000/chaat", {
            byname: namevalue,
            chat: chatvalue
        })
    }
    return (
        <div className="flex flex-col gap-3">

            <div className="flex">
                <h1>name:</h1>
                <input className="border-2 border-black rounded-2xl px-3" placeholder="name" onChange={(e) => setNamevalue(e.target.value)} value={namevalue} />
            </div>
            <div className="flex gap-2">
                <h1>chat:</h1>
                <input onChange={(e) => setChatvalue(e.target.value)} value={chatvalue} className="border-2 border-black rounded-2xl px-3" placeholder="chat" />
                <button onClick={() => send()} className="border-black border-2 bg-black rounded-xl text-white px-4">send</button>
            </div>

        </div>
    )
}