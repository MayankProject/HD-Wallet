"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion"

export default function WalletContainer() {
  const [tabSelect, setTabSelect] = useState<number>(1);
  const [instanceId] = useState<number>(Math.random())
  const [TabID, setTabId] = useState<number>(0)
  const [selectedCurrency, setSelectedCurrency] = useState<"SOL" | "ETH">("SOL")
  const [walletDetails, setWalletDetails] = useState<{
    "SOL": {
      "currencyName": "Solana";
      wallets: {
        privateKey: string;
        publicKey: string;
      }[];
    };
    "ETH": {
      "currencyName": "Ethereum";
      wallets: {
        privateKey: string;
        publicKey: string;
      }[];
    };
  }>({
    "SOL": {
      "currencyName": "Solana",
      wallets: [{
        privateKey: "355e0bb6ceaf0b8b94fb9f1058fed0d782311f316c8d780",
        publicKey: "0x1234567890123456789012345678901234567890"
      },
      {
        privateKey: "355e0bb6ceaf0b8b94fb9f1058fed0d782311f316c8d780",
        publicKey: "0x1234567890123456789012345678901234567890"
      },
      {
        privateKey: "355e0bb6ceaf0b8b94fb9f1058fed0d782311f316c8dde195be55c63f0e61780",
        publicKey: "0x1234567890123456789012345678901234567890"
      }]
    },
    "ETH": {
      "currencyName": "Ethereum",
      wallets: [{
        privateKey: "355e0bb6ceaf0b8b94fb9f1058fed0d782311f316c8dde195be55c63f0e61780",
        publicKey: "0x1234567890123456789012345678901234567890"
      },
      {
        privateKey: "355e0bb6ceaf0b8b94fb9f1058fed0d782311f316c8dde195be55c63f0e61780",
        publicKey: "0x1234567890123456789012345678901234567890"
      }]
    }
  })
  return (
    <div>
      <div className="text-xl text-white font-semibold flex items-center justify-between" >
        <div className="flex items-center text-xl gap" >
          {
            Object.entries(walletDetails).map((item, index) => (
              <div key={index} className={`${selectedCurrency === item[0] && "bg-[#E5484D] text-white"} transition-all cursor-pointer flex justify-center mada items-center px-6 rounded-[20px] py-2 uppercase`} onClick={() => {
                setSelectedCurrency(item[0] as "SOL" | "ETH")
                setTabSelect(1)
                setTabId(0)
              }}>
                {item[1].currencyName}
              </div>
            ))
          }
        </div>
        < div className="flex gap-1 text-[14px]" >
          {
            walletDetails[selectedCurrency]["wallets"].map((item, index) => (
              <div
                onClick={() => {
                  setTabSelect(index + 1)
                  setTabId(index)
                }
                }
                key={index}
                className="relative cursor-pointer flex justify-center mada items-center flex-1 px-4 rounded-lg py-2 uppercase text-white"
              >
                {
                  tabSelect - 1 === index && (
                    <AnimatePresence>
                      <motion.span
                        animate={{ scale: [1, 1.5, 1] }}
                        layout
                        layoutId={`bubble-${instanceId}`
                        }
                        className="absolute bg-[#222222] inset-0 -z-10"
                        style={{ borderRadius: "10px" }}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
                      />
                    </AnimatePresence>
                  )}
                Wallet {index + 1}
              </div>
            ))
          }
          <div className="border-l-[#E5484D] add-wallet ml-2 border-l flex justify-center items-center px-4 py-2 uppercase text-white" >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#E5484D" className="size-8" >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
        </div>
      </div>
      < div className="flex w-full pr-6 overflow-x-auto gap-2" >

        <motion.div
          className="hidden md:block h-full overflow-hidden px-4" >
          <motion.span className="flex max-w-full h-full pl-2 gap-5"
            animate={{
              x: TabID * -100 + (TabID == 0 ? -2 : +0) + "%",
              transition: { type: "spring", bounce: 0.2, duration: 0.8 }
            }
            }>
            {
              walletDetails[selectedCurrency]["wallets"].map((wallet, index) => (
                <div key={index} className="mt-7 border w-full border-[#4D4747] p-8 pt-0 bg-[#111111] text-md text-white font-semibold kameron rounded-[20px] gap-2" >
                  <h1 className="text-[40px] text-[#E5484D] mada my-4" >
                    $0.00
                  </h1>
                  < div className="flex gap-2" >
                    <div className="bg-[#222222] items-center max-w-[50%] flex-1 py-3 px-6 rounded-lg uppercase text-white" >
                      <div className="mada text-2xl my-2" >
                        Private Key
                      </div>
                      < div className="text-sm text-[#837C7C] my-2 mada" >
                        {wallet.privateKey}
                      </div>
                    </div>

                    < div className="bg-[#222222] items-center flex-1 px-6 py-3 max-w-[50%] rounded-lg uppercase text-white" >
                      <div className="mada text-2xl my-2" >
                        Public Key
                      </div>
                      < div className="text-sm text-[#837C7C] my-2 mada" >
                        {wallet.publicKey}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
          </motion.span>
        </motion.div>
      </div>
    </div >
  )
}