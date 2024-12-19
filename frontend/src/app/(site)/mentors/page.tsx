import BreadCrumb from "@/components/breadcrumbs/breadcrumbs.component";
import MentorCard from "@/components/mentor-card/mentor-card.component";
import Pager from "@/components/pager/pager.component";
import SearchFilter from "@/components/search-filter/search-filter.component";
import { mentors } from "@/mocks/mentors.mocks";

const MentorsPage = () => {
    return (
        <main>
                <BreadCrumb />

            <SearchFilter filters={[]} header="Encuentra los mentores que estas buscando" />

            <h3 className="text-sm py-2 mb-5 font-semibold">
                Expertos recomendados
            </h3>

            <div
                className="
                           grid grid-cols-1 gap-5
                           md:grid-cols-2 md:px-0
                           lg:grid-cols-3
                           xl:grid-cols-4
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
