import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ListOrdered } from "lucide-react";
import { ListFilter } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

import Link from "next/link";

import { getQueryParams, getPathname } from "@/utils/route.utils";
import SideModal from "../side-modal/side-modal.component";
import FilterList from "../filter-list/filter-list.component";
import { TFilterList } from "@/types/filters.types";

type SearchFilterProps = {
  header: string
  categories?: string[];
  filters: TFilterList[]
};

const SearchFilter: FC<SearchFilterProps> = async ({ filters, categories, header }) => {
  const queryParams = await getQueryParams();
  const pathname = await getPathname();

  return (
    <div className="min-h-[160px] space-y-4 mt-8 mb-8 md:mb-0">
      <h3 className="text-sm font-semibold text-white">
        { header }
      </h3>

      <div className="flex gap-2 items-center">
        <div className="relative flex-1 mr-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            className="w-full h-[40px] bg-[#E5E7EB] pl-9 border-0 text-white placeholder:text-[#6B7280]"
            placeholder="Buscar cursos y lecciones"
          />
        </div>

        <Link 
          href={`${pathname}?showfilters=true`}
          className={`border-[#D194E2] bg-transparent text-[#D194E2] ${buttonVariants({variant: "outline" })}`}
        >
          <ListFilter />
          <span className="hidden md:block">Filtros</span>
        </Link>

        { queryParams.showfilters && 
          <SideModal background="bg-custom-gradient">
            <div className={`
                grid grid-cols-1 gap-5 px-3 w-full h-full overflow-scroll
                sm:grid-cols-2
              `}
            >
              {
                filters.map((f, idx) => {
                  const full = filters.length % 2 > 0 && idx === 2 ? true : false;
                  return(
                    <FilterList key={`filter-${idx}`} header={f.header} filters={f.items} full={full} />
                  )
                })
              }
            </div>
          </SideModal>
        }

        <Button
          variant="outline"
          size="sm"
          className="border-[#D194E2] bg-transparent text-[#D194E2]"
        >
          <ListOrdered />
          <span className="hidden md:block">Ordenar por</span>
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 md:items-center justify-between md:justify-evenly md:gap-2">
        {categories &&
          categories.map((category) => (
            <Button
              key={category}
              variant="outline"
              className="rounded-xl text-[#E8C9F1] border-[#E8C9F1] bg-transparent"
              size="sm"
            >
              {category}
            </Button>
          ))}
      </div>
    </div>
  );
};

export default SearchFilter;
