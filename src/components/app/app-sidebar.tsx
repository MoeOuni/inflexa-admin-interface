import * as React from 'react';
import {
  AudioWaveform,
  CalendarClock,
  ClipboardList,
  Command,
  CreditCard,
  FileCode2,
  FileText,
  FolderCog,
  GalleryVerticalEnd,
  HandCoins,
  History,
  Home,
  LineChart,
  Package,
  Settings,
  Shield,
  ShoppingBag,
  SlidersVertical,
  Tag,
  Truck,
  Users,
} from 'lucide-react';

import { NavMain } from '@/components/app/nav-main';
import { NavUser } from '@/components/app/nav-user';
import { TeamSwitcher } from '@/components/app/team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { NavInventory } from './nav-inventory';
import { NavSales } from './nav-sales';
import { NavAdmin } from './nav-admin';

import { AuthContext } from '@/contexts/auth-context';
import { useMenuNotifications } from '@/api';

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Inflexa',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Psftek',
      logo: AudioWaveform,
      plan: 'Startup',
    },
    {
      name: 'Moe',
      logo: Command,
      plan: 'Free',
    },
  ],
  navMain: [
    {
      name: 'menu.dashboard',
      icon: Home,
      url: '/dashboard',
    },
    {
      name: 'menu.analytics',
      icon: LineChart,
      url: '/analytics',
    },
    {
      name: 'menu.reports',
      icon: FileText,
      url: '/reports',
    },
  ],
  navSales: [
    {
      name: 'menu.sales',
      icon: ShoppingBag,
      url: '/sales',
    },
    {
      name: 'menu.orders',
      icon: ClipboardList,
      url: '/orders',
    },
    {
      name: 'menu.customers',
      icon: Users,
      url: '/customers',
    },
  ],
  navInventory: [
    {
      name: 'menu.inventory',
      icon: Package,
      url: '/inventory',
    },
    {
      name: 'menu.categories',
      icon: Tag,
      url: '/settings/categories',
    },
    {
      name: 'menu.suppliers',
      icon: Truck,
      url: '/suppliers',
    },
    {
      name: 'menu.purchases',
      icon: CreditCard,
      url: '/purchases',
    },
  ],
  navAdmin: [
    {
      name: 'menu.settings',
      icon: Settings,
      url: '#',
      children: [
        {
          name: 'menu.general',
          icon: FolderCog,
          url: '/settings',
        },
        {
          name: 'menu.security',
          icon: Shield,
          url: '/settings/security',
        },
        {
          name: 'menu.advanced',
          icon: SlidersVertical,
          url: '/settings/advanced',
        },
        {
          name: 'menu.payments',
          icon: HandCoins,
          url: '/settings/payments',
        }
      ]
    },
    {
      name: 'menu.logs',
      icon: History,
      url: '/logs',
    },
    {
      name: 'menu.scheduled_tasks',
      icon: CalendarClock,
      url: '/scheduled-tasks',
    },
    {
      name: 'menu.developer_tools',
      icon: FileCode2,
      url: '#',
    }
  ]
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = React.useContext(AuthContext);

  const menuNotifications = useMenuNotifications({ type: 'menu' });

  return (
    <Sidebar variant="floating" collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} notifications={menuNotifications?.data?.data?.menu}/>
        <NavSales items={data.navSales} notifications={menuNotifications?.data?.data?.menu}/>
        <NavInventory items={data.navInventory} notifications={menuNotifications?.data?.data?.menu}/>
        <NavAdmin items={data.navAdmin} notifications={menuNotifications?.data?.data?.menu}/>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={
          {
            name: user?.profile?.firstName || "Guest",
            email: user?.email || "Guest@inflexa.com",
            avatar: user?.profile?.avatarUrl,
          }
        } />
      </SidebarFooter>
    </Sidebar>
  );
}
