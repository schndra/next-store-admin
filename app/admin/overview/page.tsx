import { Separator } from "@/components/ui/separator";
import Heading from "@/app/admin/_components/heading";
import { auth } from "@/auth";

async function OverviewPage() {
  const session = await auth();
  return (
    <div>
      <Heading title="Overview" description="Manage your store stats" />
      <Separator />

      <h1>Stats OverviewPage</h1>
      <div>{session?.user.name}</div>
      <div>{session?.user.role}</div>
    </div>
  );
}

export default OverviewPage;
