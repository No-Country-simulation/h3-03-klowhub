import { LucideIcon } from "lucide-react";

type Props = {
  Icon: LucideIcon,
  data: string
}

const AuthorData = ({ Icon, data }: Props) => {
  return (
    <div className="flex items-center space-x-2">
        <Icon className="w-4 h-4 text-purple-400" />
        <span className="text-sm">{ data }</span>
    </div>
  )   
};

export default AuthorData
