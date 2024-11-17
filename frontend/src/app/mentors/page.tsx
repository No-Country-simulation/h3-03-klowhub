import BreadCrumb from "@/components/breadcrumbs/breadcrumbs.component";
import MentorCard from "@/components/mentor-card/mentor-card.component";
import Pager from "@/components/pager/pager.component";
import SearchFilter from "@/components/search-filter/search-filter.component";
import { mentors } from "@/mocks/mentors.mocks";

const MentorsPage = () => {
    return (
        <main className="w-full">
            <div className="px-6 md:px-5 mx-auto">
                <BreadCrumb />
            </div>

            <SearchFilter />

            <h3 className="text-sm py-2 mb-5 font-semibold text-white">Expertos recomendados</h3>

            <div className="
                 grid grid-cols-4 gap-5
                 2xl:grid-cols-3 2xl:px-5
                 xl:grid-cols-2 
                 sm:grid-cols-1
                 "
            >
                {mentors.map((mentor, index) => (
                    <MentorCard
                        key={index}
                        firstName={mentor.firstName}
                        lastName={mentor.lastName}
                        img={mentor.img}
                        nationality={mentor.nationality}
                        platform={mentor.platform}
                        language={mentor.language}
                        price={mentor.price}
                        sessionCount={mentor.sessionCount}
                        reviewCount={mentor.reviewCount}
                    />
                ))}
            </div>

            <Pager />
        </main>
    );
};

export default MentorsPage;
