"use client";

import { usePathname } from "next/navigation";

export function useSidebar() {
  const pathname = usePathname();

  return {
    pathname,
  };
}
