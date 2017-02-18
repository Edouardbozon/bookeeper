export default function generateSharedFlatModel ({
    date = Date.now(),
    name = '',
    location = '',
    userId = '',
    isPublic = true
}) {
    return {
        name,
        location,
        createdAt: date,
        createdBy: userId,
        isPublic,
        expensesAmount: 0,
        countExpenses: 0,
        expenses: [],
        countRoomMates: 1,
        roomMates: [
            userId
        ]
    };
}
