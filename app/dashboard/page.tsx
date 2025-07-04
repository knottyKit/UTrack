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
import { useDashboardData } from "./dashboard.hooks";

const sharedUsers = [
  { name: "Wathuffen Vella", avatar: images.user1 },
  { name: "Jane Doe", avatar: images.user2 },
  { name: "John Smith", avatar: images.user3 },
  { name: "Lucie Grey", avatar: images.user4 },
];

const TransactionCard = ({
  id,
  type,
  title,
  dueDate,
  amount,
  note,
  badgeColor,
  buttonColor,
  onActionClick,
  onDetailClick,
}: {
  id: number;
  type: "To Pay" | "To Receive";
  title: string;
  dueDate: string;
  amount: number;
  note: string;
  badgeColor: string;
  buttonColor: string;
  onActionClick: (amount: number, title: string) => void;
  onDetailClick: (id: number) => void;
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
        className={` border-1 ${buttonColor} rounded-full p-3 flex w-full items-center justify-center text-white font-medium uppercase tracking-wide cursor-pointer`}
        onClick={() => onActionClick(amount, title)}
      >
        {type === "To Pay" ? "Paid" : "Received"}
      </button>
      {/* <button
        className=" border-1 border-secondary bg-transparent hover:bg-muted text-secondary rounded-full p-3 flex w-[50%] items-center justify-center  font-medium uppercase tracking-wide cursor-pointer"
        onClick={() => onDetailClick(id)}
      >
        Detail
      </button> */}
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
  const {
    totalOwed,
    totalReceive,
    nextTransact,
    loading,
  } = useDashboardData(user?.uid);

  const [modalOpen, setModalOpen] = useState(false);
  const [actionType, setActionType] = useState<"Paid" | "Received">("Paid");
  const [modalLabel, setModalLabel] = useState("");
  const [modalAmount, setModalAmount] = useState(0);

  const handleAction = (type: "Paid" | "Received") => {
    setActionType(type);
    setModalOpen(true);
  };

  const confirmations = [
    {
      id: 1,
      label: "Phone Loan",
      amount: 4000,
      type: "To Receive",
      user: "John Smith",
    },
    {
      id: 2,
      label: "Dinner Payment",
      amount: 1500,
      type: "To Pay",
      user: "Jane Doe",
    },
  ];

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
              ₱ {totalReceive?.toLocaleString() ?? "0.00"}
            </h3>
          </div>
          <div className="flex flex-col justify-between p-3 rounded-lg border-2 border-secondary dark:border-muted bg-white dark:bg-card h-[124px]">
            <h5 className="text-[16px] font-semibold">Money you owe</h5>
            <h3 className="text-xl font-bold mt-5 text-end">
              ₱ {totalOwed?.toLocaleString() ?? "0.00"}
            </h3>
          </div>
          <div className="col-span-2 flex flex-col justify-between bg-[var(--primary-100)] border-2 border-[var(--primary)] p-3 rounded-lg">
            <h5 className="text-[16px] font-semibold text-[#333]">
              Next transaction due
            </h5>
            <h3 className="mt-5 text-[#333]">
                {nextTransact ? (
                <>
                    {nextTransact.type === "borrow" ? (
                    `Upcoming payment: ₱${nextTransact.amount.toLocaleString()} due on ${new Date(
                        nextTransact.dueDate.toDate?.() || nextTransact.dueDate
                    ).toLocaleDateString()}`
                    ) : (
                    `Upcoming collection: ₱${nextTransact.amount.toLocaleString()} expected on ${new Date(
                        nextTransact.dueDate.toDate?.() || nextTransact.dueDate
                    ).toLocaleDateString()}`
                    )}
                </>
                ) : (
                "No upcoming transactions"
                )}
            </h3>
          </div>
        </div>

        {/* Confirmations Section */}
        <div className="mt-10">
          <h3 className="text-lg font-semibold">Confirmations needed</h3>
          <p className="text-muted-foreground">
            Approve pending transactions from other users.
          </p>

          <div className="mt-5 flex flex-col gap-3">
            {confirmations.length === 0 ? (
              <p className="text-center text-gray-500">
                No confirmations at this time.
              </p>
            ) : (
              confirmations.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-lg p-4 flex flex-col gap-2 shadow-sm bg-muted"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{item.label}</span>
                    <span className="text-gray-500 text-sm">{item.type}</span>
                  </div>
                  <p className="text-lg font-bold">
                    ₱{item.amount.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">From: {item.user}</p>
                  <button       
                    onClick={() => {
                      setActionType(
                        item.type === "To Pay" ? "Paid" : "Received"
                      );
                      setModalLabel(item.label);
                      setModalAmount(item.amount);
                      setModalOpen(true);
                    }}
                    className="w-full uppercase h-[47px] bg-orange-500 text-white rounded-full py-2 text-sm font-medium mt-2"
                  >
                    Confirm
                  </button>
                </div>
              ))
            )}
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
              id={1}
              type="To Receive"
              title={"Phone Loan"}
              dueDate="Mon, 2 JUN 2025"
              amount={4000.0}
              note="Notes kase wala lang trip ko lang"
              badgeColor="bg-[var(--green)]"
              onActionClick={(amount, title) => {
                handleAction("Received");
                setModalLabel(title);
                setModalAmount(amount);
              }}
              onDetailClick={(id) => {
                router.push(`/details/${id}`);
              }}
              buttonColor="bg-[var(--green)] border-[var(--green)] hover:bg-[var(--green-300)]"
            />
            <TransactionCard
              id={2}
              type="To Pay"
              title="Phone Loan"
              dueDate="Mon, 2 JUN 2025"
              amount={4000.0}
              note="Notes kase wala lang trip ko lang"
              badgeColor="bg-primary"
              onActionClick={(amount, title) => {
                handleAction("Paid");
                setModalLabel(title);
                setModalAmount(amount);
              }}
              onDetailClick={(id) => {
                router.push(`/details/${id}`);
              }}
              buttonColor=" bg-primary border-primary"
            />
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
        label={modalLabel}
        amount={modalAmount}
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
