import { LayoutDashboard } from "lucide-react";

export type NavLink = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const links: NavLink[] = [
  {
    href: "/admin/overview",
    label: "Overview",
    icon: <LayoutDashboard />,
  },
  {
    href: "/admin/product",
    label: "Products",
    icon: <LayoutDashboard />,
  },
  {
    href: "/admin/categories",
    label: "Categories",
    icon: <LayoutDashboard />,
  },
  {
    href: "/admin/sizes",
    label: "Sizes",
    icon: <LayoutDashboard />,
  },
];

export default links;
