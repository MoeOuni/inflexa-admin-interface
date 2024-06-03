import BackButton from "@/components/app/back-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
          {pathname !== "/purchases" && (
            <BackButton onClick={() => navigate("/purchases")} />
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
