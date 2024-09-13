import { Card } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface NotificationProps {
  sender: string;
  action: string;
  date: string;
  description: string;
  onDelete: () => void;
  onClick?: () => void;
}

export default function HoverNotificationCard({
  sender,
  action,
  date,
  description,
  onDelete,
  onClick,
}: NotificationProps) {
  const formattedDate = new Date(date).toLocaleString();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card onClick={onClick} className="w-full max-w-md px-3 py-2 space-y-2 cursor-pointer transition-all duration-300 hover:shadow-md relative group">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="font-medium text-sm">{sender}</p>
                <p className="text-sm text-muted-foreground">{action}</p>
              </div>
              <p className="text-xs text-muted-foreground">{formattedDate}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              aria-label="Delete notification"
            >
              <X className="h-4 w-4" />
            </Button>
          </Card>
        </TooltipTrigger>
        <TooltipContent side="bottom" align="start" className="max-w-md p-4">
          <p className="text-sm max-w-[240px]">{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
