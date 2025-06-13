"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { BiBell, BiDotsVerticalRounded, BiPlus } from "react-icons/bi";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { images } from "@/constants/images";

const sharedUsers = [
  { name: "Wathuffen Vella", avatar: images.user1 },
  { name: "Jane Doe", avatar: images.user2 },
  { name: "John Smith", avatar: images.user3 },
  { name: "Lucie Grey", avatar: images.user4 },
];

const TransactionCard = ({
  type,
  title,
  dueDate,
  amount,
  note,
  badgeColor,
  buttonColor,
}: {
  type: "To Pay" | "To Receive";
  title: string;
  dueDate: string;
  amount: number;
  note: string;
  badgeColor: string;
  buttonColor: string;
}) => (
  <div className="card rounded-lg border-2 border-secondary p-3">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1">
        <span className={`h-[14px] w-[14px] rounded-full ${badgeColor}`}></span>
        <p>{type}</p>
      </div>
      <button className="cursor-pointer w-[40px] flex items-end justify-end">
        <BiDotsVerticalRounded size={24} />
      </button>
    </div>

    <div className="flex justify-between items-end my-5">
      <div className="flex flex-col">
        <p className="text-[16px] font-medium">{title}</p>
        <h5>
          Due on <span className="text-primary font-medium">{dueDate}</span>
        </h5>
      </div>
      <h5 className="font-semibold text-[24px]">₱{amount.toLocaleString()}</h5>
    </div>

    <div className="bg-[var(--grey-bg)] p-2 rounded-lg my-3 min-h-[40px]">
      <p className="text-nowrap text-[12px] text-muted-foreground">{note}</p>
    </div>

    <div className="w-full flex items-center justify-center gap-3 border-t py-3">
      <Button className={`w-50 border-1 ${buttonColor} rounded-full p-5`}>
        Received
      </Button>
      <Button className="w-50 border-1 border-secondary bg-transparent hover:bg-muted text-secondary rounded-full p-5">
        Detail
      </Button>
    </div>

    <div className="flex flex-row-reverse items-center justify-start gap-1 pt-2 border-t">
      <div className="flex -space-x-2">
        {sharedUsers.slice(0, 3).map((user, i) => (
          <div
            key={i}
            className="relative h-7 w-7 rounded-full overflow-hidden border-2 border-white dark:border-background"
          >
            <Image
              src={user.avatar}
              alt={user.name}
              fill
              className="object-cover"
            />
          </div>
        ))}
        {sharedUsers.length > 3 && (
          <div className="h-7 w-7 rounded-full bg-[var(--primary-100)] text-[10px] flex items-center justify-center text-muted-foreground border-2 border-white font-semibold">
            +{sharedUsers.length - 3}
          </div>
        )}
      </div>
      <span className="text-xs text-muted-foreground">
        Shared with {sharedUsers.length} people
      </span>
    </div>
  </div>
);

export default function Dashboard() {
  const router = useRouter();
  const user = "Collene";
  const lendmoney = 26350.0;
  const owedmoney = 5000.0;

  return (
    <div className="overflow-y-auto">
      {/* Header */}
      <div className="flex w-full items-center justify-between p-5">
        <div>
          <h1 className="text-[24px] font-bold">Hi {user},</h1>
          <p>Here's how your money looks today!</p>
        </div>
        <div className="flex items-center justify-center rounded-full bg-primary h-[40px] w-[40px]">
          <BiBell size={24} className="invert" />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="p-5">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col justify-between p-3 rounded-lg border-2 bg-secondary border-secondary h-[124px]">
            <h5 className="text-[16px] text-muted font-medium">
              Money you're getting back
            </h5>
            <h3 className="text-white text-xl font-semibold text-end">
              ₱ {lendmoney}
            </h3>
          </div>
          <div className="flex flex-col justify-between p-3 rounded-lg border-2 border-secondary h-[124px]">
            <h5 className="text-[16px] font-semibold">Money you owe</h5>
            <h3 className="text-xl font-bold mt-5 text-end">₱ {owedmoney}</h3>
          </div>
          <div className="col-span-2 flex flex-col justify-between bg-[var(--primary-100)] border-2 border-[var(--primary)] p-3 rounded-lg">
            <h5 className="text-[16px] font-semibold">Next transaction due</h5>
            <h3 className="mt-5">
              Upcoming payment: ₱{owedmoney} due on May 10, 2025.
            </h3>
          </div>
        </div>

        {/* Upcoming Transactions */}
        <div className="mt-10">
          <h3 className="text-lg font-semibold">Your upcoming transactions</h3>
          <p className="text-muted-foreground">
            Keep track of what’s due and when. Payments you owe and what’s
            coming back to you — all in one place.
          </p>

          <div className="mt-5 flex flex-col gap-3">
            <TransactionCard
              type="To Receive"
              title="Phone Loan"
              dueDate="Mon, 2 JUN 2025"
              amount={4000}
              note="Notes kase wala lang trip ko lang"
              badgeColor="bg-primary"
              buttonColor="bg-primary border-primary"
            />
            <TransactionCard
              type="To Pay"
              title="Phone Loan"
              dueDate="Mon, 2 JUN 2025"
              amount={4000}
              note="Notes kase wala lang trip ko lang"
              badgeColor="bg-[var(--green)]"
              buttonColor="bg-[var(--green)] border-[var(--green)] hover:bg-[var(--green-300)]"
            />
          </div>
        </div>

        {/* Add New Button */}
        <Button
          className="bg-primary p-5 cursor-pointer mt-5 w-full"
          onClick={() => router.push("/addActivity")}
        >
          <BiPlus size={24} />
          Add new Item
        </Button>
      </div>
    </div>
  );
}
