interface Transaction {
    id: number;
    customerName: string;
    courseName: string;
    amount: number;
    status: 'Pending' | 'Completed' | 'Canceled';
    avatarUrl: string;
    date: string;
    platform: string;
}

interface SoldCourse {
    imageUrl: string;
    altText: string;
    courseTitle: string;
    courseDescription: string;
    courseLink: string;
    platform: string;
    categories: string[];
    rating: {
        score: number;
        count: number;
    };
    editLink: string;
}