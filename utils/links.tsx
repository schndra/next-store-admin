import { LayoutDashboard } from "lucide-react";

type NavLink = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const links: NavLink[] = [
  {
    href: "/admin/stats",
    label: "stats",
    icon: <LayoutDashboard />,
  },
  {
    href: "/admin/product",
    label: "product",
    icon: <LayoutDashboard />,
  },
  {
    href: "/admin/categories",
    label: "category",
    icon: <LayoutDashboard />,
  },
];

export default links;
