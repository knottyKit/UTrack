import Image, { StaticImageData } from "next/image";
import { BiDotsVerticalRounded } from "react-icons/bi";

export const TransactionCard = ({
  sharedUsers,
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
  sharedUsers: { name: string; avatar: StaticImageData }[] | null;
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
