"use client"
import { useState } from "react"

export default function SecretPhrase() {
  const [secretPhrase, setSecretPhrase] = useState<string>('pulse depend plug burden person woman estate advance buzz dinosaur certain kitten')
  return (
    <div>
      <div className="mt-12 flex justify-between items-center">
        <h1 className="text-white text-5xl">
          Your Secret Phrase
        </h1 >
        <div className="flex items-center gap-2 ">
          <button className=" refresh bg-white text-xl text-black  font-semibold rounded-lg px-4 py-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 ">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
          </button>
          <button className="bg-[#E5484D] text-xl text-white kameron rounded-lg px-4 py-2 proceed ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 ">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
            </svg>
          </button>
        </div>
      </div >
      <div className="mt-4 px-[80px] scale-x-[1.2]  text-md text-white font-semibold mada rounded-lg p-4 ">
        <span className="flex flex-wrap gap-2 bg-[#111111] rounded-lg p-3">
          {
            secretPhrase.split(' ').slice(0, 12).map((word, index) => {
              return (
                <div key={word} className="bg-[#222222] flex justify-center  mada items-center flex-1 px-4 rounded-lg py-4 uppercase text-white">
                  <span className="scale-x-[0.9] mada">
                    {word}
                  </span>
                </div>
              )
            })
          }
        </span>
      </div>
    </div>
  )

}
