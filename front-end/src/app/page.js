
"use client"

import { useState, useEffect } from "react"
import Image from "next/image";
import axios, { isCancel, AxiosError } from 'axios';
import { Users } from "./components/Users";
import { User } from "./components/User";

export default function App() {
  const [passWord, setPassWord] = useState("")
  const [lastpassWord, setLastpassWord] = useState("")
  const [currentpassWord, setCurrentpassWord] = useState("")
  const [currentpassWord2, setCurrentpassWord2] = useState("")
  const [passwordchange, setPasswordchange] = useState(false)
  const [users, setUsers] = useState([]);
  const [passData, setPassData] = useState([])
  const [uservalue, setUservalue] = useState("")
  const [agevalue, setAgevalue] = useState("")
  const [passvalue, setPassvalue] = useState("")
  const [workvalue, setWorkvalue] = useState("")
  const [status, setStatus] = useState(false)

  const [color, setColor] = useState("black")

  async function keydata() {
    const url = "http://localhost:8000/password"
    const fetchData = await fetch(url,).then((fetchData) => fetchData.json());
    setPassData(fetchData.data)
    console.log("key", passData)
  }

  async function fetchAlldata() {
    const url = "http://localhost:8000/users"
    const fetchData = await fetch(url,
    ).then((fetchData) => fetchData.json());

    setUsers(fetchData.data)
    console.log("user", users)
  }
  async function subMit(e) {
    setUservalue("");
    setAgevalue("")
    setWorkvalue("")
    setPassvalue("")
    console.log(workvalue)
    const instance = await axios.post('http://localhost:8000/users', {
      name: uservalue,
      age: agevalue,
      work: workvalue,
      password: passvalue,
      mobile_phone: "",
      gender: "",
      home_address: ""
    })
      .then((response) => {
        console.log(response.data);
        setUsers(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function Gear() {
    setPasswordchange(!passwordchange)
    console.log(passWord)
  }
  // async function changePass() {
  //  // const pass = passData?.filter((e) => (e.password)).toString()
  //   localStorage.setItem("lastpassword", "" + pass + "");

  //   if (lastpassWord !== localStorage.getItem("lastpassword")) {
  //     alert("last password is wrong")
  //   } else {
  //     //const passId = passData?.map((e) => (e.id)).toString()

  //     ///localstorage
  //     localStorage.setItem("passwordID", "" + passId + "");

  //     await axios.put("http://localhost:8000/password", {
  //       id: localStorage.getItem("lastpassword"),
  //       password: currentpassWord
  //     }).then((res) => {
  //       setPassData(res.data)
  //     })
  //   }


  // }

  function changePass() {
    if (lastpassWord == localStorage.getItem("lastpassword") && currentpassWord == currentpassWord2) {

      localStorage.setItem("lastpassword", "" + currentpassWord + "")
    } else if (lastpassWord == localStorage.getItem("lastpassword") && currentpassWord !== currentpassWord2) {
      alert("current password is wrong")
    } else if (!localStorage.getItem("lastpassword")) {
      localStorage.setItem("lastpassword", "" + currentpassWord + "")
    } else {
      alert("last password is wrong")
    }
  }
  function Key() {
    console.log(localStorage.getItem("lastpassword"))
    /// const newData = passData?.map((e) => (e.password))
    if (passWord == localStorage.getItem("lastpassword")) {
      setStatus(true)
    } else {
      alert("Password is wrong")
      setStatus(false)
    }
  }


  ///use Effect
  useEffect(() => {
    keydata();
    fetchAlldata();

  }, [])
  console.log(users);
  return (
    <div className="bg-black h-screen">
      {status ? (<div className="App">
        <div className="flex gap-10 flex-col">
          <div className="flex justify-center">
            {/* <div> */}
            <h1 className="bg-[#494b4d] text-white px-2 rounded-xl border-black border-2">User CRUD with FS Module</h1>
            <Image src="gear.svg" width={16} height={16} onClick={() => Gear()} />
            {/* </div> */}
          </div>
          <div className="flex justify-center">
            {
              passwordchange ? (<div className=" bg-white w-5/12 rounded-xl  ">
                <div className="flex justify-center flex-col items-center gap-2">
                  <h1>Change Password</h1>
                  <input className="rounded-xl border-${} border-2 w-60"
                    placeholder="Last password.."
                    onChange={(e) => setLastpassWord(e.target.value)}
                    value={lastpassWord}
                  />
                  <input className=" rounded-xl border-black border-2 w-60"
                    placeholder="Current password.."
                    onChange={(e) => setCurrentpassWord(e.target.value)}
                    value={currentpassWord}
                    type="password"
                  />
                  <input className=" rounded-xl border-black border-2 w-60"
                    placeholder="Current password.."
                    onChange={(e) => setCurrentpassWord2(e.target.value)}
                    value={currentpassWord2}
                    type="password"
                  />
                  <button onClick={() => changePass()} className="bg-black text-white px-2 rounded-xl">Change</button>
                  <User
                    users={users}
                    setUsers={setUsers}
                  />
                </div>
              </div>
              ) : (
                <div></div>
              )
            }
          </div>

          <div className="flex gap-5 justify-center">
            <input placeholder="Name" className="bg-[#494b4d] text-white border-black border-2 px-2 rounded-xl" onChange={(e) => setUservalue(e.target.value)}
              value={uservalue}
            />
            <input placeholder="Age" className="bg-[#494b4d] text-white border-black border-2 px-2 rounded-xl" onChange={(e) => setAgevalue(e.target.value)}
              value={agevalue} />
            <input placeholder="Work" className="bg-[#494b4d] text-white border-black border-2 px-2 rounded-xl" onChange={(e) => setWorkvalue(e.target.value)}
              value={workvalue} />
            <input placeholder="Password.." className="bg-[#494b4d] text-white border-black border-2 px-2 rounded-xl" onChange={(e) => setPassvalue(e.target.value)}
              value={passvalue} />
            <button onClick={subMit} className=" border-black border-2 bg-white rounded-xl text-black px-4">Submit</button>
          </div>
        </div>
        <div className="flex justify-center">

          <h1 className="mt-4 bg-white w-28 px-2 rounded-xl border-black border-2 "> USER LIST</h1>
        </div>
        <div className="flex flex-col mt-4">
          <div className="flex justify-center">
            <h1 className="w-48 text-white border-black border-2 bg-[#494b4d] justify-center">Name</h1>
            <h1 className="w-48 text-white border-black border-2 bg-[#494b4d] ">Age</h1>
            <h1 className="w-48 text-white border-black border-2 bg-[#494b4d]"> Work</h1>
            <h1 className="w-20 text-white border-black border-2 bg-[#494b4d]"> Update</h1>
            <h1 className="w-20 text-white border-black border-2 bg-[#494b4d]"> Delete</h1>

          </div>
          {
            users?.map((user) => (
              <Users
                id={user.id}
                username={user.username}
                age={user.age}
                work={user.work}
                users={users}
                setUsers={setUsers}
                workvalue={workvalue}
                agevalue={agevalue}
                uservalue={uservalue}

              />
            ))
          }
        </div>


      </div>) : (
        <div className="flex flex-col items-center  mt-60 gap-10 bg-white h-screen">
          <div className="flex justify-center">
            <h1 className="bg-white text-black px-2 rounded-xl border-black border-2">User CRUD with FS Module</h1>
          </div>
          <div className="flex justify-center " >
            <input className=" rounded-xl border-black border-2 w-60"
              placeholder="Password.."
              onChange={(e) => setPassWord(e.target.value)}
              value={passWord}
              type="password"
            />
            <Image src="eye.svg" height={16} width={16} className="ml-[-40px] mr-7" />
            <Image src="key.svg" height={16} width={16} className="ml-[-25px]"
              onClick={() => Key()}
            />
          </div>
        </div>
      )}


    </div>
  )
}


