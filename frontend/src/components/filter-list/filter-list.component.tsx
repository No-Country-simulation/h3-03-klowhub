import { Checkbox } from "../ui/checkbox";
import { TFilterItem } from "@/types/filters.types";
import { breakFilters } from "./filter-list.utils";
import { Button } from "../ui/button";
import { X } from "lucide-react";

type FilterListProps = {
  header: string
  filters: TFilterItem[]
  full?: boolean
}

const FilterList = ({ header, filters, full }: FilterListProps) => {
  const cols = breakFilters(filters);

  return (
    <div className={ `flex flex-col backdrop-blur-md bg-white/10 rounded-lg p-5 ${full ? "col-span-1 sm:col-span-2" : ""} items-start gap-5` }>
      <h2 className="font-bold text-base">{ header }</h2>
      <div className={`w-full flex flex-col md:flex-row gap-5 ${filters.length > 2 ? "" : "flex-col"} justify-between`}>
        { 
          cols.map((col, colIdx) => (
            <div key={`filter-${header}-col-${colIdx}`} className="flex flex-col gap-3 flex-1">
              {
                col.map((c, itemIdx) => (
                  <div key={`filter-${header}-col-${colIdx}-item-${itemIdx}`} className="flex gap-3 items-start">
                    <Checkbox key={`filter-${itemIdx}`} className="mt-1" />
                    <label className="flex flex-col gap-0 w-full" htmlFor={ c.label }>
                      {
                        (c.label.split("\n")).map((i, idx) => (
                          <span key={`filter-${itemIdx}-${idx}`}>{i}</span>
                        ))
                      }
                    </label>
                  </div>
                ))
              }
            </div>
          ))
        }
      </div>
      <Button variant="outline" className="bg-none bg-transparent py-1 px-2 h-7 mt-auto">
        <X /> Limpiar
      </Button>
    </div>
  )
};

export default FilterList
