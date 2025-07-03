"use client";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Bell,
  ChevronRight,
  LogOut,
  Moon,
  SquareUserRound,
  UserRound,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const router = useRouter();
  return (
    <div>
      <div className="p-5">
        <h1 className="text-xl font-medium">Settings</h1>
      </div>

      <div className="px-5">
        <div className="py-5 flex gap-5 items-center ">
          <span className="flex items-center justify-center relative h-12 w-12 rounded-full bg-secondary">
            <img
              src="/assets/user1.jpg"
              alt="profile"
              className="object-cover rounded-full h-full w-full"
            />
          </span>
          <div>
            <h2 className="text-lg font-semibold">Keith Medrano</h2>
            <p className="text-muted-foreground">collenekeith@email.com</p>
          </div>
        </div>
      </div>

      <div className="p-5">
        <ul className="">
          <li className="cursor-pointer">
            <div className="flex  justify-between items-center bg-background px-4 py-3 border   rounded-lg">
              <div className="flex items-center gap-2">
                <UserRound size={16} />
                <p className="">Account details</p>
              </div>
              <ChevronRight className="text-muted-foreground" />
            </div>
          </li>
        </ul>
        <div className="mt-10">
          <p className="uppercase text-xs text-muted-foreground tracking-wide">
            Preferences
          </p>
          <ul className="mt-2">
            <li
              className="cursor-pointer"
              onClick={() => router.push("/notification")}
            >
              <div className="flex  justify-between items-center bg-background px-4 py-3 border  rounded-t-lg ">
                <div className="flex items-center gap-2">
                  <Bell size={16} />
                  <p className="font-light">Notifications</p>
                </div>
                <ChevronRight className="text-muted-foreground" />
              </div>
            </li>
            <li
              onClick={() => router.push("/display")}
              className="cursor-pointer"
            >
              <div className="flex  justify-between items-center bg-background px-4 py-3 border  border-t-0 rounded-b-lg">
                <div className="flex items-center gap-2">
                  <Moon size={16} />
                  <p className="">Display</p>
                </div>
                <ChevronRight className="text-muted-foreground" />
              </div>
            </li>
          </ul>
        </div>
        <ul className="mt-10">
          <li className="cursor-pointer">
            <div className="flex  justify-between items-center bg-background px-4 py-3 border   rounded-lg">
              <div className="flex items-center gap-2">
                <LogOut size={16} />
                <p className="">Sign Out</p>
              </div>
              <ChevronRight className="text-muted-foreground" />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default page;
