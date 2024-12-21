import Image from "next/image";
import DashboardOptions from "@/components/home/dashboard-options.component";
import { SimilarCourses } from "./courses/components/detail/similar-courses.section";

export default function Home() {
  return (
    <>
      <main className="mt-8 space-y-6">
        <Image
          src="/temp/imgs/home-img.png"
          alt="brand image"
          width={1400}
          height={200}
          className="w-full"
        />
        <DashboardOptions/>
        {/* <SimilarCourses/>  */}
      </main>
    </>
  );
}
