import type { FC, PropsWithChildren } from "react";

import { Header } from "@/components/layout/navbar";

const HomeLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};
export default HomeLayout;
