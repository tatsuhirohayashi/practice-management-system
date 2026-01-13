"use client";

import { usePathname } from "next/navigation";

export function useCoachSidebar() {
  const pathname = usePathname();

  return {
    pathname,
  };
}
