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

const Suppliers = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        <CardTitle>{t("suppliers")}</CardTitle>
        <CardDescription>{t("suppliers_table_description")}</CardDescription>
        <div>
          {pathname === "/suppliers" ? (
            <Button
              size={"sm"}
              className="flex gap-1 items-center"
              onClick={() => navigate("/suppliers/save")}
            >
              <SquarePlus className="h-4 w-4" /> {t("supplier_add_button")}
            </Button>
          ) : (
            <BackButton onClick={() => navigate("/suppliers")} />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Outlet />
      </CardContent>
    </Card>
  );
};

export default Suppliers;
