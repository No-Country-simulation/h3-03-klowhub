import BreadCrumb from "@/components/breadcrumbs/breadcrumbs.component";
import Course from "../../components/owned-courses/course.component";

const page = () => {

  return (
    <main>
        <BreadCrumb/>

        <Course/>
    </main>
  );

};

export default page;