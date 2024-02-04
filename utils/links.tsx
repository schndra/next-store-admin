import { LayoutDashboard } from "lucide-react";

type NavLink = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const links: NavLink[] = [
  {
    href: "/stats",
    label: "stats",
    icon: <LayoutDashboard />,
  },
  {
    href: "/test1",
    label: "test1",
    icon: <LayoutDashboard />,
  },
  {
    href: "/test2",
    label: "test2",
    icon: <LayoutDashboard />,
  },
];

export default links;
