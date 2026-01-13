import { Suspense } from "react";
import { requireClientAuthServer } from "@/features/auth/servers/redirect.server";
import { Header } from "../../client/Header";
import { Sidebar } from "../../client/Sidebar";

type AuthenticatedClientLayoutWrapperProps = {
  children: React.ReactNode;
};

export async function AuthenticatedClientLayoutWrapper({
  children,
}: AuthenticatedClientLayoutWrapperProps) {
  await requireClientAuthServer();

  return (
    <div className="flex h-screen bg-background flex-col">
      <Suspense fallback={<div className="h-16" />}>
        <Header />
      </Suspense>
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 bg-gray-100 mx-6 my-2 rounded">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
