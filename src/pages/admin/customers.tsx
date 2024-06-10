import BackButton from "@/components/app/back-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SquarePlus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const Customers = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        <CardTitle>{t("customers")}</CardTitle>
        <CardDescription>{t("customers_table_description")}</CardDescription>
        <div>
          {pathname !== "/customers" ? (
            <BackButton onClick={() => navigate("/customers")} />
          ) : (
            <Button
              size={"sm"}
              className="gap-1"
              onClick={() => navigate("/customers/save")}
            >
              <SquarePlus className="h-4 w-4" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                {t("customer_add_button")}
              </span>
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-2 md:p-4 lg:p-6">
        <Outlet />
      </CardContent>
    </Card>
  );
};

export default Customers;
