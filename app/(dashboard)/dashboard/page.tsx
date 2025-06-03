import { redirect } from "next/navigation";

import { REDIRECT_LINKS } from "@/constants/links";
import { getCurrentUser } from "@/lib/session";

const Dashboard = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== "user") {
    redirect(REDIRECT_LINKS[user.role]);
  }

  return (
    <div>
      Dashboard
      <h1>Welcome, {user?.name || "Guest"}!</h1>
      <p>Your email: {user?.email}</p>
      <p>Your role: {user?.role}</p>
    </div>
  );
};
export default Dashboard;
