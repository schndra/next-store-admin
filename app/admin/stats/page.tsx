import { auth } from "@/auth";

async function StatsPage() {
  const session = await auth();
  return (
    <div className="min-h-[calc(100vh-12rem)] md:min-h-[calc(100vh-9.4rem)]">
      <h1>Stats Pages</h1>
      <div>{JSON.stringify(session)}</div>
    </div>
  );
}
export default StatsPage;
