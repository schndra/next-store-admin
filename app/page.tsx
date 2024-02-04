import { Button } from "@/components/ui/button";
import { Camera, Mail } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Button asChild>
        <Link href="/stats">Go to Stats page</Link>
      </Button>
    </main>
  );
}
