import { Badge } from "../ui/badge";
import { X, Files } from "lucide-react";

import { humanFileSize } from "@/utils/file.utils";
import { TDocument } from "@/types/global.types";

type Props = {
  data: TDocument
  removeCb?: () => void
}

const FileBadge = ({ data, removeCb }: Props) => {
  return (
    <Badge 
      className={`flex gap-3 items-center px-3 py-1 bg-gray-50 text-white grow-0 ${removeCb ? "cursor-pointer" : ""}`}
      onClick={removeCb}
    >
      <Files color="#b95ed4" />
      <span>{ data.filename }</span>
      <span>{ humanFileSize(Number(data.size)) }</span>
      { removeCb &&
        <X />
      }
    </Badge>
  )   
};

export default FileBadge
