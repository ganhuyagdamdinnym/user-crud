"use client";
import { useRouter } from "next/navigation";
export function Impormation(props) {
  const { id, profileUser } = props;
  console.log(id);
  const router = useRouter();
  const homeAddress = () => {};

  const impor = () => {
    router.push("/impor?Id=" + id + "");
  };
  return (
    <div className="w-5/12">
      <div className="flex flex-row-reverse w-full">
        <h1 onClick={() => impor()} className="text-[blue]">
          Edit
        </h1>
      </div>
      <h1 className="text-[blue]">Main impormation</h1>
      <div>
        <h1 className="text-[blue] text-2xl">Age:{profileUser[0]?.age}</h1>
        <h1 className="text-[blue] text-2xl">Work:{profileUser[0]?.work}</h1>
        <h1 className="text-[blue] text-2xl">
          Gender:{profileUser[0]?.gender}
        </h1>
        <h1 className="text-[blue] text-2xl">
          Mobile number:{profileUser[0]?.mobile_phone}
        </h1>
      </div>
    </div>
  );
}
