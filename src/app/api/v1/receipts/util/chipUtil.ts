export const setChipClassNames = (status: string) => {
    switch (status) {
        case 'Pending':
            return 'bg-yellow-200 text-yellow-700';
        case 'Approved':
            return 'bg-green-200 text-green-700';
        case 'Rejected':
            return 'bg-red-200 text-red-700';
        case 'Uploaded':
            return 'bg-orange-200 text-orange-700';
        default:
            return 'bg-gray-200 text-gray-700';
    }
};