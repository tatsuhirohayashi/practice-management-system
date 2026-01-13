import { AuthenticatedClientLayoutWrapper } from "@/shared/components/layout/server/AuthenticatedClientLayoutWrapper/AuthenticatedClientLayoutWrapper";

export default function AuthenticatedClientPageLayout({
  children,
}: LayoutProps<"/client">) {
  return (
    <AuthenticatedClientLayoutWrapper>
      {children}
    </AuthenticatedClientLayoutWrapper>
  );
}
