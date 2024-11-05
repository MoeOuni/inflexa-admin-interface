import { type LucideIcon } from 'lucide-react';

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Badge } from 'antd';
import { NotificationItem, NotificationMenu } from '@/lib/interfaces';

export function NavSales({
  items,
  notifications,
}: {
  items: {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
  notifications?: NotificationMenu[];
}) {
  const { t } = useTranslation();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Sales & Customers</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild tooltip={t(item.name)}>
              <Link to={item.url}>
                <item.icon />
                <span>{t(item.name)}</span>
                <div className="ml-auto space-x-1">
                  {notifications
                    ?.find((elem: NotificationMenu) => elem.path === item.url)
                    ?.notifications?.map((notif: NotificationItem) => (
                      <Badge
                        count={notif.count}
                        showZero
                        color={
                          {
                            red: '#ef4444',
                            orange: '#f97316',
                            green: '#22c55e',
                            blue: '#1d4ed8',
                          }[notif?.color]
                        }
                      />
                    ))}
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
