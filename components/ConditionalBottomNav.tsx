"use client";

import { usePathname } from "next/navigation";
import BottomNav from "./BottomNavigation";

export default function ConditionalBottomNav() {
  const pathname = usePathname();
  const showBottomNav = [
    "/dashboard",
    "/search",
    "/transactions",
    "/settings",
  ].includes(pathname);

  return showBottomNav ? <BottomNav /> : null;
}
