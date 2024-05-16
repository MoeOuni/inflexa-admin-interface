import { ArrowLeft } from "lucide-react"
import { Button } from "../ui/button"

type Props = {
    onClick?: () => void
}

const BackButton = (props: Props) => {
  return (
    <Button variant={'outline'} size={'sm'} onClick={props.onClick} className="flex items-center gap-1">
        <ArrowLeft size={20} /> Back
    </Button>
  )
}

export default BackButton