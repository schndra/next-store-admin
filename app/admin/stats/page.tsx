import { auth } from "@/auth";
import Heading from "../_components/heading";
import { Separator } from "@/components/ui/separator";

async function StatsPage() {
  const session = await auth();
  return (
    <div className="min-h-[calc(100vh-12rem)] md:min-h-[calc(100vh-9.4rem)] mt-4">
      <Heading title="Stats" description="Manage your store stats" />
      <Separator />

      <h1>Stats Pages</h1>
      <div>{session?.user.name}</div>
      <div>{session?.user.role}</div>
    </div>
  );
}
export default StatsPage;
