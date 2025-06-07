import type { FC, PropsWithChildren } from "react";

import { redirect } from "next/navigation";

import { DashboardContainer } from "@/components/layout/dashboard/container";
import { Header } from "@/components/layout/navbar";
import { REDIRECT_LINKS } from "@/constants/links";
import { getCurrentUser } from "@/lib/session";

const DashboardLayout: FC<PropsWithChildren> = async ({ children }) => {
  const user = await getCurrentUser();

  if (user?.role !== "barber") {
    redirect(REDIRECT_LINKS[user?.role ?? "user"]);
  }

  return (
    <main className="min-h-dvh">
      <Header />
      <DashboardContainer>{children}</DashboardContainer>
    </main>
  );
};
export default DashboardLayout;
