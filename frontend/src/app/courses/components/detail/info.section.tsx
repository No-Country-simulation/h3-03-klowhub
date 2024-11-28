import { AppInfoProps } from "@/types/course-detail-props";
import { FC } from "react";
import { Badge } from "@/components/ui/badge";

export const CourseInfoSection: FC<AppInfoProps> = ({ sections }) => {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold">Información y Funcionalidades de la App</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 border border-[#D194E2] rounded-md p-4">
        {sections.map((section, index) => (
          <div key={index} className="flex flex-col gap-2 items-center">
            <h3 className="text-sm font-semibold text-[#FFFFFF]">{section.title}</h3>
            <div className="flex flex-col items-center justify-center gap-2">
              {section.badges.map((badge, badgeIndex) => (
                <Badge key={badgeIndex}>{badge}</Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
