"use client";
import { useState } from "react";
import Navbar from "./Navbar";
import SecretPhrase from "./SecretPhrase";
import WalletContainer from "./WalletContainer";
import Password from "./Password";
import { useRecoilState } from "recoil";
import { passwordHasBeenGenerated } from "../state";
export default function Landing() {
  let passwordHashed;
  if (typeof window !== "undefined") {
    passwordHashed = localStorage.getItem("token");
  }
  const [_passwordHasBeenGenerated, setPasswordHasBeenGenerated] = useRecoilState(passwordHasBeenGenerated);
  return (
    <div className= "container px-3 max-w-5xl mx-auto py-2 pb-8" >
    <Navbar />
  {
    passwordHashed && passwordHasBeenGenerated ?
      <>
      <SecretPhrase />
      < div className = "partition my-6 w-3/4 mx-auto border-t-2 border-[#E5484D]" > </div>
        < WalletContainer />
        </>
          :
    <Password />
  }
  </div >
  );
}
