"use client";

import { HeaderPresenter } from "./HeaderPresenter";
import { useHeader } from "./useHeader";

export function HeaderContainer() {
  const { handleSignOut, homeLink } = useHeader();

  return <HeaderPresenter onSignOut={handleSignOut} homeLink={homeLink} />;
}
