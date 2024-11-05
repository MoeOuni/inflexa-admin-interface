import { ChevronRight, type LucideIcon } from 'lucide-react';

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';
import { Badge } from 'antd';
import { NotificationItem, NotificationMenu } from '@/lib/interfaces';

export function NavAdmin({
  items,
  notifications,
}: {
  items: {
    name: string;
    url: string;
    icon: LucideIcon;
    children?: {
      name: string;
      url: string;
      icon: LucideIcon;
    }[];
  }[];
  notifications?: NotificationMenu[];
}) {
  const { t } = useTranslation();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Administration</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          if (item.children) {
            return (
              <Collapsible
                key={item.name}
                asChild
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={t(item.name)}>
                      {item.icon && <item.icon />}
                      <span>{t(item.name)}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.children?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.name}>
                          <SidebarMenuSubButton asChild>
                            <Link to={subItem.url}>
                              <span>{t(subItem.name)}</span>
                              <div className="ml-auto space-x-1">
                                {notifications
                                  ?.find(
                                    (elem: NotificationMenu) =>
                                      elem.path === subItem.url
                                  )
                                  ?.notifications?.map(
                                    (notif: NotificationItem) => (
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
                                    )
                                  )}
                              </div>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            );
          } else {
            return (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild tooltip={t(item.name)}>
                  <Link to={item.url}>
                    <item.icon />
                    <span>{t(item.name)}</span>
                    <div className="ml-auto space-x-1">
                      {notifications
                        ?.find(
                          (elem: NotificationMenu) => elem.path === item.url
                        )
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
            );
          }
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
