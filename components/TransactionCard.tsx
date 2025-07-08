import Image, { StaticImageData } from "next/image";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { BsCheckCircleFill } from "react-icons/bs";

type Status = "upcoming" | "overdue" | "completed" | "waiting";

export const TransactionCard = ({
  sharedUsers,
  id,
  title,
  dueDate,
  paidDate,
  amount,
  note,
  status,
  buttonColor,
  onActionClick,
  onDetailClick,
}: {
  sharedUsers: { name: string; avatar: StaticImageData }[] | null;
  id: number;
  title: string;
  dueDate: string;
  paidDate?: string;
  amount: number;
  note: string;
  status?: Status; // optional, will be computed if not passed
  buttonColor: string;
  onActionClick: (amount: number, title: string) => void;
  onDetailClick: (id: number) => void;
}) => {
  const today = new Date();
  const due = new Date(dueDate);

  // Compute status if not explicitly provided
  let computedStatus: Status = "upcoming";

  if (status) {
    computedStatus = status;
  } else if (paidDate) {
    computedStatus = "completed";
  } else if (due < today && !(
    due.getDate() === today.getDate() &&
    due.getMonth() === today.getMonth() &&
    due.getFullYear() === today.getFullYear()
  )) {
    computedStatus = "overdue";
  }

  let badgeColor = "bg-primary";
  let badgeLabel = due.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  if (computedStatus === "overdue") {
    badgeColor = "bg-red-600";
    const diffTime = today.getTime() - due.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    badgeLabel = `${diffDays} day${diffDays > 1 ? "s" : ""} overdue`;
  } else if (computedStatus === "completed") {
    badgeColor = "bg-green-600";
    badgeLabel = "Completed";
  } else if (computedStatus === "waiting") {
    badgeColor = "bg-yellow-500";
    badgeLabel = "Waiting for confirmation";
  }

  return (
    <div className="card rounded-xl border-secondary border-2 dark:border-muted bg-white dark:bg-card p-4 shadow-sm relative">
     

      {/* Badge */}
      <div className="flex justify-between items-center mb-3">
        <div
          className={`px-3 py-1 text-xs font-bold text-white rounded-full ${badgeColor}`}
        >
          {badgeLabel}
        </div>
        <button
          className="cursor-pointer"
          onClick={() => onDetailClick(id)}
        >
          <BiDotsVerticalRounded size={22} />
        </button>
      </div>

      {/* Title & amount */}
      <div className="flex justify-between items-center mb-2">
        <p className="text-base font-medium">{title}</p>
        <h5 className="font-bold text-lg">
          ₱
          {amount.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </h5>
      </div>

      {/* Note */}
      <div className="h-16 bg-gray-100 dark:bg-input p-2 rounded-md text-xs text-neutral-500 dark:text-neutral-400 mb-2">
        {note}
      </div>

      {/* Paid date text */}
      {["completed", "waiting"].includes(computedStatus) && paidDate && (
        <p className="text-xs text-green-700 dark:text-green-400 mb-4">
          Paid on{" "}
          {new Date(paidDate).toLocaleDateString(undefined, {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      )}

      {/* Action button */}
      {computedStatus !== "completed" && computedStatus !== "waiting" && (
        <div className="flex items-center justify-between gap-2 border-t pt-3">
          <button
            className={`h-[47px] flex-1 ${buttonColor} rounded-full py-2 text-sm text-white font-semibold uppercase tracking-wide`}
            onClick={() => onActionClick(amount, title)}
          >
            Paid
          </button>
        </div>
      )}

      {/* Shared users */}
      <div className="flex flex-row-reverse items-center justify-start gap-1 pt-3 border-t mt-3">
        {!sharedUsers || sharedUsers.length === 0 ? (
          <span className="text-xs text-muted-foreground">
            Not shared with anyone
          </span>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};
