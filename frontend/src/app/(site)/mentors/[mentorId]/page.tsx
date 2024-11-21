
import BreadCrumb from "@/components/breadcrumbs/breadcrumbs.component";
import MentorDetailDesktop from "@/components/mentor-detail/mentor-detail-desktop.component";
import MentorDetailMobileTablet from "@/components/mentor-detail/mentor-detail-mobtab.component";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "400", "600", "700"],
  display: "swap",
});

const MentorDetailPage = () => {
  return (
    <main className={`${inter.className} w-full`}>
      <div className="container px-6 md:px-0 mx-auto mb-[48px]">
        <BreadCrumb />
      </div>
      <div className="container mx-auto">
        <MentorDetailDesktop />
        <MentorDetailMobileTablet />
      </div>
    </main>
  );
};

export default MentorDetailPage;
