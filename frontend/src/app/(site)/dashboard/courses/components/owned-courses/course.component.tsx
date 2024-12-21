import { CourseViewer } from "./course-viewer.section";

type Props = {
    params?: Promise<{
        id: string
    }>
}

const Course = async ({ params }: Props) => {

    // if (!pageData || !pageData.courseData) {
    //     return <p>Loading...</p>;
    // }

    // const modules = pageData.courseData.modules.map((module: any) => ({
    //     title: module.title,
    //     description: module.description,
    //     lessons: module.lessons.map((lesson: any) => ({
    //         id: lesson.id,
    //         title: lesson.title,
    //         freeLesson: lesson.freeLesson,
    //         link: lesson.link,
    //         video: {
    //             id: lesson.video?.id,
    //             fileType: lesson.video?.fileType,
    //             fileMetadata: lesson.video?.fileMetadata
    //         }
    //     })),
    // }));

    return (
        <section className="mt-8">
            {/* <CourseViewer modules={modules} /> */}
        </section>
    );

};

export default Course;