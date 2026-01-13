import { AuthenticatedCoachLayoutWrapper } from "@/shared/components/layout/server/AuthenticatedCoachLayoutWrapper/AuthenticatedCoachLayoutWrapper";

export default function AuthenticatedCoachPageLayout({
  children,
}: LayoutProps<"/coach">) {
  return (
    <AuthenticatedCoachLayoutWrapper>
      {children}
    </AuthenticatedCoachLayoutWrapper>
  );
}
