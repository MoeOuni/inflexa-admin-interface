import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

const Logs = () => {
  const { t } = useTranslation();

  return (
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        <CardTitle>{t("logs")}</CardTitle>
        {/* <CardDescription>{t("customers_table_description")}</CardDescription> */}
      </CardHeader>
      <CardContent className="p-2 md:p-4 lg:p-6"></CardContent>
    </Card>
  );
};

export default Logs;
