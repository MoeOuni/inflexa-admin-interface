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

const Purchases = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        <CardTitle>{t("purchases")}</CardTitle>
        <CardDescription>{t("purchases_table_description")}</CardDescription>
        <div>
          {pathname !== "/purchases" ? (
            <BackButton onClick={() => navigate("/purchases")} />
          ) : (
            <Button
              size={"sm"}
              className="gap-1"
              onClick={() => navigate("/purchases/save")}
            >
              <SquarePlus className="h-4 w-4" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                {t("purchase_add_button")}
              </span>
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Outlet />
      </CardContent>
    </Card>
  );
};

export default Purchases;
