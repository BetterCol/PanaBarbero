import type { FC, PropsWithChildren } from "react";

import { DashboardHeader } from "@/components/layout/dashboard/header";

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className="min-h-dvh">
      <DashboardHeader />
      {children}
    </main>
  );
};
export default DashboardLayout;
