import { Link, useLocation } from 'react-router-dom';
import {
  Banknote,
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

interface IMenuItem {
  id?: number;
  title: string;
  icon: JSX.Element;
  path?: string;
  separator?: boolean;
  children?: {
    id?: number;
    title: string;
    path: string;
    icon?: JSX.Element;
    notifications?: { count?: number; color: 'red' | 'green' }[];
  }[];
  notifications?: { count?: number; color: 'red' | 'green' }[];
}

// New component for notification indicator
const NotificationIndicator = ({
  count,
  color,
}: {
  count?: number;
  color: 'red' | 'green';
}) => (
  <span
    className={`ml-auto inline-flex items-center justify-center ${
      count ? 'px-2 py-1' : 'w-2 h-2'
    } text-xs font-bold leading-none text-white rounded-full ${
      color === 'red' ? 'bg-red-500' : 'bg-green-500'
    }`}
  >
    {count && count}
  </span>
);

const sidebarItems: IMenuItem[] = [
  {
    id: 1,
    title: 'Dashboard',
    icon: <Home className="h-5 w-5" />,
    path: '/',
  },
  {
    id: 2,
    title: 'Analytics',
    icon: <LineChart className="h-5 w-5" />,
    path: '/analytics',
    separator: true,
  },
  {
    id: 3,
    title: 'Inventory',
    icon: <Package className="h-5 w-5" />,
    path: '/inventory',
    notifications: [
      { count: 2, color: 'red' },
      { count: 3, color: 'green' },
    ],
  },
  {
    id: 4,
    title: 'Orders',
    icon: <ShoppingCart className="h-5 w-5" />,
    path: '/orders',
    notifications: [{ count: 5, color: 'green' }],
  },
  {
    id: 5,
    title: 'Sales',
    icon: <ShoppingBasket className="h-5 w-5" />,
    path: '/sales',
    notifications: [{ count: 2, color: 'green' }],
  },
  {
    id: 6,
    title: 'Purchases',
    icon: <ScanBarcode className="h-5 w-5" />,
    path: '/purchases',
    separator: true,
  },
  {
    id: 7,
    title: 'Customers',
    icon: <Users2 className="h-5 w-5" />,
    path: '/customers',
    notifications: [{ count: 3, color: 'green' }],
  },
  {
    id: 8,
    title: 'Suppliers',
    icon: <Handshake className="h-5 w-5" />,
    path: '/suppliers',
    separator: true,
  },
  {
    id: 9,
    title: 'Logs',
    icon: <FileClock className="h-5 w-5" />,
    path: '/logs',
  },
  {
    id: 10,
    title: 'Settings',
    icon: <Settings className="h-5 w-5" />,
    notifications: [{ color: 'red' }],
    children: [
      {
        id: 101,
        title: 'General',
        path: '/settings',
        icon: <SlidersHorizontal className="h-4 w-4" />,
      },
      {
        id: 101,
        title: 'Security',
        path: '/settings/security',
        icon: <Lock className="h-4 w-4" />,
        notifications: [{ color: 'red' }],
      },
      {
        id: 103,
        title: 'Categories',
        path: '/settings/categories',
        icon: <Tag className="h-4 w-4" />,
      },
      {
        id: 104,
        title: 'Repports',
        path: '/settings/repports',
        icon: <BarChart className="h-4 w-4" />,
        notifications: [{ color: 'red' }],
      },
      {
        id: 105,
        title: 'Advanced',
        path: '/settings/advanced',
        icon: <MoveHorizontal className="h-4 w-4" />,
        notifications: [{ color: 'red' }],
      },
      {
        id: 106,
        title: 'Payments',
        path: '/settings/payments',
        icon: <Banknote className="h-4 w-4" />,
        notifications: [{ color: 'red' }],
      },
    ],
  },
];

const Sidebar = () => {
  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {sidebarItems.map((item) => (
        <MenuItem item={item} key={item.id} />
      ))}
    </nav>
  );
};

const SidebarMobile = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 lg:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col overflow-y-scroll">
        <nav className="grid gap-2 text-md font-medium ">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <img src="./icon-logo.svg" className="h-8" alt="Inflexa logo" />
            <span className="text-2xl">Inflexa</span>
          </Link>
          <hr className="my-2 border-t border-muted" />
          {sidebarItems.map((item, index) => (
            <MenuItem item={item} key={'sm-' + index} />
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

const MenuItem = ({ item }: { item: IMenuItem }) => {
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
        {item.notifications &&
          item.notifications.map((notification, index) => (
            <NotificationIndicator key={index} color={notification.color} />
          ))}
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
              } ml-5 flex items-center text-sm gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary`}
            >
              {child?.icon}
              {child.title}
              <div className="ml-auto">
                {child.notifications &&
                  child.notifications.map((notification, index) => (
                    <NotificationIndicator
                      key={index}
                      color={notification.color}
                    />
                  ))}
              </div>
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
        <div className="ml-auto flex gap-1">
          {item.notifications &&
            item.notifications.map((notification, index) => (
              <NotificationIndicator
                key={index}
                count={notification.count}
                color={notification.color}
              />
            ))}
        </div>
      </Link>
      {item.separator && <hr className="my-2 border-t border-muted" />}
    </>
  );
};

export { Sidebar, SidebarMobile };
