"use client";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const router = useRouter();
  return (
    <>
      <div className="border-b-1  relative p-5">
        <button
          className="absolute left-5 top-3.5 h-[40px] w-[40px] cursor-pointer"
          onClick={() => router.back()}
        >
          <ChevronLeft size={28} />
        </button>
        <h5 className="text-lg font-medium text-center">
          Notification settings
        </h5>
      </div>

      <div className="h-full p-5 bg-gray-200 dark:bg-transparent">
        <div className="">
          <h5 className="font-medium text-[16px]">Reminders</h5>
          <p className="text-muted-foreground">
            Get reminders about reviews and others.
          </p>
        </div>

        <ul className="mt-3">
          <li className="" onClick={() => router.push("/notification")}>
            <div className="flex flex-row-reverse bg-white justify-between items-center dark:bg-card px-4 py-3 border  rounded-t-lg">
              <Switch id="email" />
              <Label htmlFor="email" className="font-light">
                Email
              </Label>
            </div>
          </li>
          <li className="" onClick={() => router.push("/notification")}>
            <div className="flex flex-row-reverse bg-white justify-between border-t-0 items-center dark:bg-card px-4 py-3 border  rounded-b-lg">
              <Switch id="push" />
              <Label htmlFor="push" className="font-light">
                Push notifications
              </Label>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default page;
