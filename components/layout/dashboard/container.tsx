import type { FC, PropsWithChildren } from "react";

export const DashboardContainer: FC<PropsWithChildren> = ({ children }) => (
  <div className="p-4 sm:px-4 2xl:px-0 h-[calc(100dvh-64px)] md:h-[calc(100dvh-120px)] w-full max-w-[100rem] mx-auto">
    {children}
  </div>
);
