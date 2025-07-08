import Image from "next/image";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

export default function ConfirmationCard({
  id,
  label,
  amount,
  user,
  paidDate,
  note,
  attachmentUrl,
  onConfirm,
  onDispute,
}: {
  id: number;
  label: string;
  amount: number;
  user: string;
  paidDate: string;
  note?: string;
  attachmentUrl?: string;
  onConfirm: () => void;
  onDispute: () => void;
}) {
  return (
    <div className="card rounded-xl border-2 border-secondary dark:border-muted bg-white dark:bg-card p-4 shadow-sm">
      <div className="mb-2">
        <h5 className="text-base font-medium">{label}</h5>
        <p className="text-sm text-muted-foreground">
          ₱{amount.toLocaleString()}
        </p>
        <p className="text-xs text-muted-foreground">From: {user}</p>
        <p className="text-xs text-muted-foreground">
          Paid on: {new Date(paidDate).toLocaleDateString()}
        </p>
      </div>

      {note && (
        <p className="bg-gray-100 dark:bg-input p-2 rounded-md text-xs text-neutral-500 dark:text-neutral-400 mb-4 h-16">
          {note}
        </p>
      )}

      {attachmentUrl && (
        <Zoom>
          <div className="relative  h-20 w-20 mb-3 rounded-md overflow-hidden border">
            <Image
              src={attachmentUrl}
              alt="Proof of payment"
              fill
              className="object-cover"
            />
          </div>
        </Zoom>
      )}

      <div className="flex gap-2 border-t pt-3">
        <button
          onClick={onConfirm}
          className="flex-1 bg-green h-[47px] text-white rounded-full py-2 text-sm font-semibold uppercase"
        >
          Confirm
        </button>
        <button
          onClick={onDispute}
          className="flex-1 bg-neutral-800 h-[47px] text-white rounded-full py-2 text-sm font-semibold uppercase"
        >
          Dispute
        </button>
      </div>
    </div>
  );
}
