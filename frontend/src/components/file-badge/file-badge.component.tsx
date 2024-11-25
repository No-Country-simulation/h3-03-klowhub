import { Badge } from "../ui/badge";
import { X, Files } from "lucide-react";

import { humanFileSize } from "@/utils/file.utils";

type Props = {
  file: File
  removeCb?: () => void
}

const FileBadge = ({ file, removeCb }: Props) => {
  return (
    <Badge 
      className={`flex gap-3 items-center px-3 py-1 bg-gray-50 text-white grow-0 ${removeCb ? "cursor-pointer" : ""}`}
      onClick={removeCb}
    >
      <Files color="#b95ed4" />
      <span>{ file.name }</span>
      <span>{ humanFileSize(file.size) }</span>
      { removeCb &&
        <X />
      }
    </Badge>
  )   
};

export default FileBadge
