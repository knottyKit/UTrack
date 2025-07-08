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

interface ConfirmModalProps {
  amount: number;
  label: string;
  open: boolean;
  onClose: () => void;
  onConfirm: (description: string, file?: File) => void;
}

export default function ConfirmModal({
  amount,
  label,
  open,
  onClose,
  onConfirm,
}: ConfirmModalProps) {
  const [description, setDescription] = React.useState("");
  const [attachment, setAttachment] = useState<File | null>(null);

  const handleSubmit = () => {
    onConfirm(description, attachment || undefined);
    setDescription("");
    setAttachment(null);
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setAttachment(file);
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
              Confirm paid
            </DialogTitle>
            <button onClick={onClose}>
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
          <p className="mb-4">
            Confirm payment of {amount} for {label}
          </p>

          <div className="space-y-4">
            <div>
              <label htmlFor="notes" className="font-semibold">
                Notes
              </label>
              <textarea
                id="notes"
                className="w-full border rounded-lg p-2 text-sm resize-none mt-2"
                rows={3}
                placeholder="Add description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="attachment" className="font-semibold">
                Attachment
              </label>
              <input
                className="hidden"
                id="attachment"
                type="file"
                accept="image/*,.pdf,.doc,.docx"
                onChange={handleFileChange}
              />
              <Button
                type="button"
                className="w-full h-14 border-2 border-dashed hover:border-primary hover:bg-muted flex flex-1 bg-muted rounded-lg cursor-pointer text-[var(--text-color)] mt-2"
                onClick={() => document.getElementById("attachment")?.click()}
              >
                <Paperclip className=" h-5 w-5" />
                Choose file
              </Button>
              {attachment && (
                <div className="mt-2 flex items-center justify-between bg-muted rounded p-3 gap-2">
                  {attachment.type.startsWith("image/") && (
                    <img
                      src={URL.createObjectURL(attachment)}
                      alt="Preview"
                      className=" h-12 w-12 rounded-lg object-contain border"
                    />
                  )}
                  <p className="text-sm text-gray-600 truncate flex-1">
                    {attachment.name}
                  </p>
                  <button
                    type="button"
                    onClick={() => setAttachment(null)}
                    className="flex items-center justify-center cursor-pointer h-10 w-10 flex-shrink-0 text-gray-400"
                  >
                    <X size={20} />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 flex w-full gap-3 justify-between">
            <Button
              className="flex flex-1 bg-primary p-5 cursor-pointer rounded-full h-[47px] text-white "
              onClick={handleSubmit}
            >
              Confirm paid
            </Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
