"use client";

import { CoachSidebarPresenter } from "./CoachSidebarPresenter";
import { useCoachSidebar } from "./useCoachSidebar";

export function CoachSidebarContainer() {
  const { pathname } = useCoachSidebar();

  return <CoachSidebarPresenter pathname={pathname} />;
}
