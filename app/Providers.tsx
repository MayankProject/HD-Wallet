"use client";
import { Theme } from "@radix-ui/themes";
import { RecoilRoot } from "recoil";
export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <RecoilRoot>
      <div className="min-h-screen bg-black overflow-x-hidden" >
        <div className="container px-3 max-w-5xl mx-auto py-2 pb-8" >
          {children}
        </div>
      </div>
    </RecoilRoot>
  );
};
