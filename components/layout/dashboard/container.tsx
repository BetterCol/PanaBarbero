import type { FC, PropsWithChildren } from "react";

export const DashboardContainer: FC<PropsWithChildren> = ({ children }) => (
  <div className="mx-auto min-h-[calc(100dvh-64px)] w-full max-w-[100rem] py-4 md:min-h-[calc(100dvh-120px)]">
    {children}
  </div>
);
