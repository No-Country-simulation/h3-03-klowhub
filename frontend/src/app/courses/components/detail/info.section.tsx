import { AppInfoProps } from "@/types/course-detail-props";
import { FC } from "react";
import { Badge } from "@/components/ui/badge";

export const CourseInfoSection: FC<AppInfoProps> = ({ sector, coreContent, toolsAndPlatforms, functionalities }) => {

  console.log('sector', sector);

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold">Información y Funcionalidades de la App</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 border border-[#D194E2] rounded-md p-4">

        <div className="flex flex-col gap-2 items-center">
          <h3 className="text-sm font-semibold text-[#FFFFFF]">Funcionalidades</h3>
          <div className="flex flex-col items-center justify-center gap-2">
            {functionalities.map((functionality, index) => (
              <Badge key={index}>{functionality.label}</Badge>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 items-center">
          <h3 className="text-sm font-semibold text-[#FFFFFF]">Herramientas y Plataformas</h3>
          <div className="flex flex-col items-center justify-center gap-2">
            {toolsAndPlatforms.map((toolsAndPlatform, index) => (
              <Badge key={index}>{toolsAndPlatform.label}</Badge>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 items-center">
          <h3 className="text-sm font-semibold text-[#FFFFFF]">Sector</h3>
          <div className="flex flex-col items-center justify-center gap-2">
            {sector.map((sector, index) => (
              <Badge key={index}>{sector.label}</Badge>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 items-center">
          <h3 className="text-sm font-semibold text-[#FFFFFF]">Pilar de Contenido</h3>
          <div className="flex flex-col items-center justify-center gap-2">
            {coreContent.map((coreContent, index) => (
              <Badge key={index}>{coreContent.label}</Badge>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
