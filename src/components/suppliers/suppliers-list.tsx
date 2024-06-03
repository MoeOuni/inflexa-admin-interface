import { useSuppliers } from "@/api";
import ProvidersTable from "../data-tables/suppliers-table";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { File, ListFilter, SquarePlus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

type Props = {};

const SuppliersList = (props: Props) => {
  const [status, setStatus] = useState<string>("ACTIVE");
  const { t } = useTranslation();
  const navigate = useNavigate();

  const suppliers = useSuppliers({ status });

  return (
    <div>
      <div className="flex items-center mb-5">
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-1">
                <ListFilter className="h-4 w-4" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Filter
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                onClick={() => {
                  setStatus("ACTIVE");
                }}
                checked={status === "ACTIVE"}
              >
                Active
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                onClick={() => {
                  setStatus("DELETED");
                }}
                checked={status === "DELETED"}
              >
                Deleted
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                onClick={() => {
                  setStatus("ARCHIVED");
                }}
                checked={status === "ARCHIVED"}
              >
                Archived
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" className="gap-1">
            <File className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
          <Button
            size={"sm"}
            className="gap-1"
            onClick={() => navigate("/suppliers/save")}
          >
            <SquarePlus className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              {t("supplier_add_button")}
            </span>
          </Button>
        </div>
      </div>
      <div className="bg-muted/40 rounded-md py-2 px-4 border">
        <ProvidersTable data={suppliers?.data?.suppliers ?? []} status={status}/>
      </div>
    </div>
  );
};

export default SuppliersList;
