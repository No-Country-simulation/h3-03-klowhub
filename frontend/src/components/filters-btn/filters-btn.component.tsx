"use client"

import { useState } from "react";

import { Button } from "../ui/button";
import { ListFilter } from "lucide-react";
import FilterModal from "../filter-modal/filter-modal.component";
import { IsClientProvider } from "@/contexts/is-client.context";

const FiltersBtn = () => {
  const [ showFilters, setShowFilters ] = useState(false);
  return (
    <>
      <Button onClick={() => setShowFilters(true)} variant="outline" size="sm" className="border-[#D194E2] bg-transparent text-[#D194E2]">
        <ListFilter />
        <span className="hidden md:block">Filtros</span>
      </Button>
      <IsClientProvider>
        { showFilters &&
            <FilterModal closeFn={setShowFilters} />
        }
      </IsClientProvider>
    </>
  )
};

export default FiltersBtn
