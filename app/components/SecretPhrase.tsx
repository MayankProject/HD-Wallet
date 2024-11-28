"use client"
import { useEffect, useState } from "react"
import { generateMnemonic } from "bip39";
import { useRecoilState } from "recoil";
import { secretPhraseHasBeenGenerated } from "../state";
export default function SecretPhrase() {
  const [secretPhrase, setSecretPhrase] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [password, setPassword] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [priviewSecretPhrase, setPriviewSecretPhrase] = useState("");
  const [_secretPhraseHasBeenGenerated, setSecretPhraseHasBeenGenerated] = useRecoilState(secretPhraseHasBeenGenerated)
  const handleCopy = () => {
    navigator.clipboard.writeText(secretPhrase)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
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
            !loading && secretPhrase && secretPhrase.split(' ').slice(0, 12).map((word, index) => {
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
        {!loading && secretPhrase && <div onClick={handleCopy} className="w-full hover-to-copy h-full absolute backdrop-blur-sm hover:opacity-100 opacity-0 transition-all cursor-pointer left-0 top-0 rounded-[20px] flex justify-center items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
          </svg>
          <h1 className="text-white mada scale-x-[0.9] text-2xl ">
            {
              copied ? "Copied!" : "Click Anywhere to Copy"
            }
          </h1>
        </div>}
      </div>
    </div>
  )

}
