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
import { TransactionCard } from "@/components/TransactionCard";
import DisputeModal from "@/components/DisputeModal";
import ConfirmationCard from "@/components/ConfirmationCard";

const sharedUsers = [
  { name: "Wathuffen Vella", avatar: images.user1 },
  { name: "Jane Doe", avatar: images.user2 },
  { name: "John Smith", avatar: images.user3 },
  { name: "Lucie Grey", avatar: images.user4 },
];

export default function Dashboard() {
  const router = useRouter();
  const { user } = useAuth();
  const { userData } = useUserData(user?.uid);
  const { totalOwed, totalReceive, nextTransact, loading } = useDashboardData(
    user?.uid
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [disputeModalOpen, setDisputeModalOpen] = useState(false);
  const [modalAmount, setModalAmount] = useState(0);
  const [modalTitle, setModalTitle] = useState("");

  const confirmations = [
    {
      id: 1,
      label: "Phone Loan",
      amount: 4000,
      type: "To Receive",
      user: "John Smith",
      paidDate: "2023-10-01T12:00:00Z", // Example date
      note: "Monthly installment for the phone loan",
    },
    {
      id: 2,
      label: "Dinner Payment",
      amount: 1500,
      type: "To Pay",
      user: "Jane Doe",
      paidDate: "2023-10-01T12:00:00Z", // Example date
      note: "Monthly installment for the phone loan",
      attachmentUrl: "/assets/proof.png", // Example attachment URL
    },
  ];

  return (
    <div className="overflow-y-auto">
      {/* Header */}
      <div className="flex w-full items-center justify-between p-5">
        <div>
          <h1 className="text-[24px] font-bold">
            {userData ? `Hi ${userData.firstName},` : "Loading..."}
          </h1>
          <p>Here's how your money looks today!</p>
        </div>
        <div className="flex items-center justify-center rounded-full bg-primary h-[40px] w-[40px]">
          <BiBell size={24} className="invert" />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="p-5">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col justify-between p-3 rounded-xl border-2 bg-secondary border-secondary dark:bg-secondary/70 dark:border-secondary/80 h-[124px]">
            <h5 className="text-[16px] text-muted font-semibold">
              Money you're getting back
            </h5>
            <h3 className="text-muted text-xl font-semibold text-end">
              ₱ {totalReceive?.toLocaleString() ?? "0.00"}
            </h3>
          </div>
          <div className="flex flex-col justify-between p-3 rounded-xl border-2 border-secondary dark:border-muted bg-white dark:bg-card h-[124px]">
            <h5 className="text-[16px] font-semibold">Money you owe</h5>
            <h3 className="text-xl font-bold mt-5 text-end">
              ₱ {totalOwed?.toLocaleString() ?? "0.00"}
            </h3>
          </div>
          <div className="col-span-2 flex flex-col justify-between bg-[var(--primary-100)] border-2 border-[var(--primary)] p-3 rounded-xl">
            <h5 className="text-[16px] font-semibold text-[#333]">
              Next transaction due
            </h5>
            <h3 className="mt-5 text-[#333]">
              {nextTransact ? (
                <>
                  {nextTransact.type === "borrow"
                    ? `Upcoming payment: ₱${nextTransact.amount.toLocaleString()} due on ${new Date(
                        nextTransact.dueDate.toDate?.() || nextTransact.dueDate
                      ).toLocaleDateString()}`
                    : `Upcoming collection: ₱${nextTransact.amount.toLocaleString()} expected on ${new Date(
                        nextTransact.dueDate.toDate?.() || nextTransact.dueDate
                      ).toLocaleDateString()}`}
                </>
              ) : (
                "No upcoming transactions"
              )}
            </h3>
          </div>
        </div>

        {/* Confirmations Section */}
        <div className="mt-10">
          <h3 className="text-lg font-semibold">Your pending confirmations</h3>
          <p className="text-muted-foreground">
            Review and confirm payments submitted by other users. Make sure
            everything matches before finalizing.
          </p>

          <div className="mt-5 flex flex-col gap-3">
            {confirmations.length === 0 ? (
              <p className="text-center text-gray-500">
                You have no pending confirmations at the moment.
              </p>
            ) : (
              confirmations.map((item) => (
                <ConfirmationCard
                  key={item.id}
                  id={item.id}
                  label={item.label}
                  amount={item.amount}
                  user={item.user}
                  paidDate={item.paidDate} // pass the timestamp of when borrower clicked "paid"
                  note={item.note}
                  attachmentUrl={item.attachmentUrl} // if provided
                  onConfirm={() => {
                    setModalAmount(item.amount);
                    setModalOpen(true);
                  }}
                  onDispute={() => {
                    setDisputeModalOpen(true);
                  }}
                />
              ))
            )}
          </div>
        </div>

        {/* Upcoming To Pay Transactions */}
        <div className="mt-10">
          <h3 className="text-lg font-semibold">Your upcoming payments</h3>
          <p className="text-muted-foreground">
            Stay on top of your dues and avoid late fees. Review and settle any
            payments you need to make here.
          </p>

          <div className="mt-5 flex flex-col gap-3">
            <TransactionCard
              sharedUsers={sharedUsers}
              id={1}
              title="Laptop Payment"
              dueDate="Mon, 5 JUL 2025"
              amount={15000}
              note="Monthly installment"
              buttonColor="bg-primary border-primary"
              onActionClick={(amount, title) => {
                setModalAmount(amount);
                setModalTitle(title);
                setModalOpen(true);
              }}
              onDetailClick={(id) => console.log("Detail clicked", id)}
            />
            <TransactionCard
              sharedUsers={sharedUsers}
              id={2}
              title="Laptop Payment"
              dueDate="Mon, 9 JUL 2025"
              amount={54000}
              note="Monthly installment"
              buttonColor="bg-primary border-primary"
              onActionClick={(amount, title) => {
                setModalAmount(amount);
                setModalTitle(title);
                setModalOpen(true);
              }}
              onDetailClick={(id) => console.log("Detail clicked", id)}
            />
            <TransactionCard
              sharedUsers={sharedUsers}
              id={3}
              paidDate="2025-07-09"
              title="Laptop Payment"
              dueDate="Mon, 9 JUL 2025"
              amount={4000}
              note="Monthly installment"
              buttonColor="bg-primary border-primary"
              onActionClick={(amount, title) => {
                setModalAmount(amount);
                setModalTitle(title);
                setModalOpen(true);
              }}
              onDetailClick={(id) => console.log("Detail clicked", id)}
            />
            <TransactionCard
              sharedUsers={sharedUsers}
              id={3}
              paidDate="2025-07-09"
              title="Laptop Payment"
              dueDate="Mon, 9 JUL 2025"
              status="waiting"
              amount={3000}
              note="Monthly installment"
              buttonColor="bg-primary border-primary"
              onActionClick={(amount, title) => {
                setModalAmount(amount);
                setModalTitle(title);
                setModalOpen(true);
              }}
              onDetailClick={(id) => console.log("Detail clicked", id)}
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
        label="Dinner"
        amount={modalAmount}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={(desc, file) => {
          console.log("Confirmed", desc, file);
          // Handle your logic here (e.g. API call)
        }}
      />
      <DisputeModal
        open={disputeModalOpen}
        onClose={() => setDisputeModalOpen(false)}
        onConfirm={(desc) => {
          console.log("Confirmed", desc);
          // Handle your logic here (e.g. API call)
        }}
      />
    </div>
  );
}
