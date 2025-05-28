import type { FC, PropsWithChildren } from "react";

export const DashboardContainer: FC<PropsWithChildren> = ({ children }) => (
  <div className="py-4 min-h-[calc(100dvh-64px)] md:min-h-[calc(100dvh-120px)] w-full max-w-[100rem] mx-auto">
    {children}
  </div>
);
