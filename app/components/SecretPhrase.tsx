"use client"
import { useEffect, useState } from "react"
import { generateMnemonic } from "bip39";
import bcrypt from "bcryptjs";
import { useRecoilState } from "recoil";
import { secretPhraseHasBeenGenerated } from "../state";
import Copy from "./Copy";
export default function SecretPhrase() {
  const [secretPhrase, setSecretPhrase] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [password, setPassword] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [priviewSecretPhrase, setPriviewSecretPhrase] = useState("");
  const [_secretPhraseHasBeenGenerated, setSecretPhraseHasBeenGenerated] = useRecoilState(secretPhraseHasBeenGenerated)
  const [locked, setLocked] = useState(true);
  const handleUnlock = () => {
    const passwordHashed = localStorage.getItem("token");
    if (bcrypt.compareSync(password, passwordHashed as string)) {
      setLocked(false);
      setShowWarning(false);
      setTimeout(() => {
        setLocked(true);
      }, 10000);
    } else {
      setShowWarning(true);
    }
  }
  const handleSubmit = () => {
    localStorage.setItem("secretPhrase", priviewSecretPhrase);
    localStorage.setItem("walletDetails", JSON.stringify({
      "SOL": {
        "currencyName": "Solana",
        wallets: []
      },
      "ETH": {
        "currencyName": "Ethereum",
        wallets: []
      }
    }));
    setSecretPhraseHasBeenGenerated(true);
    setSecretPhrase(priviewSecretPhrase);
  };
  const generateRandomPhrase = () => {
    const mnemonic = generateMnemonic();
    setPriviewSecretPhrase(mnemonic);
  }
  useEffect(() => {
    generateRandomPhrase();
    const secretPhrase = localStorage.getItem('secretPhrase')
    setLoading(false)
    if (secretPhrase) {
      setSecretPhrase(secretPhrase as string)
    }
  }, [])
  return (
    <div>
      <div className="mt-12 relative flex justify-between items-center">
        <h1 className="text-white text-5xl">
          Your Secret Phrase
        </h1 >
        {
          !loading && !secretPhrase &&
          <div className="flex items-center gap-2 ">
            <button onClick={generateRandomPhrase} className=" refresh bg-white text-xl text-black  font-semibold rounded-lg px-4 py-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 ">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
            </button>
            <button onClick={handleSubmit} className="bg-[#E5484D] text-xl text-white kameron rounded-lg px-4 py-2 proceed ">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 ">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
              </svg>
            </button>
          </div>
        }
      </div >
      <div className="mt-4 px-[80px] scale-x-[1.2]  text-md text-white font-semibold mada rounded-lg p-4 ">
        <div className="flex flex-wrap gap-2 bg-[#111111] rounded-lg p-3">
          {
            // When Secret Phrase has been generated and not locked
            !loading && secretPhrase && !locked && secretPhrase.split(' ').slice(0, 12).map((word, index) => {
              return (
                <div key={word} className="bg-[#222222] cursor-pointer flex justify-center  mada items-center flex-1 px-4 rounded-lg py-4 uppercase text-white">
                  <span className="scale-x-[0.9] mada">
                    {word}
                  </span>
                </div>
              )
            })
          }
          {
            // When Secret Phrase has been generated and locked
            !loading && secretPhrase && locked && <div className="flex w-full justify-center py-8">
              <div>
                <div className="flex gap-2">
                  <input value={password} onChange={(e) => {
                    setPassword(e.target.value);
                  }} type="password" className="w-full py-2 rounded-lg mada bg-transparent border border-white  outline-none text-white px-6" placeholder="Password" />
                  <button onClick={handleUnlock} className="bg-[#E5484D] text-xl text-white kameron rounded-lg px-4 proceed ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 ">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
                    </svg>
                  </button>
                </div>
                {
                  showWarning &&
                  <div className="text-red-400 mada text-sm px-3 mt-2">Your password is incorrect.</div>
                }
              </div>
            </div>
          }
          {
            // When Secret Phrase has not been generated 
            !loading && !secretPhrase &&
            priviewSecretPhrase.split(' ').slice(0, 12).map((word, index) => {
              return (
                <div key={word} className="bg-[#222222] flex justify-center  mada items-center flex-1 px-4 rounded-lg py-4 uppercase text-white">
                  <span className="scale-x-[0.9] mada">
                    {word}
                  </span>
                </div>
              )
            })
          }
        </div>
        {!loading && secretPhrase && !locked && <Copy text={secretPhrase} />}
      </div>
    </div>
  )

}
