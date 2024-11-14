import { BreadCrumb } from "@/components/courses/BreadCrumb";
import { SearchFilter } from "@/components/courses/SearchFilter";

const Page = () => {

    return (
        <div>
            <div className="container px-6 md:px-0 mx-auto">
                <BreadCrumb />
            </div>

            <SearchFilter/>  
        </div>
    );

};

export default Page;