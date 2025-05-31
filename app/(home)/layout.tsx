import type { FC, PropsWithChildren } from "react";

import { HomeHeader } from "@/components/layout/home/navbar";

const HomeLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <HomeHeader />
      {children}
    </div>
  );
};
export default HomeLayout;
