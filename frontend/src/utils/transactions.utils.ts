import { Transaction } from "@/types/transaction.types";

/**
 * Calculates the total revenue from completed transactions.
 * @param transactionsData - Array of transactions
 * @returns Total revenue
 */
export const calculateTotalRevenue = (transactionsData: Transaction[]): number => {
    return transactionsData
        .filter(transaction => transaction.status === 'Completed')
        .reduce((sum, transaction) => sum + transaction.amount, 0);
}

/**
 * Calculates the total commissions from completed transactions.
 * @param transactionsData - Array of transactions
 * @returns Total commissions
 */
export const calculateTotalCommissions = (transactionsData: Transaction[]): number => {
    return transactionsData
        .filter(transaction => transaction.status === 'Completed')
        .reduce((sum, transaction) => sum + (transaction.amount * transaction.commissionRate), 0);
}