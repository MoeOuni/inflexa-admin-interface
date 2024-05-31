import { ArrowLeft } from "lucide-react"
import { Button } from "../ui/button"
import { useTranslation } from "react-i18next"

type Props = {
    onClick?: () => void
}

const BackButton = (props: Props) => {
  const {t} = useTranslation();
  return (
    <Button variant={'outline'} size={'sm'} onClick={props.onClick} className="flex items-center gap-1">
        <ArrowLeft className="h-4 w-4" /> {t("back")}
    </Button>
  )
}

export default BackButton