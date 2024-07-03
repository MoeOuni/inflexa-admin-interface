import { Link, useLocation } from 'react-router-dom';
import {
  BarChart,
  ChevronDown,
  ChevronUp,
  FileClock,
  Handshake,
  Home,
  LineChart,
  Lock,
  Menu,
  MoveHorizontal,
  Package,
  ScanBarcode,
  Settings,
  ShoppingBasket,
  ShoppingCart,
  SlidersHorizontal,
  Tag,
  Users2,
} from 'lucide-react';

import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';
import { useState } from 'react';

const sidebarItems = [
  {
    title: 'Dashboard',
    icon: <Home className="h-5 w-5" />,
    path: '/',
  },
  {
    title: 'Analytics',
    icon: <LineChart className="h-5 w-5" />,
    path: '/analytics',
    separator: true,
  },
  {
    title: 'Inventory',
    icon: <Package className="h-5 w-5" />,
    path: '/inventory',
  },
  {
    title: 'Orders',
    icon: <ShoppingCart className="h-5 w-5" />,
    path: '/orders',
  },
  {
    title: 'Sales',
    icon: <ShoppingBasket className="h-5 w-5" />,
    path: '/sales',
  },
  {
    title: 'Purchases',
    icon: <ScanBarcode className="h-5 w-5" />,
    path: '/purchases',
    separator: true,
  },
  {
    title: 'Customers',
    icon: <Users2 className="h-5 w-5" />,
    path: '/customers',
  },
  {
    title: 'Suppliers',
    icon: <Handshake className="h-5 w-5" />,
    path: '/suppliers',
    separator: true,
  },
  {
    title: 'Logs',
    icon: <FileClock className="h-5 w-5" />,
    path: '/logs',
  },
  {
    title: 'Settings',
    icon: <Settings className="h-5 w-5" />,
    children: [
      {
        title: 'General',
        path: '/settings',
        icon: <SlidersHorizontal className="h-4 w-4" />,
      },
      {
        title: 'Security',
        path: '/settings/security',
        icon: <Lock className="h-4 w-4" />,
      },
      {
        title: 'Categories',
        path: '/settings/categories',
        icon: <Tag className="h-4 w-4" />,
      },
      {
        title: 'Repports',
        path: '/settings/repports',
        icon: <BarChart className="h-4 w-4" />,
      },
      {
        title: 'Advanced',
        path: '/settings/advanced',
        icon: <MoveHorizontal className="h-4 w-4" />,
      },
    ],
  },
];

const Sidebar = () => {
  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4 overflow-y-scroll">
      {sidebarItems.map((item) => (
        <>
          <MenuItem item={item} />
        </>
      ))}
    </nav>
  );
};

const SidebarMobile = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col overflow-y-scroll">
        <nav className="grid gap-2 text-md font-medium ">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <img src="./icon-logo.svg" className="h-8" />
            <span className="text-2xl">Inflexa</span>
          </Link>
          {sidebarItems.map((item) => (
            <MenuItem item={item} />
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

const MenuItem = ({
  item,
}: {
  item: {
    title: string;
    icon: JSX.Element;
    path?: string;
    separator?: boolean;
    children?: {
      title: string;
      path: string;
      icon?: JSX.Element;
    }[];
  };
}) => {
  const { pathname } = useLocation();

  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return item?.children ? (
    <>
      <div
        onClick={toggleSubMenu}
        key={item?.path}
        className={`${
          item?.path === pathname && 'bg-muted text-primary'
        } flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary cursor-pointer`}
      >
        {item.icon}
        {item.title}
        <div className="ml-auto">
          {subMenuOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </div>
      </div>
      <div
        className={`transition-all duration-300 ${
          subMenuOpen ? 'slide-down' : 'slide-up'
        }`}
      >
        {item?.children?.map((child) => {
          return (
            <Link
              key={child?.path}
              to={child?.path || '#'}
              className={`${
                child?.path === pathname && 'bg-muted text-primary'
              } ml-5 flex items-center text-xs gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary`}
            >
              {child?.icon}
              {child.title}
            </Link>
          );
        })}
      </div>
      {item.separator && <hr className="my-2 border-t border-muted" />}
    </>
  ) : (
    <>
      <Link
        key={item?.path}
        to={item?.path || '#'}
        className={`${
          item?.path === pathname && 'bg-muted text-primary'
        } flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary`}
      >
        {item.icon}
        {item.title}
      </Link>
      {item.separator && <hr className="my-2 border-t border-muted" />}
    </>
  );
};

export { Sidebar, SidebarMobile };
