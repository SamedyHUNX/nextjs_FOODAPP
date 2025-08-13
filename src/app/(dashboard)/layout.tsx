import { ReactNode } from "react";
import { DashboardLayout } from "./_component/dashboard-layout";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default Layout;
