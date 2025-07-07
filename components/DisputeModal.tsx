"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogBackdrop,
  DialogPanel,
} from "@headlessui/react";
import { Button } from "@/components/ui/button";
import { Paperclip, X } from "lucide-react";

interface DisputeModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

export default function DisputeModal({
  open,
  onClose,
  onConfirm,
}: DisputeModalProps) {
  const [reason, setReason] = React.useState("");

  const handleSubmit = () => {
    onConfirm(reason);
    setReason("");
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="fixed z-10 inset-0 overflow-y-auto "
    >
      <div className=" relative w-full min-h-screen">
        {/* Background overlay */}
        <DialogBackdrop className="fixed inset-0 bg-black opacity-30 dark:opacity-60" />

        {/* Modal Panel */}
        <DialogPanel className="absolute left-1/2 transform -translate-x-1/2 bottom-0 sm:bottom-auto sm:top-40 bg-white dark:bg-popover pb-15 rounded-t-2xl sm:rounded-2xl shadow-xl w-full max-w-lg p-6 z-20">
          <div className="flex justify-between items-center mb-2">
            <DialogTitle as="h3" className="text-lg font-semibold leading-6">
              Dispute Payment
            </DialogTitle>
            <button onClick={onClose}>
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
          <p className="mt-3">
            Please tell us why you’re disputing this payment. Your reason will
            be shared with the other user:
          </p>
          <div className="flex gap-2 items-center py-3 mb-4">
            <span className="w-8 h-8 rounded-full bg-neutral-600">
              <img
                src="/assets/user3.jpg"
                alt="avatar"
                className="object-cover w-full h-full rounded-full"
              />
            </span>
            {/* Placeholder for user avatar */}
            <p className="text-primary text-base font-medium">John Michael</p>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="notes" className="font-semibold">
                Reason for dispute
              </label>
              <textarea
                id="notes"
                className="w-full border rounded-lg p-2 text-sm resize-none mt-2"
                rows={3}
                placeholder="Add reason (optional)"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-6 flex w-full gap-3 justify-between">
            <Button
              className="flex flex-1 bg-primary uppercase p-5 cursor-pointer rounded-full h-[47px] text-white text-base md:text-sm"
              onClick={handleSubmit}
            >
              Submit Dispute
            </Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
