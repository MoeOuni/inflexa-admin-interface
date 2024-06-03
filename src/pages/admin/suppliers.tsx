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
          {pathname !== "/suppliers" && (
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
