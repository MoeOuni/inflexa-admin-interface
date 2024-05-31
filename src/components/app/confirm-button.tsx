import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import { useTranslation } from "react-i18next";

type Props = {
  children: React.ReactNode;
  confirmTitle?: string;
  confirmText?: string;
  confirmFunction?: () => Promise<void> | void;
};

const ConfirmButton = (props: Props) => {
  const { t } = useTranslation();
  return (
    <Popover>
      <PopoverTrigger asChild>{props.children}</PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">{props?.confirmTitle}</h4>
            <p className="text-sm text-muted-foreground">
              {props?.confirmText}
            </p>
          </div>
          <div className="flex gap-3">
            <PopoverClose asChild>
              <Button variant={"outline"} size={"sm"}>
                {t("confirm_cancel")}
              </Button>
            </PopoverClose>
            <Button
              size={"sm"}
              onClick={props?.confirmFunction}
            >
              {t("confirm_yes")}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ConfirmButton;
