"use client";
import { ChevronLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const item = {
  type: 0,
  label: "Phone Loan",
  due: "05-18-2025",
  amount: 4000,
  desc: "asdjashdkjashkdhak",
  share: ["Jose Mari Chan"],
};

const logs = [{}]

const DetailPage = () => {
  const params = useParams();
  const id = params.id; // ✅
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
        <h5 className="text-lg font-medium text-center">Transaction Details</h5>
      </div>
      <div>{item.label}</div>
      <div>{item.due}</div>
      <div>{item.amount}</div>
      <div>{item.desc}</div>
      <div>{item.share}</div>
      <div className="bg-gray-400 p-3 rounded-md">
        <p className="font-medium">Logs</p>
        <div className="">
          {[0, 1, 2].map((logs, index) => {
            return <p key={index}>this is log{id}.</p>;
          })}
        </div>
      </div>
    </>
  );
};

export default DetailPage;
