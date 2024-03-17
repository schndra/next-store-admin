import { LayoutDashboard } from "lucide-react";

export type NavLink = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const links: NavLink[] = [
  {
    href: "/admin/stats",
    label: "Stats",
    icon: <LayoutDashboard />,
  },
  {
    href: "/admin/product",
    label: "Product",
    icon: <LayoutDashboard />,
  },
  {
    href: "/admin/categories",
    label: "Category",
    icon: <LayoutDashboard />,
  },
];

export default links;
