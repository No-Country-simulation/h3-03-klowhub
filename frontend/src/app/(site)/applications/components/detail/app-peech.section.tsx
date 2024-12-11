import { FC } from "react";

type PeechProps = {
    peechTitle: string
    peechDescription: string
}

export const AppPeechSection: FC<PeechProps> = ({ peechTitle, peechDescription }) => {
  return (
    <div className="space-y-4">
        <span className="text-lg font-semibold">{peechTitle}</span>
        <p className="text-gray-300 text-sm">{peechDescription}</p>
    </div>
  )
}
