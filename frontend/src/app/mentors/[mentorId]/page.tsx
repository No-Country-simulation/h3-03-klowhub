import BreadCrumb from "@/components/breadcrumbs/breadcrumbs.component";
import MentorDetailDesktop from "@/components/mentor-detail/mentor-detail-desktop.component";


const MentorDetailPage = () => {
    return (
        <main className="w-full">
            <div className="px-6 md:px-5 mx-auto mb-[48px]">
                <BreadCrumb />
            </div>
            <MentorDetailDesktop />
        </main>
    );
};

export default MentorDetailPage;