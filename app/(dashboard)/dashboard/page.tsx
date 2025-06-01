import { getCurrentUser } from "@/lib/session";

const Dashboard = async () => {
  const user = await getCurrentUser();

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
