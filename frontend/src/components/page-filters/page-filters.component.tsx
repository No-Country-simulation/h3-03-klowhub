import { FC } from "react";
import FilterDisplayer from "@/components/filter-displayer/filter-displayer.component";
import { Badge } from "@/components/ui/badge";

type Props = {
  filters: {
    label: string
    items: string[]
  }[]
}

const PageFilters: FC<Props> = ({ filters }) => {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold">Información y Funcionalidades de la App</h3>
      <div className={`grid grid-cols-1 gap-4 border border-[#D194E2] rounded-md p-4`} style={{ gridTemplateColumns: `repeat(${filters.length}, minmax(0, 1fr))` }}>
        {
          filters.map((filter, idx) => (
            <FilterDisplayer header="Pilar de contenido" key={`filter-${idx}`}>
                {filter.items.map((f, index) => (
                  <Badge key={index}>{f}</Badge>
                ))}
            </FilterDisplayer>
          ))
        }
      </div>
    </div>
  )
}

export default PageFilters
