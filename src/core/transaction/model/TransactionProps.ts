export default interface TransactionProps {
    id?: string,
    description: string,
    value: number,
    dueDate: Date,
    userId: string
}