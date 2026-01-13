"use client";

import Link from "next/link";
import { Button } from "@/shared/components/ui/button";

interface HeaderPresenterProps {
  onSignOut: () => void;
  homeLink: string;
}

export function HeaderPresenter({ onSignOut, homeLink }: HeaderPresenterProps) {
  return (
    <header className="sticky top-0 z-50 w-full bg-blue-400">
      <div className="flex h-16 items-center justify-between">
        <div className="pl-5">
          <Link href={homeLink} className="flex items-center">
            <span className="font-bold text-lg text-white">TennisPat</span>
          </Link>
        </div>
        <div className="pr-5">
          <Button
            className="font-bold text-md"
            variant="outline"
            onClick={onSignOut}
          >
            ログアウト
          </Button>
        </div>
      </div>
    </header>
  );
}
