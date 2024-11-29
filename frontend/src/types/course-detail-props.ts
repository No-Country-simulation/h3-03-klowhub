import { ReactNode } from "react";
import { coreContent, toolsAndPlatforms, functionalities } from '../consts/filters.consts';

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
    coverImg: {
        url: string
        size: number
        width: number
        height: number
        format: string
        created_at: string
    };
}

export interface AppInfoProps {
    sector: {
        label: string;
        name: string;
    }[];

    coreContent: {
        label: string;
        name: string;
    }[];

    toolsAndPlatforms: {
        label: string;
        name: string;
    }[];

    functionalities: {
        label: string;
        name: string;
    }[];
}

export interface ProgramModule {
    moduleTitle: string;
    lessons: string[];
}

export interface CourseProps {
    title: string;
    summarizeDescription: string
    rating: number
    ratingCount: number
    coverImg: {
        url: string
        size: number
        width: number
        height: number
        format: string
        created_at: string
    }
    learningSubjects: string[];
    detailedDescription: string;
    freelessons: Lesson[];
    additionalDetails: {
        title: string;
        content: string;
    }[];
    prevRequirements: string[];
    children: ReactNode[];
}
