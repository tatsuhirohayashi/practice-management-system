"use client";

import { SidebarPresenter } from "./SidebarPresenter";
import { useSidebar } from "./useSidebar";

export function SidebarContainer() {
  const { pathname } = useSidebar();

  return <SidebarPresenter pathname={pathname} />;
}
