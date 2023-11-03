import Image from "next/image";
import axios, { isCancel, AxiosError } from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
export function Users(props) {
  const router = useRouter();
  const {
    id,
    work,
    username,
    age,
    users,
    setUsers,
    uservalue,
    agevalue,
    workvalue,
  } = props;
  const [upname, setUpname] = useState("");
  const [upage, setUpage] = useState("");
  const [upwork, setUpwork] = useState("");
  const [status, setStatus] = useState(false);

  async function DeleteUser() {
    console.log("id", id);
    const res = await axios.delete(`http://localhost:8000/users/${id}`, {
      name: uservalue,
      age: agevalue,
      work: workvalue,
    });
    setUsers(res.data.data);
  }

  function Update() {
    setStatus(!status);
  }
  async function overUpdate() {
    const res = await axios.put(`http://localhost:8000/users/`, {
      id: id,
      name: upname,
      age: upage,
      work: upwork,
    });
    setUsers(res.data.data);
    setStatus(!status);
    console.log(id);
  }
  const jumpLogin = () => {
    router.push("/login");
  };
  return (
    <div className="flex items-center rounded-xl justify-center">
      {status ? (
        <div className="flex">
          {/* {" "} */}

          <input
            className="border-solid border-2 w-48 rounded-xl text-[#494b4d]"
            onChange={(e) => setUpname(e.target.value)}
            value={upname}
            placeholder="Name"
          />
        </div>
      ) : (
        <h1
          onClick={() => jumpLogin()}
          className="w-48 text-white border-black border-2 h-7 bg-[#494b4d]"
        >
          {username}
        </h1>
      )}
      {status ? (
        <div className="flex">
          <input
            className="border-solid rounded-xl border-2 w-48 text-[#494b4d]"
            onChange={(e) => setUpage(e.target.value)}
            value={upage}
            placeholder="Age"
          />
        </div>
      ) : (
        <h1 className="w-48 text-white border-black border-2 h-7 bg-[#494b4d]">
          {age}
        </h1>
      )}

      {status ? (
        <div className="flex">
          {/* {" "} */}
          <input
            onChange={(e) => setUpwork(e.target.value)}
            value={upwork}
            className="border-solid rounded-xl border-2 w-48 text-[#494b4d]"
            placeholder="Work.."
          />
        </div>
      ) : (
        <h1 className="w-48 text-white border-black border-2 h-7 bg-[#494b4d]">
          {work}
        </h1>
      )}
      {status ? (
        <h1
          onClick={() => overUpdate(id)}
          e
          className="w-20 text-black border-black border-2 bg-[#494b4d] h-7 flex justify-center items-center"
        >
          <Image src="pen.svg" height={16} width={16} />
        </h1>
      ) : (
        <h1
          onClick={() => Update()}
          className="w-20 text-black border-black border-2 bg-[#494b4d] h-7 flex justify-center items-center"
        >
          <Image src="pen.svg" height={16} width={16} />
        </h1>
      )}
      <h1
        onClick={() => DeleteUser()}
        className="w-20 text-black border-black border-2 h-7 bg-[#494b4d] flex justify-center items-center"
      >
        <Image src="trash.svg" height={16} width={16} />
      </h1>
    </div>
  );
}
