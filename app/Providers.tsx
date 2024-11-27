"use client";
import { Theme } from "@radix-ui/themes";
import { RecoilRoot } from "recoil";
export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <RecoilRoot>
    <Theme className= "min-h-screen bg-[black] overflow-x-hidden" >
    { children }
    </Theme>
    </RecoilRoot>
  );
};
