export type Transaction = {
    id: number;
    customerName: string;
    courseName: string;
    amount: number;
    status: 'Pending' | 'Completed' | 'Canceled';
    avatarUrl: string;
    date: string;
    platform: string;
    commissionRate: number;
}