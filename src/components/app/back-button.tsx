import { ArrowLeft, ChevronLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";

type Props = {
  onClick?: () => void;
};

const BackButton = (props: Props) => {
  const { t } = useTranslation();
  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className="h-7 w-7"
      onClick={props.onClick}
    >
      <ChevronLeft className="h-4 w-4" />
      <span className="sr-only">{t("back")}</span>
    </Button>
  );
};

export default BackButton;
