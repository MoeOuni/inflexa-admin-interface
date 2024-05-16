import { Link, useLocation } from "react-router-dom";
import {
  FileClock,
  Handshake,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  ScanBarcode,
  Settings,
  ShoppingBasket,
  ShoppingCart,
  Users2,
} from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";

const sidebarItems = [
  {
    title: "Dashboard",
    icon: <Home className="h-5 w-5" />,
    path: "/",
  },
  {
    title: "Analytics",
    icon: <LineChart className="h-5 w-5" />,
    path: "/analytics",
    separator: true,
  },
  {
    title: 'Inventory',
    icon: <Package className="h-5 w-5" />,
    path: '/inventory'
  },
  {
    title: "Orders",
    icon: <ShoppingCart className="h-5 w-5" />,
    path: "/orders",
  },
  {
    title: 'Sales',
    icon: <ShoppingBasket className='h-5 w-5'/>,
    path: '/sales'
  },
  {
    title: 'Purchases',
    icon: <ScanBarcode className='h-5 w-5'/>,
    path: '/purchases',
    separator: true
  },
  {
    title: "Customers",
    icon: <Users2 className="h-5 w-5" />,
    path: "/customers",
  },
  {
    title: 'Suppliers',
    icon: <Handshake className="h-5 w-5" />,
    path: '/suppliers',
    separator: true
  },
  {
    title: 'Logs',
    icon: <FileClock className="h-5 w-5" />,
    path: '/logs'
  },
  {
    title: "Settings",
    icon: <Settings className="h-5 w-5" />,
    path: "/settings",
  },
];

const Sidebar = () => {
  const { pathname } = useLocation();
  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {sidebarItems.map((item, index) => (
        <>
        <Link
          key={index}
          to={item.path}
          className={`${
            item?.path === pathname && "bg-muted text-primary"
          } flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary`}
        >
          {item.icon}
          {item.title}
        </Link>
        {item.separator && <hr className="my-2 border-t border-muted" />}
        </>
      ))}
    </nav>
  );
};

const SidebarMobile = () => {
  const { pathname } = useLocation();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <nav className="grid gap-2 text-lg font-medium">
          <Link
            to="/"
            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
          >
            <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
            <span className="sr-only">Kardouna</span>
          </Link>
          {sidebarItems.map((item, index) => (
            <Link
              to={item.path}
              key={index}
              className={`${
                item?.path === pathname ? "bg-muted text-primary" : "text-muted-foreground"
              } mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground`}
            >
              {item.icon}
              {item.title}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export { Sidebar, SidebarMobile };
