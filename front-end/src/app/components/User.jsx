"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export const User = (props) => {
  const router = useRouter();
  const { users, setUsers } = props;
  const [uservalue, setUservalue] = useState("");
  const [passwordvalue, setPasswordvalue] = useState("");
  const [accound, setAccound] = useState([]);
  const login = async () => {
    const url = `http://localhost:8000/users/${passwordvalue}/${uservalue}`;
    const fetchData = await fetch(url).then((fetchData) => fetchData.json());
    // POST GET
    const passData = fetchData.data;
    // setPassData(fetchData.data);
    console.log("aaa", passData);
    if (passData) {
      router.push("/person?UserId=" + passData.id + "");
    } else {
      alert("not accound");
    }
  };
  return (
    <div className="flex items-center flex-col gap-3">
      <h1
        onClick={() => login()}
        className="mt-4 bg-white w-28 px-2 rounded-xl border-black border-2 "
      >
        {" "}
        LOG IN
      </h1>
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
  );
};
