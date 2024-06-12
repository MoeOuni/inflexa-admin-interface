import {
  CreditCard,
  User,
  Users,
  FileText,
  ShoppingCart,
  DollarSign,
  BarChart,
  MessageCircle,
  ClipboardList,
  Filter,
  Tag,
  Star,
  Ticket,
  Shield,
  CheckCircle,
  Send,
  Gift,
  MoreHorizontal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import { Customer } from "@/lib/interfaces/customer";

type Props = {
  customer: Customer;
};

export function CustomerActionMenu({ customer }: Props) {
  const { t } = useTranslation();

  console.log(customer);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">{t("open_menu")}</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64">
        <DropdownMenuLabel>Customer Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <FileText className="mr-2 h-4 w-4" />
            <span>Exports</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem>
                <FileText className="mr-2 h-4 w-4" />
                <span>Export Profiles</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileText className="mr-2 h-4 w-4" />
                <span>Export Transactions</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <User className="mr-2 h-4 w-4" />
            <span>Profile Management</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>View Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Edit Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Delete Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Merge Profiles</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <DollarSign className="mr-2 h-4 w-4" />
            <span>Financial Actions</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem>
                <DollarSign className="mr-2 h-4 w-4" />
                <span>Update Credit Limit</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Tag className="mr-2 h-4 w-4" />
                <span>Apply Discount</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Tag className="mr-2 h-4 w-4" />
                <span>Revoke Discount</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <DollarSign className="mr-2 h-4 w-4" />
                <span>Issue Refund</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Manage Account Balance</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <ClipboardList className="mr-2 h-4 w-4" />
            <span>Sales and Orders</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem>
                <ClipboardList className="mr-2 h-4 w-4" />
                <span>View Order History</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ShoppingCart className="mr-2 h-4 w-4" />
                <span>Create Order</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ClipboardList className="mr-2 h-4 w-4" />
                <span>Process Return</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Tag className="mr-2 h-4 w-4" />
                <span>Apply Coupon</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <BarChart className="mr-2 h-4 w-4" />
            <span>Reports and Analytics</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem>
                <BarChart className="mr-2 h-4 w-4" />
                <span>Generate Sales Report</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Filter className="mr-2 h-4 w-4" />
                <span>Analyze Purchasing Patterns</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BarChart className="mr-2 h-4 w-4" />
                <span>Track Engagement Metrics</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Users className="mr-2 h-4 w-4" />
            <span>Customer Segmentation</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem>
                <Users className="mr-2 h-4 w-4" />
                <span>Segment by Purchase History</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Users className="mr-2 h-4 w-4" />
                <span>Segment by Location</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Users className="mr-2 h-4 w-4" />
                <span>Segment by Behavior</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Star className="mr-2 h-4 w-4" />
                <span>Add to Loyalty Program</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Ticket className="mr-2 h-4 w-4" />
            <span>Customer Support</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem>
                <Ticket className="mr-2 h-4 w-4" />
                <span>View Support Tickets</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Ticket className="mr-2 h-4 w-4" />
                <span>Manage Support Tickets</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MessageCircle className="mr-2 h-4 w-4" />
                <span>Add Notes to Profile</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Shield className="mr-2 h-4 w-4" />
            <span>Customer Verification</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem>
                <Shield className="mr-2 h-4 w-4" />
                <span>Verify Contact Information</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CheckCircle className="mr-2 h-4 w-4" />
                <span>Validate Identity</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Gift className="mr-2 h-4 w-4" />
            <span>Marketing Actions</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem>
                <Send className="mr-2 h-4 w-4" />
                <span>Add to Email List</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Gift className="mr-2 h-4 w-4" />
                <span>Create Marketing Campaign</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BarChart className="mr-2 h-4 w-4" />
                <span>Track Campaign Effectiveness</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
