"use client";

import type { Route } from "next";
import Link from "next/link";
import { cn } from "@/shared/lib/utils";

type NavigationItem = {
  name: string;
  href: Route;
};

const navigation: NavigationItem[] = [
  {
    name: "予約済みレッスン",
    href: "/client/lesson/reserved",
  },
  {
    name: "レッスン候補日時",
    href: "/client/lesson/notreserved",
  },
  {
    name: "コンディション",
    href: "/client/condition",
  },
  {
    name: "振り返り",
    href: "/client/review",
  },
];

interface SidebarPresenterProps {
  pathname: string;
}

export function SidebarPresenter({ pathname }: SidebarPresenterProps) {
  return (
    <>
      {/* サイドバー */}
      <aside className={cn("w-64 bg-blue-600 m-2 h-fit rounded")}>
        <nav className="flex flex-col">
          <div className="flex-1 space-y-1 px-2 py-2">
            {navigation.map((item) => {
              const isActive = pathname.startsWith(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-white transition-colors",
                    isActive
                      ? "font-semibold bg-blue-500"
                      : "hover:bg-blue-400",
                  )}
                >
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </aside>
    </>
  );
}
