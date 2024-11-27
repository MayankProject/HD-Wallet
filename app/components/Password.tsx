"use client";
import bcrypt from "bcryptjs";
import { useState } from "react";
import { passwordHasBeenGenerated } from "../state";
import { useRecoilState } from "recoil";
export default function Password() {
  const [password, setPassword] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [_passwordHasBeenGenerated, setPasswordHasBeenGenerated] = useRecoilState(passwordHasBeenGenerated);
  const handleSubmit = () => {
    if (password.length < 5) {
      setShowWarning(true);
      return;
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    setPasswordHasBeenGenerated(true);
    localStorage.setItem("token", hashedPassword);
  };
  return (
    <div className="h-[80vh] flex items-center justify-center">
      <div className="text-white bg-[#111111] p-12 rounded-[20px] w-full mx-auto">
        <h1 className="text-3xl font-bold">Set Your Password |
          <span className="text-xl mx-4 text-[#605757]">
            You are visiting the first time
          </span>
        </h1>
        <div className="flex mt-5  gap-2">
          <input value={password} onChange={(e) => {
            setPassword(e.target.value);
          }} type="password" className="w-full py-2 rounded-r-lg mada bg-transparent border border-white rounded-[20px] outline-none text-white px-6" placeholder="Password" />
          <button onClick={handleSubmit} className="bg-[#E5484D] text-xl text-white kameron rounded-lg px-4 proceed ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 ">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
            </svg>
          </button>
        </div>
        {
          showWarning &&
          <div className="text-red-400 mada text-sm px-3 mt-2">Your password must be 5 characters long.</div>
        }
      </div>
    </div >
  );
} 
