"use client";

import React from "react";
import { useTheme } from "next-themes";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  return (
  <div>
    <div className="border-b-1  relative p-5">
          <button
            className="absolute left-5 top-3.5 h-[40px] w-[40px] cursor-pointer"
            onClick={() => router.back()}
          >
            <ChevronLeft size={28} />
          </button>
          <h5 className="text-lg font-medium text-center">Appearance</h5>
        </div>
      <div className="p-5">
        
    
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-md font-medium">Appearance</p>
            <div className="flex gap-3 mt-2">
              <button
                onClick={() => setTheme("light")}
                className={`px-4 py-2 rounded-full border cursor-pointer ${
                  theme === "light"
                    ? "bg-primary text-white font-medium"
                    : "bg-transparent"
                }`}
              >
                Light
              </button>
              <button
                onClick={() => setTheme("dark")}
                className={`px-4 py-2 rounded-full border cursor-pointer ${
                  theme === "dark"
                    ? "bg-primary text-white font-medium"
                    : "bg-transparent"
                }`}
              >
                Dark
              </button>
              <button
                onClick={() => setTheme("system")}
                className={`px-4 py-2 rounded-full border cursor-pointer ${
                  theme === "system"
                    ? "bg-primary text-white font-medium"
                    : "bg-transparent"
                }`}
              >
                System
              </button>
            </div>
          </div>
    
          {/* You can add other settings here later (profile, notifications, etc.) */}
        </div>
      </div>
  </div>
  );
}
