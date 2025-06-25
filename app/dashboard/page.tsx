"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { BiBell, BiDotsVerticalRounded, BiPlus } from "react-icons/bi";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { images } from "@/constants/images";
import ConfirmModal from "@/components/ConfirmModal";
import { useAuth } from "@/hooks/auth.hooks";
import { useUserData } from "@/hooks/user.hooks";

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
  onActionClick,
}: {
  type: "To Pay" | "To Receive";
  title: string;
  dueDate: string;
  amount: number;
  note: string;
  badgeColor: string;
  buttonColor: string;
  onActionClick: () => void;
}) => (
  <div className="card rounded-lg border-2 border-secondary dark:border-muted bg-white dark:bg-card p-3">
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
      <h5 className="font-semibold text-[24px]">
        ₱
        {amount.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </h5>
    </div>

    <div className="bg-[var(--grey-bg)] dark:bg-input p-2 rounded-sm my-3 min-h-[40px]">
      <p className="text-nowrap text-[12px] text-muted-">{note}</p>
    </div>

    <div className="w- flex items-center justify-between gap-3 border-t py-3">
      <button
        className={` border-1 ${buttonColor} rounded-full p-3 flex w-[50%] items-center justify-center text-white font-medium uppercase tracking-wide cursor-pointer`}
        onClick={onActionClick}
      >
        {type === "To Pay" ? "Paid" : "Received"}
      </button>
      <button className=" border-1 border-secondary bg-transparent hover:bg-muted text-secondary rounded-full p-3 flex w-[50%] items-center justify-center  font-medium uppercase tracking-wide cursor-pointer">
        Detail
      </button>
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
  const { user } = useAuth();
  const { userData } = useUserData(user?.uid);
  console.log(userData)
  const lendmoney = 26350.0;
  const owedmoney = 5000.0;

  const [modalOpen, setModalOpen] = useState(false);
  const [actionType, setActionType] = useState<"Paid" | "Received">("Paid");

  const handleAction = (type: "Paid" | "Received") => {
    setActionType(type);
    setModalOpen(true);
  };

  return (
    <div className="overflow-y-auto">
      {/* Header */}
      <div className="flex w-full items-center justify-between p-5">
        <div>
          <h1 className="text-[24px] font-bold">{userData ? `Hi ${userData.firstName},` : "Loading..."}</h1>
          <p>Here's how your money looks today!</p>
        </div>
        <div className="flex items-center justify-center rounded-full bg-primary h-[40px] w-[40px]">
          <BiBell size={24} className="invert" />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="p-5">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col justify-between p-3 rounded-lg border-2 bg-secondary border-secondary dark:bg-secondary/70 dark:border-secondary/80 h-[124px]">
            <h5 className="text-[16px] text-muted font-semibold">
              Money you're getting back
            </h5>
            <h3 className="text-muted text-xl font-semibold text-end">
              ₱ {lendmoney}.00
            </h3>
          </div>
          <div className="flex flex-col justify-between p-3 rounded-lg border-2 border-secondary dark:border-muted bg-white dark:bg-card h-[124px]">
            <h5 className="text-[16px] font-semibold">Money you owe</h5>
            <h3 className="text-xl font-bold mt-5 text-end">
              ₱ {owedmoney}.00
            </h3>
          </div>
          <div className="col-span-2 flex flex-col justify-between bg-[var(--primary-100)] border-2 border-[var(--primary)] p-3 rounded-lg">
            <h5 className="text-[16px] font-semibold text-[#333]">
              Next transaction due
            </h5>
            <h3 className="mt-5 text-[#333]">
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
              amount={4000.0}
              note="Notes kase wala lang trip ko lang"
              badgeColor="bg-[var(--green)]"
              onActionClick={() => handleAction("Received")}
              buttonColor="bg-[var(--green)] border-[var(--green)] hover:bg-[var(--green-300)]"
            />
            <TransactionCard
              type="To Pay"
              title="Phone Loan"
              dueDate="Mon, 2 JUN 2025"
              amount={4000.0}
              note="Notes kase wala lang trip ko lang"
              badgeColor="bg-primary"
              onActionClick={() => handleAction("Paid")}
              buttonColor=" bg-primary border-primary"
            />

            <div className="card rounded-lg border-2 border-secondary dark:border-muted bg-white dark:bg-card p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span
                    className={`h-[14px] w-[14px] rounded-full bg-primary`}
                  ></span>
                  <p>To Pay</p>
                </div>
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
              </div>

              <div className="flex justify-between items-end my-5">
                <div className="flex flex-col">
                  <p className="text-[16px] font-medium">Sample Title</p>
                  <h5>
                    Due on{" "}
                    <span className="text-primary font-medium">
                      Tue, JUN 22 2025
                    </span>
                  </h5>
                </div>
                <h5 className="font-semibold text-[24px]">₱2,500.00</h5>
              </div>

              <div className="bg-[var(--grey-bg)] dark:bg-input p-2 rounded-sm my-3 min-h-[40px]">
                <p className="text-nowrap text-[12px] text-muted-foreground dark:text-foreground">
                  notesnotes lang kase sample lang to.
                </p>
              </div>

              <div className="w- flex items-center justify-between gap-3 border-t py-3">
                <button
                  className={` border-1 bg-primary rounded-full p-3 flex w-[50%] items-center justify-center text-white font-medium uppercase tracking-wide`}
                >
                  Paid
                </button>
                <button className=" border-1 border-secondary bg-transparent hover:bg-muted text-secondary rounded-full p-3 flex w-[50%] items-center justify-center  font-medium uppercase tracking-wide">
                  Detail
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Add New Button */}
        <Button
          className="bg-primary h-[47px] cursor-pointer mt-5 w-full mb-20 rounded-full dark:text-white"
          onClick={() => router.push("/addActivity")}
        >
          <BiPlus size={24} />
          Add new Item
        </Button>
      </div>

      <ConfirmModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        actionLabel={actionType}
        onConfirm={(desc, file) => {
          console.log("Confirmed", actionType, desc, file);
          // Handle your logic here (e.g. API call)
        }}
      />
    </div>
  );
}
