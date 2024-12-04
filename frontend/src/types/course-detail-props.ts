import { ReactNode } from "react";
import { coreContent, toolsAndPlatforms, functionalities } from '../consts/filters.consts';
import { TVideo } from "./global.types";

export interface Lesson {
    id: string;
    image: string;
    title: string;
}

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
    rating: number;
    ratingCount: number;
    promotionalVideo: TVideo;
    // coverImg: {
    //     url: string
    //     size: number
    //     width: number
    //     height: number
    //     format: string
    //     created_at: string
    // };
}

export interface AppInfoProps {
    sector: string[];

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
    rating: number
    ratingCount: number
    promotionalVideo: TVideo;
    learningSubjects: string[];
    fullDescription: string;
    freelessons: Lesson[];
    additionalDetails: {
        title: string;
        content: string;
    }[];
    prevRequirements: string[];
    children: ReactNode[];
}
