import { Link, useLocation } from "react-router-dom";
import {
  Home,
  LineChart,
  LogOut,
  Package,
  Package2,
  PanelLeft,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";

const sidebarItems = [
  {
    title: "Dashboard",
    icon: <Home className="h-5 w-5" />,
    path: "/",
  },
  {
    title: "Orders",
    icon: <ShoppingCart className="h-5 w-5" />,
    path: "/orders",
  },
  {
    title: "Products",
    icon: <Package className="h-5 w-5" />,
    path: "/products",
  },
  {
    title: "Customers",
    icon: <Users2 className="h-5 w-5" />,
    path: "/customers",
  },
  {
    title: "Analytics",
    icon: <LineChart className="h-5 w-5" />,
    path: "/analytics",
  },
];

const Sidebar = () => {
  const { pathname } = useLocation();
  return (
    <>
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          to="#"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Nymera Inc</span>
        </Link>
        {sidebarItems.map((item, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <Link
                to={item.path}
                className={`${
                  item?.path === pathname &&
                  "bg-primary-foreground text-primary"
                } flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8`}
              >
                {item.icon}
                <span className="sr-only">{item.title}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">{item.title}</TooltipContent>
          </Tooltip>
        ))}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              to="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              to="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Logout</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Logout</TooltipContent>
        </Tooltip>
      </nav>
    </>
  );
};

const SidebarMobile = () => {
  const { pathname } = useLocation();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            to="/"
            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
          >
            <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
            <span className="sr-only">Nymera Inc</span>
          </Link>
          {sidebarItems.map((item, index) => (
            <Link
              to={item.path}
              key={index}
              className={`${
                item?.path === pathname
                  ? "text-foreground"
                  : "text-muted-foreground"
              } flex items-center gap-4 px-2.5  hover:text-foreground`}
            >
              {item.icon}
              {item.title}
            </Link>
          ))}
          <Link
            to="#"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <LineChart className="h-5 w-5" />
            Settings
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export { Sidebar, SidebarMobile };
