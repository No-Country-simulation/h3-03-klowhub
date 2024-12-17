import { ReactNode } from "react";
import { TVideo } from "./global.types";
import { Lesson } from "./courses.types";

// export interface Lesson {
//     id: string;
//     link: string; // this should be a TImage
//     title: string;
// }

export interface Instructor {
    name: string;
    description: string;
    image: string;
    rating?: number;
    students?: number;
    courses?: number;
    profileLink?: string;
}

export type CourseDetailHeader = {
    title: string;
    summarizeDescription: string;
    rating?: number;
    ratingCount?: number;
    promotionalVideo: TVideo;
    lessons: Lesson[];
  authorId: string
    // coverImg: {
    //     url: string
    //     size: number
    //     width: number
    //     height: number
    //     format: string
    //     created_at: string
    // };
}

export interface CourseInfoProps {
    sector: string[];
    tags: string[];
    coreContent: string[];
    toolsAndPlatforms: string[];
    functionalities: string[];
}

export interface ProgramModule {
    moduleTitle: string;
    lessons: string[];
}

export interface CourseProps {
    title: string;
    shortDescription: string
    rating?: number
    ratingCount?: number
    promotionalVideo: TVideo;
    learningSubjects: string[];
    fullDescription: string;
    freelessons: Lesson[];
    prevRequirements: string[];
    children: ReactNode[];
  authorId: string;
  submitCourse?: () => Promise<string | undefined>
}
