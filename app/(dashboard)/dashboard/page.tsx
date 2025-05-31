import { getCurrentUser } from "@/lib/session";

const Dashboard = async () => {
  const user = await getCurrentUser();

  console.log(user);

  return <div>Dashboard</div>;
};
export default Dashboard;
