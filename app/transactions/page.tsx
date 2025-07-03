"use client";
import React, { useState } from "react";

const page = () => {
  const [filter, setFilter] = useState<
    "All" | "Active" | "Overdue" | "Completed"
  >("All");

  const transactions = [
    {
      id: 1,
      type: "To Receive",
      label: "Phone Loan",
      amount: 4000,
      dueDate: "June 5, 2025",
      status: "Active",
      note: "Short note preview...",
    },
    {
      id: 2,
      type: "To Pay",
      label: "Dinner Payment",
      amount: 1500,
      dueDate: "June 1, 2025",
      status: "Completed",
      note: "",
    },
    {
      id: 3,
      type: "To Receive",
      label: "Phone Loan",
      amount: 4000,
      dueDate: "May 10, 2025",
      status: "Overdue",
      note: "",
    },
  ];

  const filteredTransactions =
    filter === "All"
      ? transactions
      : transactions.filter((tx) => tx.status === filter);

  return (
    <div>
      <div className="border-b-1 relative p-5">
        <h5 className="text-lg font-medium text-center">Transactions</h5>
      </div>

      <div>
        <div className="flex gap-3 px-5 py-4 overflow-x-auto">
          {["All", "Active", "Overdue", "Completed"].map((status) => (
            <button
              key={status}
              className={`flex px-5 h-[40px] items-center text-center py-1 rounded-full cursor-pointer whitespace-nowrap border ${
                filter === status
                  ? "bg-primary text-white font-medium"
                  : "bg-transparent"
              }`}
              onClick={() => setFilter(status as any)}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="p-5 gap-5 flex flex-col pb-30">
          {filteredTransactions.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">
              No transactions found for "{filter}".
            </div>
          ) : (
            filteredTransactions.map((tx) =>
              tx.status === "Overdue" ? (
                <div
                  key={tx.id}
                  className="border border-red-400 p-4 rounded-lg bg-red-50"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-red-600 font-semibold">
                      {tx.type}
                    </span>
                    <span className="flex items-center bg-red-100 text-red-700 px-2 py-1 rounded text-xs">
                      ⚠️ Overdue
                    </span>
                  </div>
                  <h2 className="text-lg font-bold mt-2 text-red-700">
                    {tx.label}
                  </h2>
                  <p className="text-xl font-bold text-red-700">
                    ₱{tx.amount.toLocaleString()}
                  </p>
                  <p className="text-sm text-red-600">Due on {tx.dueDate}</p>
                  <div className="flex gap-2 mt-3">
                    <button className="flex-1 bg-gray-200 hover:bg-gray-300 rounded-full py-2 text-sm font-medium h-[40px] items-center text-center">
                      Details
                    </button>
                    <button className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-full py-2 text-sm font-medium h-[40px] items-center text-center">
                      Mark as {tx.type === "To Receive" ? "Received" : "Paid"}
                    </button>
                  </div>
                </div>
              ) : tx.status === "Completed" ? (
                <div
                  key={tx.id}
                  className="bg-gray-100 border border-gray-200 p-4 rounded-lg opacity-70"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 font-semibold">
                      {tx.type}
                    </span>
                    <span className="flex items-center bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                      ✅ Completed
                    </span>
                  </div>
                  <h2 className="text-lg font-medium mt-2 text-gray-600">
                    {tx.label}
                  </h2>
                  <p className="text-xl font-semibold text-gray-700">
                    ₱{tx.amount.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">Paid on {tx.dueDate}</p>
                  <button className="w-full mt-3 bg-gray-300 text-gray-700 rounded-full py-2 text-sm font-medium h-[40px] items-center text-center">
                    View Details
                  </button>
                </div>
              ) : (
                <div
                  key={tx.id}
                  className="card p-4 rounded-lg shadow-md border"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-green-500 font-semibold">
                      {tx.type}
                    </span>
                    <span className="bg-gray-200 px-2 py-1 rounded text-xs">
                      {tx.status}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold mt-2">{tx.label}</h2>
                  <p className="text-2xl font-semibold text-gray-800">
                    ₱{tx.amount.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">Due on {tx.dueDate}</p>
                  <p className="mt-2 text-sm text-gray-600 truncate">
                    Note: {tx.note}
                  </p>
                  <div className="flex gap-2 mt-3">
                    <button className="flex-1 bg-gray-200 hover:bg-gray-300 rounded-full py-2 text-sm font-medium h-[40px] items-center text-center">
                      Details
                    </button>
                    <button className="flex-1 bg-green-500 hover:bg-green-600 text-white rounded-full py-2 text-sm font-medium h-[40px] items-center text-center">
                      Mark as {tx.type === "To Receive" ? "Received" : "Paid"}
                    </button>
                  </div>
                </div>
              )
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
