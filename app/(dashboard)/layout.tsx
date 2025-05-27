import type { FC, PropsWithChildren } from "react";

import { DashboardContainer } from "@/components/layout/dashboard/container";
import { DashboardHeader } from "@/components/layout/dashboard/header";

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className="min-h-dvh">
      <DashboardHeader />
      <DashboardContainer>{children}</DashboardContainer>
    </main>
  );
};
export default DashboardLayout;
