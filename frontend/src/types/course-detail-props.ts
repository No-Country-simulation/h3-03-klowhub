export interface Lesson {
    id: number;
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
    description: string;
    rating: number;
    ratingCount: number;
    image: string;
}

export interface AppInfoProps {
    sections: {
        title: string;
        badges: string[];
    }[];
}

export interface ProgramModule {
    moduleTitle: string;
    lessons: string[];
}

export interface CourseProps {
    details: CourseDetailHeader;
    lessons: Lesson[];
    instructor: Instructor;
    objectives: string[];
    about: string;
    additionalDetails: {
        title: string;
        content: string;
    }[];
    requirements: string[];
    appInfoSections: AppInfoProps;
    reviews: {
        author: string;
        rating: number;
        comment: string;
    }[];
}
