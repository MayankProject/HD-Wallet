"use client";
import Navbar from "./Navbar";
import SecretPhrase from "./SecretPhrase";
import WalletContainer from "./WalletContainer";
import Password from "./Password";
import { useRecoilState } from "recoil";
import { passwordHasBeenGenerated } from "../state";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
export default function Landing() {
  const [passwordHashed, setPasswordHashed] = useState<string | null>(null);
  const [_passwordHasBeenGenerated, setPasswordHasBeenGenerated] = useRecoilState(passwordHasBeenGenerated);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setPasswordHashed(localStorage.getItem("token"));
    setLoading(false);
  }, []);
  if (!loading && !passwordHashed) {
    redirect("/set-password");
  }
  return (
    <>
      <Navbar />
      {
        !loading ? (
          <>
            <SecretPhrase />
            < div className="partition my-6 w-3/4 mx-auto border-t-2 border-[#E5484D]" > </div>
            < WalletContainer />
          </>
        )
          : <div className="h-[80vh] flex items-center justify-center py-2">
            <div className="text-white bg-[#111111] flex items-center animate-pulse p-12 h-full rounded-[20px] w-full mx-auto">
              <h1 className="text-3xl font-bold mx-auto"></h1>
            </div>
          </div>
      }

    </>
  );
}
