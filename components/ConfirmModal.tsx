"use client";
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogBackdrop,
  DialogPanel,
} from "@headlessui/react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (description: string, file?: File) => void;
  actionLabel: "Paid" | "Received";
}

export default function ConfirmModal({
  open,
  onClose,
  onConfirm,
  actionLabel,
}: ConfirmModalProps) {
  const [description, setDescription] = React.useState("");
  const [file, setFile] = React.useState<File | null>(null);

  const handleSubmit = () => {
    onConfirm(description, file || undefined);
    setDescription("");
    setFile(null);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="fixed z-10 inset-0 overflow-y-auto"
    >
      <div className="flex items-end justify-center min-h-screen px-4   text-center sm:block sm:p-0">
        {/* Background overlay */}
        <DialogBackdrop className="fixed inset-0 bg-black opacity-30 dark:opacity-60 -z-20" />

        {/* Modal Panel */}
        <DialogPanel className="inline-block align-bottom bg-white dark:bg-popover pb-20 rounded-t-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full p-6 z-20">
          <div className="flex justify-between items-center mb-4">
            <DialogTitle as="h3" className="text-lg font-semibold leading-6">
              Confirm {actionLabel}
            </DialogTitle>
            <button onClick={onClose}>
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <div className="space-y-4">
            <textarea
              className="w-full border rounded-lg p-2 text-sm resize-none"
              rows={3}
              placeholder="Add description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>

          <div className="mt-6 flex gap-3">
            <Button
              className="bg-muted rounded-full cursor-pointer text-foreground hover:bg-gray-200 w-50 p-5"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              className="bg-primary p-5 cursor-pointer rounded-full text-white w-50"
              onClick={handleSubmit}
            >
              Confirm {actionLabel}
            </Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
