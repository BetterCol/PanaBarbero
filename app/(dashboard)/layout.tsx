import type { FC, PropsWithChildren } from "react";

import { DashboardContainer } from "@/components/layout/dashboard/container";
import { Header } from "@/components/layout/navbar";

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className="min-h-dvh">
      <Header />
      <DashboardContainer>{children}</DashboardContainer>
    </main>
  );
};
export default DashboardLayout;
