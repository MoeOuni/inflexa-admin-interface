// @ts-ignores
import React from 'react';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import { Button } from '../ui/button';
import { Bell } from 'lucide-react';
import HoverNotificationCard from './hover-notification-card';

const NotificationSheet = ({
  hasNewNotifications,
}: {
  hasNewNotifications: boolean;
}) => {
  const handleDelete = () => {
    console.log('Delete notification');
  };
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="outline" size="icon" className="h-8 w-8 relative">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Toggle notifications</span>
          {hasNewNotifications && (
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 transform translate-x-1/2 -translate-y-1/2" />
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[540px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
        </SheetHeader>
        <div className="py-4 grid gap-3">
          <HoverNotificationCard
            sender="Jane Smith"
            action="Liked your photo"
            date="2023-05-21T10:15:00Z"
            description="Jane really enjoyed your latest vacation photo from your trip to Hawaii. She mentioned she'd love to hear more about your experience at the luau!"
            onDelete={handleDelete}
          />
          <HoverNotificationCard
            sender="Jane Smith"
            action="Liked your photo"
            date="2023-05-21T10:15:00Z"
            description="Jane really enjoyed your latest vacation photo from your trip to Hawaii. She mentioned she'd love to hear more about your experience at the luau!"
            onDelete={handleDelete}
          />
          <HoverNotificationCard
            sender="Jane Smith"
            action="Liked your photo"
            date="2023-05-21T10:15:00Z"
            description="Jane really enjoyed your latest vacation photo from your trip to Hawaii. She mentioned she'd love to hear more about your experience at the luau!"
            onDelete={handleDelete}
          />
          <HoverNotificationCard
            sender="Jane Smith"
            action="Liked your photo"
            date="2023-05-21T10:15:00Z"
            description="Jane really enjoyed your latest vacation photo from your trip to Hawaii. She mentioned she'd love to hear more about your experience at the luau!"
            onDelete={handleDelete}
          />
          <HoverNotificationCard
            sender="Jane Smith"
            action="Liked your photo"
            date="2023-05-21T10:15:00Z"
            description="Jane really enjoyed your latest vacation photo from your trip to Hawaii. She mentioned she'd love to hear more about your experience at the luau!"
            onDelete={handleDelete}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NotificationSheet;
