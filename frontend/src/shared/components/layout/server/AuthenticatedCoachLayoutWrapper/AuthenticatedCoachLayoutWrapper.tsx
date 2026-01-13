import { Suspense } from "react";
import { requireCoachAuthServer } from "@/features/auth/servers/redirect.server";
import { CoachSidebar } from "../../client/CoachSidebar";
import { Header } from "../../client/Header";

type AuthenticatedCoachLayoutWrapperProps = {
  children: React.ReactNode;
};

export async function AuthenticatedCoachLayoutWrapper({
  children,
}: AuthenticatedCoachLayoutWrapperProps) {
  await requireCoachAuthServer();

  return (
    <div className="flex h-screen bg-background flex-col">
      <Suspense fallback={<div className="h-16" />}>
        <Header />
      </Suspense>
      <div className="flex flex-1">
        <CoachSidebar />
        <main className="flex-1 bg-gray-100 mx-6 my-2 rounded">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
