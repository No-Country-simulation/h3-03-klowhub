import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ListFilter, ListOrdered } from "lucide-react";

type SearchFilterProps = {
  categories?: string[]
}
 const SearchFilter:FC<SearchFilterProps> = ({ categories }) => {
    return (
        <div className="container mx-auto min-h-[160px] px-5 md:px-0 space-y-4 mt-8 mb-8 md:mb-0">

            <h3 className="text-sm font-semibold text-white">Encuentra el aprendizaje que estás buscando</h3>

            <div className="flex gap-2 items-center">
                <div className="relative flex-1 mr-3">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        className="w-full h-[40px] bg-[#E5E7EB] pl-9 border-0 text-white placeholder:text-[#6B7280]"
                        placeholder="Buscar cursos y lecciones"
                    />
                </div>
                <Button variant="outline" size="sm" className="border-[#D194E2] bg-transparent text-[#D194E2]">
                    <ListFilter/> 
                    <span className="hidden md:block">Filtros</span>
                </Button>
                <Button variant="outline" size="sm" className="border-[#D194E2] bg-transparent text-[#D194E2]">
                    <ListOrdered/>
                    <span className="hidden md:block">Ordenar por</span>         
                </Button>
            </div>

            <div className="flex flex-wrap gap-2 md:items-center justify-between md:justify-evenly md:gap-2">
                { categories && categories.map((category) => (
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
    )
}

export default SearchFilter
