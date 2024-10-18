/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useTranslation } from 'react-i18next';

interface IMenuItem {
  id?: number;
  title: string;
  icon: JSX.Element;
  path: string | null;
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
  color: 'red' | 'green' | 'orange' | 'blue';
}) => {
  return count !== 0 ? (
    <span
      className={`ml-auto inline-flex items-center justify-center ${
        count ? 'px-2 py-1' : 'w-2 h-2'
      } text-xs font-bold leading-none text-white rounded-full ${
        {
          red: 'bg-red-500',
          orange: 'bg-orange-500',
          green: 'bg-green-500',
          blue: 'bg-blue-500',
        }[color]
      }`}
    >
      {count}
    </span>
  ) : null;
};

const sidebarItems: IMenuItem[] = [
  {
    id: 1,
    title: 'menu.dashboard',
    icon: <Home className="h-5 w-5" />,
    path: '/dashboard',
  },
  {
    id: 2,
    title: 'menu.analytics',
    icon: <LineChart className="h-5 w-5" />,
    path: '/analytics',
    separator: true,
  },
  {
    id: 3,
    title: 'menu.inventory',
    icon: <Package className="h-5 w-5" />,
    path: '/inventory',
  },
  {
    id: 4,
    title: 'menu.orders',
    icon: <ShoppingCart className="h-5 w-5" />,
    path: '/orders',
  },
  {
    id: 5,
    title: 'menu.sales',
    icon: <ShoppingBasket className="h-5 w-5" />,
    path: '/sales',
  },
  {
    id: 6,
    title: 'menu.purchases',
    icon: <ScanBarcode className="h-5 w-5" />,
    path: '/purchases',
    separator: true,
  },
  {
    id: 7,
    title: 'menu.customers',
    icon: <Users2 className="h-5 w-5" />,
    path: '/customers',
  },
  {
    id: 8,
    title: 'menu.suppliers',
    icon: <Handshake className="h-5 w-5" />,
    path: '/suppliers',
    separator: true,
  },
  {
    id: 9,
    title: 'menu.logs',
    icon: <FileClock className="h-5 w-5" />,
    path: '/logs',
  },
  {
    id: 10,
    title: 'menu.settings',
    icon: <Settings className="h-5 w-5" />,
    path: null,
    children: [
      {
        id: 101,
        title: 'menu.general',
        path: '/settings',
        icon: <SlidersHorizontal className="h-4 w-4" />,
      },
      {
        id: 101,
        title: 'menu.security',
        path: '/settings/security',
        icon: <Lock className="h-4 w-4" />,
      },
      {
        id: 103,
        title: 'menu.categories',
        path: '/settings/categories',
        icon: <Tag className="h-4 w-4" />,
      },
      {
        id: 104,
        title: 'menu.reports',
        path: '/settings/repports',
        icon: <BarChart className="h-4 w-4" />,
      },
      {
        id: 105,
        title: 'menu.advanced',
        path: '/settings/advanced',
        icon: <MoveHorizontal className="h-4 w-4" />,
      },
      {
        id: 106,
        title: 'menu.payments',
        path: '/settings/payments',
        icon: <Banknote className="h-4 w-4" />,
      },
    ],
  },
];

const Sidebar = ({ notifications }: { notifications: any }) => {
  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {sidebarItems.map((item) => {
        const ntfs = notifications.find(
          (ntf: any) => ntf.path === item.path || ntf.id === item.id
        );

        if (ntfs) {
          item.notifications = ntfs?.notifications;
          if (ntfs.children) {
            item.children?.forEach((child) => {
              child.notifications = ntfs.children.find(
                (ntf: any) => ntf.id === child.id
              )?.notifications;
            });
          }
        }

        return <MenuItem item={item} key={item.id} />;
      })}
    </nav>
  );
};

const SidebarMobile = ({ notifications }: { notifications: any }) => {
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
          {sidebarItems.map((item) => {
            const ntfs = notifications.find(
              (ntf: any) => ntf.path === item.path || ntf.id === item.id
            );

            if (ntfs) {
              item.notifications = ntfs?.notifications;
              if (ntfs.children) {
                item.children?.forEach((child) => {
                  child.notifications = ntfs.children.find(
                    (ntf: any) => ntf.id === child.id
                  )?.notifications;
                });
              }
            }

            return <MenuItem item={item} key={'sm-' + item.id} />;
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

const MenuItem = ({ item }: { item: IMenuItem }) => {
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  console.log(pathname);

  return item?.children ? (
    <>
      <div
        onClick={toggleSubMenu}
        key={item?.path}
        className={`${
          pathname.includes('UNDEFINED_INFLEXA') && 'bg-muted text-primary'
        } flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary cursor-pointer`}
      >
        {item.icon}
        {t(item.title)}
        {item?.notifications?.map((notification, index) => (
          <NotificationIndicator
            key={'notif-' + index + item.id}
            color={notification.color}
          />
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
              to={child?.path ?? '#'}
              className={`${
                pathname.includes(child?.path) && 'bg-muted text-primary'
              } ml-5 flex items-center text-sm gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary`}
            >
              {child?.icon}
              {t(child.title)}
              <div className="ml-auto">
                {child?.notifications?.map((notification, index) => (
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
        to={item?.path ?? '#'}
        className={`${
          pathname.includes(item?.path ?? 'UNDEFINED_INFLEXA') &&
          'bg-muted text-primary'
        } flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary`}
      >
        {item.icon}
        {t(item.title)}
        <div className="ml-auto flex gap-1">
          {item?.notifications?.map((notification, index) => (
            <NotificationIndicator
              key={'notif-' + index + item.id}
              count={notification.count}
              color={notification.color}
            />
          ))}
        </div>
      </Link>
      {item?.separator && <hr className="my-2 border-t border-muted" />}
    </>
  );
};

export { Sidebar, SidebarMobile };
