"use client";

import { ArrowLeftRight, LayoutDashboard, Search } from "lucide-react";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-white/100 via-white/80 to-white/0 dark:from-zinc-900/100 dark:via-zinc-900/80 dark:to-zinc-900/0 flex justify-around items-center z-10 pb-8 px-5 ">
      <div className="h-[60px] rounded-full flex p-5 items-center justify-center gap-8 bg-neutral-400/20 hover:bg-neutral-300/30 text-neutral-300 backdrop-blur-[8px] border border-neutral-400/20">
        <a
          href="/dashboard"
          className={
            isActive("/dashboard") ? "text-primary" : "text-neutral-500"
          }
        >
          <div className="flex flex-col items-center justify-center ">
            <LayoutDashboard strokeWidth={isActive("/dashboard") ? 2.5 : 1.5} />
            <p className="text-[12px]">Home</p>
          </div>
        </a>
        <a
          href="/search"
          className={isActive("/search") ? "text-primary" : "text-neutral-500"}
        >
          <div className="flex flex-col items-center justify-center ">
            {" "}
            <Search strokeWidth={isActive("/search") ? 2.5 : 1.5} />
            <p className="text-[12px]">Search</p>
          </div>
        </a>
        <a
          href="/transactions"
          className={
            isActive("/transactions") ? "text-primary" : "text-neutral-500"
          }
        >
          <div className="flex flex-col items-center justify-center ">
            <ArrowLeftRight
              strokeWidth={isActive("/transactions") ? 2.5 : 1.5}
            />
            <p className="text-[12px]">Transactions</p>
          </div>
        </a>
      </div>
    </nav>
  );
}
